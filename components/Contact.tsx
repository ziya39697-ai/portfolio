"use client";

import { useState } from "react";
import { FaUser, FaEnvelope, FaLocationArrow, FaLinkedin } from "react-icons/fa6";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import MagicButton from "./MagicButton";

type Status = "idle" | "sending" | "sent" | "error";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, website }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setError(data.error || "Something went wrong.");
        return;
      }
      setStatus("sent");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
      setError("Network error. Please try again.");
    }
  };

  const reset = () => {
    setStatus("idle");
    setError(null);
  };

  return (
    <section id="contact" className="py-20 w-full">
      <h1 className="heading">
        Let&apos;s <span className="text-purple">connect</span>
      </h1>
      <p className="text-center text-white/60 mt-3 text-sm md:text-base max-w-2xl mx-auto">
        Open to HR intern roles in recruitment and people operations. Drop a
        message — I usually reply within a day.
      </p>

      <div className="mt-12 mx-auto w-full max-w-5xl rounded-3xl p-[1px] bg-gradient-to-br from-purple/50 via-purple/10 to-blue-500/30">
        <div
          className="rounded-3xl p-6 md:p-10 grid lg:grid-cols-2 gap-10"
          style={{ background: "rgb(4,7,29)" }}
        >
          <div className="flex flex-col justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold leading-snug">
                Looking for an{" "}
                <span className="text-purple">HR intern</span>?
              </h2>
              <p className="text-white/70 mt-4 text-sm md:text-base leading-relaxed">
                I can help with candidate sourcing, screening, interview
                coordination, and keeping a hiring pipeline in order.
              </p>
            </div>

            <ul className="flex flex-col gap-3 text-sm text-white/80">
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-purple" />
                HR intern roles
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-purple" />
                Recruitment and people operations
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-purple" />
                Screening and interview coordination
              </li>
            </ul>

            <div className="flex flex-col gap-3">
              <a
                href="mailto:ziya39697@gmail.com"
                className="text-sm text-white/80 hover:text-purple transition flex items-center gap-2"
              >
                <FaEnvelope className="text-purple" /> ziya39697@gmail.com
              </a>
              <div className="flex items-center gap-4 text-white/70">
                <a
                  href="https://www.linkedin.com/in/jiya-yadav17"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-purple transition"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin size={20} />
                </a>
              </div>
            </div>
          </div>

          <div>
            {status === "sent" ? (
              <div className="h-full min-h-[20rem] flex flex-col items-center justify-center text-center gap-4 rounded-2xl border border-white/[0.08] p-8 bg-black-200/30">
                <CheckCircle2 className="text-purple" size={48} />
                <h3 className="text-xl font-bold">Message sent</h3>
                <p className="text-white/60 text-sm max-w-xs">
                  Thanks for reaching out — I&apos;ll get back to you soon.
                </p>
                <button
                  onClick={reset}
                  className="text-sm text-purple hover:underline mt-2"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="flex flex-col gap-5">
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="hidden"
                  aria-hidden="true"
                />

                {status === "error" && error && (
                  <div className="flex items-start gap-3 text-sm text-red-300 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
                    <AlertCircle size={18} className="mt-0.5 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <Field
                  label="Name"
                  icon={<FaUser />}
                  inputProps={{
                    type: "text",
                    required: true,
                    placeholder: "Your name",
                    value: name,
                    maxLength: 120,
                    onChange: (e) => setName(e.target.value),
                  }}
                />

                <Field
                  label="Email"
                  icon={<FaEnvelope />}
                  inputProps={{
                    type: "email",
                    required: true,
                    placeholder: "you@example.com",
                    value: email,
                    maxLength: 200,
                    onChange: (e) => setEmail(e.target.value),
                  }}
                />

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs uppercase tracking-wider text-white/50">
                    Message
                  </label>
                  <textarea
                    required
                    placeholder="What would you like to talk about?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    maxLength={4000}
                    rows={5}
                    className="bg-black-200/50 border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder-white/30 outline-none focus:border-purple focus:ring-2 focus:ring-purple/30 transition resize-y"
                  />
                </div>

                <div className="flex flex-col items-stretch gap-2 mt-2">
                  <MagicButton
                    type="submit"
                    disabled={status === "sending"}
                    title={status === "sending" ? "Sending..." : "Send message"}
                    icon={
                      status === "sending" ? (
                        <Loader2 className="animate-spin" size={16} />
                      ) : (
                        <FaLocationArrow />
                      )
                    }
                    position="right"
                    otherClasses="!mt-0"
                  />
           
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const Field = ({
  label,
  icon,
  inputProps,
}: {
  label: string;
  icon: React.ReactNode;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
}) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs uppercase tracking-wider text-white/50">
      {label}
    </label>
    <div className="relative">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
        {icon}
      </span>
      <input
        {...inputProps}
        className="w-full bg-black-200/50 border border-white/[0.08] rounded-xl pl-11 pr-4 py-3 text-white placeholder-white/30 outline-none focus:border-purple focus:ring-2 focus:ring-purple/30 transition"
      />
    </div>
  </div>
);

export default Contact;
