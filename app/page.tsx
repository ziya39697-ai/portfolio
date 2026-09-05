"use client";

import dynamic from "next/dynamic";

import { navItems } from "@/data";

import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import RecentProjects from "@/components/RecentProjects";
import { FloatingNav } from "@/components/ui/FloatingNavbar";

const Grid = dynamic(() => import("@/components/Grid"), { ssr: false });

const Home = () => {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <FloatingNav navItems={navItems} />
        <Hero />
        <Grid />
        <RecentProjects />
        <Skills />
        <Education />
        <Contact />
        <Footer />
      </div>
    </main>
  );
};

export default Home;
