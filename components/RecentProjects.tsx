"use client";

import Link from "next/link";
import { FaLocationArrow, FaArrowUpRightFromSquare } from "react-icons/fa6";

import { projects } from "@/data";
import { PinContainer } from "./ui/Pin";

const RecentProjects = () => {
  return (
    <section className="py-20" id="projects">
      <h1 className="heading">
        A small selection of{" "}
        <span className="text-purple">recruitment projects</span>
      </h1>
      <div className="flex flex-wrap items-center justify-center p-5 gap-x-[3%] gap-y-8 mt-10">
        {projects.map((item) => (
          <div
            className="sm:h-[41rem] h-[32rem] lg:min-h-[32.5rem] flex items-center justify-center sm:w-[570px] w-[80vw]"
            key={item.id}
          >
            <PinContainer title={`Read case study`} href={`/projects/${item.slug}`}>
              <Link
                href={`/projects/${item.slug}`}
                className="relative flex items-center justify-center sm:w-[470px] w-[80vw] overflow-hidden sm:h-[40vh] h-[43vh] lg:h-[43vh] mb-10"
              >
                <div
                  className="relative w-full h-full overflow-hidden rounded-3xl"
                  style={{ backgroundColor: "#13162D" }}
                >
                  <img src="/bg.png" alt="" aria-hidden="true" />
                </div>
                <img
                  src={item.img}
                  alt={item.title}
                  className="z-10 absolute bottom-[-3rem] h-[20rem] w-[23rem] rounded-[0.8rem] rotate-3"
                />
              </Link>

              <h1 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1">
                {item.title}
              </h1>

              <p
                className="lg:text-xl lg:font-normal font-light text-sm line-clamp-2"
                style={{
                  color: "#BEC1DD",
                  margin: "1vh 0",
                }}
              >
                {item.des}
              </p>

              <div className="flex items-center justify-between mt-7 mb-3">
                <div className="flex items-center">
                  {item.iconLists.map((icon, index) => (
                    <div
                      key={index}
                      className="border border-white/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
                      style={{
                        transform: `translateX(-${5 * index + 2}px)`,
                      }}
                    >
                      <img src={icon} alt="icon5" className="p-2" />
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-5">
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center lg:text-xl md:text-xs text-sm text-purple"
                    >
                      View
                      <FaArrowUpRightFromSquare className="ms-2" size={12} />
                    </a>
                  )}
                  <Link
                    href={`/projects/${item.slug}`}
                    className="flex items-center lg:text-xl md:text-xs text-sm text-purple"
                  >
                    Read case study
                    <FaLocationArrow className="ms-3" color="#CBACF9" />
                  </Link>
                </div>
              </div>
            </PinContainer>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentProjects;
