import { useRef } from "react";
import { useReveal } from "../hooks/useReveal";
import { useScramble } from "../hooks/useScramble";

const TECH = [
  "Flutter",
  "Dart",
  "React",
  "Tailwind CSS",
  "Python",
  "Java",
  "Git",
  "Supabase",
];

const TERMINAL = [
  { kind: "cmd", text: "whoami" },
  { kind: "out", text: "nipuna_madhuranga" },
  { kind: "cmd", text: "cat currently.txt" },
  { kind: "out", text: "> building ShareBite" },
  { kind: "out", text: "> learning Supabase" },
  { kind: "out", text: "> DSA practicals" },
  { kind: "out", text: "> LeetCode in Python" },
  { kind: "cmd", text: "git status" },
  { kind: "status", text: "open to internships" },
];

// Classes for "hidden until scrolled into view"
const reveal = (show) =>
  `transition duration-700 ease-out motion-reduce:transition-none ${
    show ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
  }`;

function AboutSection() {
  const sectionRef = useRef(null);
  const [contentRef, visible] = useReveal(0.15);
  const heading = useScramble("about", 200, visible);

  // Same mouse spotlight as the hero
  const handleSpotlight = (e) => {
    const rect = sectionRef.current.getBoundingClientRect();
    sectionRef.current.style.setProperty("--x", `${e.clientX - rect.left}px`);
    sectionRef.current.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      onMouseMove={handleSpotlight}
      className="relative isolate scroll-mt-24 overflow-hidden"
    >
      {/* Background: dot grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(rgba(74,222,128,0.35) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />
      {/* Background: spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(450px circle at var(--x, 30%) var(--y, 50%), rgba(74,222,128,0.12), transparent 70%)",
        }}
      />

      <div ref={contentRef} className="mx-auto max-w-5xl px-6 py-24">
        {/* Heading + growing line */}
        <div className={`flex items-center gap-4 ${reveal(visible)}`}>
          <h2
            aria-label="about"
            className="font-mono text-2xl font-bold text-white"
          >
            <span className="text-green-400">01.</span>{" "}
            <span aria-hidden="true">{heading}</span>
          </h2>
          <span
            className={`h-px flex-1 origin-left bg-green-400/30 transition-transform delay-300 duration-1000 motion-reduce:transition-none ${
              visible ? "scale-x-100" : "scale-x-0"
            }`}
          />
        </div>

        <div className="mt-10 grid gap-10 md:grid-cols-5">
          {/* Left: story */}
          <div className="space-y-4 text-gray-400 md:col-span-3">
            <p
              className={`text-lg text-gray-200 ${reveal(visible)}`}
              style={{ transitionDelay: "200ms" }}
            >
              I build mobile and web apps that solve{" "}
              <span className="text-green-400">real problems</span>.
            </p>
            <p className={reveal(visible)} style={{ transitionDelay: "350ms" }}>
              My main tools are Flutter and React. Right now I'm building{" "}
              <span className="text-green-400">ShareBite</span>, a platform that
              helps students share surplus food on campus, using React, Tailwind
              CSS and Supabase.
            </p>
            <p className={reveal(visible)} style={{ transitionDelay: "500ms" }}>
              Before software, I worked as a graphic designer (freelance since
              2023), so I care about how an app looks and feels, not only
              whether it works.
            </p>
            <p className={reveal(visible)} style={{ transitionDelay: "650ms" }}>
              I practice Python on HackerRank and LeetCode and do DSA practicals
              every week, so my problem-solving stays sharp.
            </p>

            {/* Tech tags */}
            <ul className="flex flex-wrap gap-2 pt-2 font-mono text-xs">
              {TECH.map((t, i) => (
                <li
                  key={t}
                  className={reveal(visible)}
                  style={{ transitionDelay: `${800 + i * 70}ms` }}
                >
                  <span className="block cursor-default rounded-full border border-green-400/30 px-3 py-1 text-green-400 transition duration-200 hover:-translate-y-1 hover:bg-green-400/10 hover:shadow-[0_0_16px_rgba(74,222,128,0.35)]">
                    {t}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: terminal window */}
          <div
            className={`h-fit overflow-hidden rounded-xl border border-green-400/20 bg-gray-950/60 font-mono text-sm backdrop-blur md:col-span-2 ${reveal(visible)}`}
            style={{ transitionDelay: "300ms" }}
          >
            {/* title bar */}
            <div className="flex items-center gap-2 border-b border-green-400/20 bg-green-400/5 px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
              <span className="ml-2 text-xs text-gray-500">
                nipuna@portfolio:~
              </span>
            </div>

            {/* lines */}
            <div className="space-y-1.5 p-4">
              {TERMINAL.map((line, i) => (
                <p
                  key={i}
                  className={`${reveal(visible)} ${line.kind === "cmd" && i !== 0 ? "pt-2" : ""}`}
                  style={{ transitionDelay: `${600 + i * 180}ms` }}
                >
                  {line.kind === "cmd" && (
                    <>
                      <span className="text-green-400">$</span>{" "}
                      <span className="text-gray-200">{line.text}</span>
                    </>
                  )}
                  {line.kind === "out" && (
                    <span className="text-gray-400">{line.text}</span>
                  )}
                  {line.kind === "status" && (
                    <span className="flex items-center gap-2 text-green-400">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
                      {line.text}
                    </span>
                  )}
                </p>
              ))}
              <p className="pt-2 text-green-400">
                $ <span className="animate-blink">_</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
