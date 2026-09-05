import Link from "next/link";
import { notFound } from "next/navigation";
import { FaGithub, FaArrowLeft, FaArrowUpRightFromSquare } from "react-icons/fa6";

import { projects } from "@/data";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} · Jiya Yadav`,
    description: project.des,
    openGraph: {
      title: project.title,
      description: project.des,
      images: [project.img],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <main className="relative bg-black-100 min-h-screen flex justify-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-4xl w-full mx-auto py-20">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-purple transition mb-10"
        >
          <FaArrowLeft size={12} /> Back to projects
        </Link>

        <h1 className="text-3xl md:text-5xl font-bold leading-tight">
          {project.title}
        </h1>
        <p className="text-white/70 mt-4 text-base md:text-lg leading-relaxed">
          {project.des}
        </p>

        <div className="flex flex-wrap gap-3 mt-6">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-lg bg-purple/15 border border-purple/40 text-purple hover:bg-purple/25 transition"
            >
              Open sheet <FaArrowUpRightFromSquare size={12} />
            </a>
          )}
          {"gitLink" in project &&
            typeof (project as { gitLink?: unknown }).gitLink === "string" && (
            <a
              href={(project as { gitLink: string }).gitLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-lg bg-black-200/60 border border-white/[0.1] text-white hover:border-white/30 transition"
            >
              <FaGithub /> Source
            </a>
          )}
        </div>

        <div className="mt-10 rounded-2xl overflow-hidden border border-white/[0.08]">
          <img src={project.img} alt={project.title} className="w-full" />
        </div>

        <Section title="The problem">
          <p className="text-white/75 leading-relaxed">{project.problem}</p>
        </Section>

        <Section title="Architecture">
          <BulletList items={project.architecture} />
        </Section>

        <Section title="Key decisions">
          <BulletList items={project.decisions} />
        </Section>

        <Section title="Outcomes">
          <BulletList items={project.metrics} />
        </Section>

        <Section title="Stack">
          <div className="flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span
                key={s}
                className="text-xs md:text-sm px-3 py-1.5 rounded-full bg-black-200/60 border border-white/[0.08] text-white/80"
              >
                {s}
              </span>
            ))}
          </div>
        </Section>
      </div>
    </main>
  );
}

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <section className="mt-12">
    <h2 className="text-purple text-sm font-semibold uppercase tracking-wider mb-4">
      {title}
    </h2>
    {children}
  </section>
);

const BulletList = ({ items }: { items: string[] }) => (
  <ul className="flex flex-col gap-3 text-white/80 leading-relaxed">
    {items.map((item, i) => (
      <li key={i} className="flex gap-3">
        <span className="text-purple mt-1.5 leading-none shrink-0">•</span>
        <span>{item}</span>
      </li>
    ))}
  </ul>
);
