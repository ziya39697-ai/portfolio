import { skillGroups } from "@/data";

const Skills = () => {
  return (
    <section id="skills" className="py-20 w-full">
      <h1 className="heading">
        Tools I <span className="text-purple">work with</span>
      </h1>
      <p className="text-center text-white/60 mt-3 text-sm md:text-base max-w-2xl mx-auto">
        HR operations, tracking tools, and clear candidate communication.
      </p>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {skillGroups.map((group) => (
          <div
            key={group.title}
            className="rounded-2xl p-6 border border-white/[0.08] hover:border-purple/40 transition-colors"
            style={{ background: "rgb(4,7,29)" }}
          >
            <h3 className="text-purple font-semibold text-sm uppercase tracking-wider mb-4">
              {group.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="text-xs md:text-sm px-3 py-1.5 rounded-full bg-black-200/60 border border-white/[0.06] text-white/80"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
