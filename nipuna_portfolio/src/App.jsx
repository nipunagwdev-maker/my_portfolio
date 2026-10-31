import { useState } from "react";
import SiteHeader from "./components/SiteHeader.jsx";
import "./App.css";
import HeroSection from "./components/HeroSection.jsx";
import About from "./pages/About.jsx";
import ProjectSection from "./pages/Projects.jsx";
import PageBackground from "./components/PageBackground.jsx";
import SkillsSection from "./pages/Skills.jsx";
import ContactSection from "./components/ContactSection.jsx";

function App() {
  return (
    <>
      <PageBackground />
      <SiteHeader />
      <HeroSection />
      <About />
      <ProjectSection />
      <SkillsSection />
      <ContactSection />
    </>
  );
}

export default App;
