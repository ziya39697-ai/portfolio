import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

import { getContactSends } from "@/lib/mongo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PER_IP_WINDOW_MS = 60 * 60 * 1000;
const PER_IP_MAX = 3;
const GLOBAL_DAILY_MAX = 50;
const COOLDOWN_MS = 30 * 1000;

type Bucket = { count: number; firstAt: number };
const memIpBuckets = new Map<string, Bucket>();
const memDayBucket = { count: 0, dayStamp: "" };
const memLastByIp = new Map<string, number>();

function getIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

function todayStamp(): string {
  return new Date().toISOString().slice(0, 10);
}

type RateResult = { ok: true } | { ok: false; reason: string; retryAfter?: number };

async function checkRateLimit(ip: string): Promise<RateResult> {
  const now = Date.now();
  const col = await getContactSends();

  if (col) {
    const last = await col
      .find({ ip })
      .sort({ ts: -1 })
      .limit(1)
      .toArray();
    if (last.length) {
      const lastTs = last[0].ts.getTime();
      if (now - lastTs < COOLDOWN_MS) {
        return {
          ok: false,
          reason: "Please wait a moment before sending again.",
          retryAfter: Math.ceil((COOLDOWN_MS - (now - lastTs)) / 1000),
        };
      }
    }

    const startOfDay = new Date();
    startOfDay.setUTCHours(0, 0, 0, 0);
    const dailyCount = await col.countDocuments({ ts: { $gte: startOfDay } });
    if (dailyCount >= GLOBAL_DAILY_MAX) {
      return {
        ok: false,
        reason: "Daily message limit reached. Please email me directly.",
      };
    }

    const windowStart = new Date(now - PER_IP_WINDOW_MS);
    const ipCount = await col.countDocuments({ ip, ts: { $gte: windowStart } });
    if (ipCount >= PER_IP_MAX) {
      const oldest = await col
        .find({ ip, ts: { $gte: windowStart } })
        .sort({ ts: 1 })
        .limit(1)
        .toArray();
      const retry = oldest.length
        ? Math.ceil(
            (PER_IP_WINDOW_MS - (now - oldest[0].ts.getTime())) / 1000,
          )
        : 60;
      return {
        ok: false,
        reason: "Too many messages from your address. Try again later.",
        retryAfter: retry,
      };
    }

    return { ok: true };
  }

  const last = memLastByIp.get(ip) ?? 0;
  if (now - last < COOLDOWN_MS) {
    return {
      ok: false,
      reason: "Please wait a moment before sending again.",
      retryAfter: Math.ceil((COOLDOWN_MS - (now - last)) / 1000),
    };
  }

  const today = todayStamp();
  if (memDayBucket.dayStamp !== today) {
    memDayBucket.dayStamp = today;
    memDayBucket.count = 0;
  }
  if (memDayBucket.count >= GLOBAL_DAILY_MAX) {
    return {
      ok: false,
      reason: "Daily message limit reached. Please email me directly.",
    };
  }

  const bucket = memIpBuckets.get(ip);
  if (!bucket || now - bucket.firstAt > PER_IP_WINDOW_MS) {
    memIpBuckets.set(ip, { count: 1, firstAt: now });
  } else {
    if (bucket.count >= PER_IP_MAX) {
      const retry = Math.ceil((PER_IP_WINDOW_MS - (now - bucket.firstAt)) / 1000);
      return {
        ok: false,
        reason: "Too many messages from your address. Try again later.",
        retryAfter: retry,
      };
    }
    bucket.count += 1;
  }
  return { ok: true };
}

async function commitSend(ip: string, email: string) {
  const col = await getContactSends();
  if (col) {
    await col.insertOne({ ip, ts: new Date(), email });
    return;
  }
  memLastByIp.set(ip, Date.now());
  memDayBucket.count += 1;
}

export async function POST(req: NextRequest) {
  let body: { name?: string; email?: string; message?: string; website?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (body.website && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const message = (body.message || "").trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email and message are required." },
      { status: 400 },
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }
  if (name.length > 120 || email.length > 200 || message.length > 4000) {
    return NextResponse.json({ error: "Input too long." }, { status: 400 });
  }

  const ip = getIp(req);
  const rl = await checkRateLimit(ip);
  if (!rl.ok) {
    const headers: Record<string, string> = {};
    if (rl.retryAfter) headers["Retry-After"] = String(rl.retryAfter);
    return NextResponse.json({ error: rl.reason }, { status: 429, headers });
  }

  const host = process.env.SMTP_HOST;
  const fromEmail = process.env.FROM_EMAIL;
  if (!host || !fromEmail) {
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 503 },
    );
  }

  const port = Number(process.env.SMTP_PORT || 587);
  const useTls = (process.env.SMTP_USE_TLS || "true").toLowerCase() === "true";

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    requireTLS: useTls && port !== 465,
    auth: process.env.SMTP_USER
      ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD }
      : undefined,
  });

  const safe = (s: string) =>
    s.replace(/[<>]/g, (c) => (c === "<" ? "&lt;" : "&gt;"));
  const to = (process.env.CONTACT_TO_EMAIL || fromEmail).split(",")[0].trim();

  try {
    await transporter.sendMail({
      from: `Portfolio Contact <${fromEmail.split(",")[0].trim()}>`,
      to,
      replyTo: email,
      subject: `Portfolio contact from ${name}`,
      text: `From: ${name} <${email}>\nIP: ${ip}\n\n${message}`,
      html: `<p><strong>From:</strong> ${safe(name)} &lt;${safe(email)}&gt;</p>
             <p><strong>IP:</strong> ${safe(ip)}</p>
             <pre style="font-family:inherit;white-space:pre-wrap">${safe(message)}</pre>`,
    });
  } catch (err: any) {
    console.error("[contact] sendMail failed:", {
      code: err?.code,
      command: err?.command,
      response: err?.response,
      message: err?.message,
    });
    const isDev = process.env.NODE_ENV !== "production";
    return NextResponse.json(
      {
        error: isDev
          ? `SMTP error: ${err?.code || ""} ${err?.message || "unknown"}`.trim()
          : "Failed to send. Please try again later.",
      },
      { status: 502 },
    );
  }

  await commitSend(ip, email);
  return NextResponse.json({ ok: true });
}
