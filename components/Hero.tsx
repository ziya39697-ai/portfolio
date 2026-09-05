import { FaLocationArrow, FaDownload, FaLinkedin, FaEnvelope, FaWhatsapp } from "react-icons/fa6";

import MagicButton from "./MagicButton";
import { Spotlight } from "./ui/Spotlight";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";

const Hero = () => {
  return (
    <div className="pb-20 pt-36">
      <div>
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="white"
        />
        <Spotlight
          className="h-[80vh] w-[50vw] top-10 left-full"
          fill="purple"
        />
        <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="blue" />
      </div>

      <div
        className="h-screen w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.03] bg-grid-black-100/[0.2]
       absolute top-0 left-0 flex items-center justify-center"
      >
        <div
          className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100
         bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
        />
      </div>

      <div className="flex justify-center relative my-20 z-10">
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
          <p className="uppercase tracking-widest text-xs text-center text-blue-100 max-w-80">
            HR Intern · Recruitment · People Ops
          </p>

          <TextGenerateEffect
            words="Building Clear Hiring Pipelines From First Contact to Offer"
            className="text-center text-[40px] md:text-5xl lg:text-6xl"
          />

          <p className="text-center md:tracking-wider mb-4 text-sm md:text-lg lg:text-2xl">
            Hi! I&apos;m Jiya Yadav — a first-year BA student focused on
            recruitment tracking, screening, and interview coordination.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 md:mt-4">
            <a href="#about">
              <MagicButton
                title="Show my work"
                icon={<FaLocationArrow />}
                position="right"
              />
            </a>
            <a
              href="/Jiya_Yadav_Resume.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
            >
              <MagicButton
                title="Download Resume"
                icon={<FaDownload />}
                position="left"
              />
            </a>
          </div>

          <div className="flex items-center gap-3 md:gap-4 mt-8">
            {[
              {
                href: "https://www.linkedin.com/in/jiya-yadav17",
                icon: <FaLinkedin size={26} />,
                label: "LinkedIn",
              },
              {
                href: "mailto:ziya39697@gmail.com",
                icon: <FaEnvelope size={26} />,
                label: "Email",
              },
              {
                href: "https://wa.me/919053792722",
                icon: <FaWhatsapp size={26} />,
                label: "WhatsApp",
              },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                title={item.label}
                className="group relative w-16 h-16 rounded-full flex items-center justify-center border border-purple/40 bg-black-200/60 backdrop-blur-md text-white shadow-[0_0_20px_rgba(228,180,184,0.35)] hover:shadow-[0_0_35px_rgba(228,180,184,0.75)] hover:border-purple hover:bg-purple/20 transition-all duration-200 hover:-translate-y-1"
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
