import ScrollStage from "@/components/ScrollStage";
import Intro from "@/components/sections/Intro";
import Experience from "@/components/sections/Experience";
import SelectedWork from "@/components/sections/SelectedWork";
import Skills from "@/components/sections/Skills";
import Achievements from "@/components/sections/Achievements";
import Education from "@/components/sections/Education";
import WhoAmI from "@/components/sections/WhoAmI";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <ScrollStage>
      <Intro />
      <Experience />
      <SelectedWork />
      <Skills />
      <Achievements />
      <Education />
      <WhoAmI />
      <Contact />
    </ScrollStage>
  );
}
