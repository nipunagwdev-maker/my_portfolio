import { useRef } from "react";
import { useReveal } from "../hooks/useReveal";
import { useScramble } from "../hooks/useScramble";

// CHANGE THIS to your real GitHub username
const GITHUB = "https://github.com/nipunagwdev-maker";

const PROJECTS = [
  {
    title: "ShareBite",
    repo: "ShareBite.v2.0",
    status: "In progress",
    featured: true,
    description:
      "A food-sharing web app where restaurants post surplus food for free or at a discount, and users can request it and track pickups.",
    tech: ["React", "Tailwind CSS", "Supabase"],
  },
  {
    title: "Mobi Health Care",
    repo: "mobi_health_care_app",
    status: "In progress",
    description:
      "A medication notification app for everyday use. I hope to present it at the university exhibition.",
    tech: ["Flutter", "Dart"],
  },
  {
    title: "Fitness Tracker",
    repo: "fitness_tracker_by_nipuna",
    description:
      "A Flutter fitness tracker app with Home, Add New, Favourites and Profile pages.",
    tech: ["Flutter", "Dart"],
  },
  {
    title: "Responsive UI Practice",
    repo: "responsive-ui-design-with-flutter---web-tab-mobile",
    description:
      "UI design practice in Flutter for different screen sizes: web, tablet and mobile.",
    tech: ["Flutter", "Dart"],
  },
  {
    title: "Canteen Management System",
    repo: "java_oop_Project_Canteen_Management_System_Final",
    description:
      "A smart canteen management system built with Java and OOP. The final version runs in the terminal.",
    tech: ["Java", "OOP"],
  },
  {
    title: "QR Code Generator",
    repo: "python_qr_code_generator_cml_app",
    description:
      "A command-line app that generates a QR code for any web URL or link.",
    tech: ["Python", "CLI"],
  },
];

// Classes for "hidden until scrolled into view"
const reveal = (show) =>
  `transition duration-700 ease-out motion-reduce:transition-none ${
    show ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
  }`;

function ProjectCard({ project, index, visible }) {
  const cardRef = useRef(null);

  // Glow follows the mouse inside this card
  const handleMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    // Outer div = scroll reveal. Inner <a> = hover effects.
    <div
      className={reveal(visible)}
      style={{ transitionDelay: `${300 + index * 120}ms` }}
    >
      <a
        ref={cardRef}
        onMouseMove={handleMove}
        href={`${GITHUB}/${project.repo}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`group relative flex h-full flex-col overflow-hidden rounded-xl border bg-gray-950/60 p-5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-green-400/60 ${
          project.featured ? "border-green-400/40" : "border-green-400/20"
        }`}
      >
        {/* mouse glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(250px circle at var(--mx, 50%) var(--my, 50%), rgba(74,222,128,0.15), transparent 70%)",
          }}
        />

        {/* top row: number + status */}
        <div className="relative flex items-center justify-between font-mono text-xs">
          <span className="text-gray-500">
            {project.featured ? "★ featured" : `0${index + 1}`}
          </span>
          {project.status && (
            <span className="flex items-center gap-1.5 text-green-400">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
              {project.status}
            </span>
          )}
        </div>

        {/* title */}
        <h3 className="relative mt-4 text-lg font-bold text-white transition-colors group-hover:text-green-400">
          {project.title}
        </h3>

        {/* description (flex-1 pushes the bottom row down) */}
        <p className="relative mt-2 flex-1 text-sm leading-relaxed text-gray-400">
          {project.description}
        </p>

        {/* tech tags */}
        <ul className="relative mt-4 flex flex-wrap gap-2 font-mono text-xs">
          {project.tech.map((t) => (
            <li
              key={t}
              className="rounded-full border border-green-400/30 px-2.5 py-0.5 text-green-400"
            >
              {t}
            </li>
          ))}
        </ul>

        {/* link row */}
        <p className="relative mt-5 border-t border-green-400/10 pt-3 font-mono text-xs text-gray-300 transition-colors group-hover:text-green-400">
          view code{" "}
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
            &rarr;
          </span>
        </p>
      </a>
    </div>
  );
}

function ProjectsSection() {
  const [contentRef, visible] = useReveal(0.1);
  const heading = useScramble("projects", 200, visible);

  return (
    <section id="projects" className="scroll-mt-24">
      <div ref={contentRef} className="mx-auto max-w-5xl px-6 py-24">
        {/* Heading + growing line */}
        <div className={`flex items-center gap-4 ${reveal(visible)}`}>
          <h2
            aria-label="projects"
            className="font-mono text-2xl font-bold text-white"
          >
            <span className="text-green-400">02.</span>{" "}
            <span aria-hidden="true">{heading}</span>
          </h2>
          <span
            className={`h-px flex-1 origin-left bg-green-400/30 transition-transform delay-300 duration-1000 motion-reduce:transition-none ${
              visible ? "scale-x-100" : "scale-x-0"
            }`}
          />
        </div>

        <p
          className={`mt-4 max-w-xl text-sm text-gray-400 ${reveal(visible)}`}
          style={{ transitionDelay: "150ms" }}
        >
          Things I have built while learning. Click a card to see the code on
          GitHub.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.repo}
              project={project}
              index={i}
              visible={visible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;
