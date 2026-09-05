import React from "react";

import { education, achievements } from "@/data";
import { Button } from "./ui/MovingBorders";

const Education = () => {
  return (
    <div className="py-20 w-full" id="education">
      <h1 className="heading">
        My <span className="text-purple">education</span>
      </h1>
      <p className="text-center text-white/60 mt-3 text-sm md:text-base max-w-2xl mx-auto">
        First-year Bachelor of Arts at Indira Gandhi University, Rewari.
      </p>

      <div className="w-full mt-12 grid lg:grid-cols-3 grid-cols-1 gap-6 md:gap-8">
        {education.map((card) => (
          <Button
            key={card.id}
            duration={12000 + card.id * 1500}
            borderRadius="1.75rem"
            style={{
              background: "rgb(4,7,29)",
              backgroundColor:
                "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
              borderRadius: `calc(1.75rem* 0.96)`,
            }}
            containerClassName="md:col-span-1 w-full h-full"
            className="flex-1 text-white border-neutral-200 dark:border-slate-800"
          >
            <div className="flex flex-col items-start text-left p-6 md:p-8 gap-4 w-full h-full min-h-[16rem]">
              <div className="flex items-start gap-4 w-full">
                <img
                  src={card.thumbnail}
                  alt={card.company}
                  className="w-14 h-14 shrink-0"
                />
                <div className="flex flex-col">
                  <h2 className="text-lg md:text-xl font-bold leading-tight">
                    {card.role}
                  </h2>
                  <span className="text-sm text-purple font-medium mt-1">
                    {card.company}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-white/60">
                <span>{card.period}</span>
                <span className="text-white/30">•</span>
                <span>{card.location}</span>
              </div>

              {card.highlights.length > 0 && (
                <ul className="flex flex-col gap-2 text-sm text-white-100/85 leading-relaxed">
                  {card.highlights.map((point, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="text-purple mt-1 leading-none">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Button>
        ))}
      </div>

      <h2 className="heading mt-20">
        <span className="text-purple">Achievements</span>
      </h2>
      <div className="w-full mt-10 grid md:grid-cols-2 grid-cols-1 gap-6 md:gap-8">
        {achievements.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl p-6 border border-white/[0.08] hover:border-purple/40 transition-colors"
            style={{ background: "rgb(4,7,29)" }}
          >
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-purple mt-2 text-sm">{item.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Education;
