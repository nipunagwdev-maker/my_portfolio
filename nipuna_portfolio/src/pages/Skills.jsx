import { useReveal } from "../hooks/useReveal";
import { useScramble } from "../hooks/useScramble";
import { reveal } from "../utils/reveal";

const LEVELS = { comfortable: 3, building: 2, learning: 1 };

const GROUPS = [
  {
    title: "mobile",
    skills: [
      { name: "Flutter", level: "building" },
      { name: "Dart", level: "building" },
    ],
  },
  {
    title: "web",
    skills: [
      { name: "JavaScript", level: "building" },
      { name: "React", level: "building" },
      { name: "Tailwind CSS", level: "building" },
      { name: "Supabase", level: "learning" },
    ],
  },
  {
    title: "languages & problem solving",
    skills: [
      { name: "Python", level: "building" },
      { name: "Java (OOP)", level: "building" },
      { name: "Data structures & algorithms", level: "learning" },
    ],
  },
  {
    title: "design & tools",
    skills: [
      { name: "Photoshop", level: "comfortable" },
      { name: "Illustrator", level: "comfortable" },
      { name: "UI design", level: "building" },
      { name: "Git & GitHub", level: "building" },
    ],
  },
];

function Dots({ level, show, delay = 0 }) {
  const filled = LEVELS[level];
  return (
    <span role="img" aria-label={level} className="flex gap-1">
      {[1, 2, 3].map((n) => (
        <span
          key={n}
          className={`h-2 w-2 rounded-full transition duration-500 motion-reduce:transition-none ${
            n <= filled ? "bg-green-400" : "bg-green-400/20"
          } ${show ? "scale-100" : "scale-0"}`}
          style={{ transitionDelay: `${delay + n * 100}ms` }}
        />
      ))}
    </span>
  );
}

function SkillsSection() {
  const [contentRef, visible] = useReveal(0.1);
  const heading = useScramble("skills", 200, visible);

  return (
    <section id="skills" className="scroll-mt-24">
      <div ref={contentRef} className="mx-auto max-w-5xl px-6 py-24">
        {/* Heading + growing line */}
        <div className={`flex items-center gap-4 ${reveal(visible)}`}>
          <h2
            aria-label="skills"
            className="font-mono text-2xl font-bold text-white"
          >
            <span className="text-green-400">03.</span>{" "}
            <span aria-hidden="true">{heading}</span>
          </h2>
          <span
            className={`h-px flex-1 origin-left bg-green-400/30 transition-transform delay-300 duration-1000 motion-reduce:transition-none ${
              visible ? "scale-x-100" : "scale-x-0"
            }`}
          />
        </div>

        {/* Legend */}
        <ul
          className={`mt-4 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-gray-400 ${reveal(visible)}`}
          style={{ transitionDelay: "150ms" }}
        >
          {Object.keys(LEVELS).map((level) => (
            <li key={level} className="flex items-center gap-2">
              <Dots level={level} show />
              {level}
            </li>
          ))}
        </ul>

        {/* Skill cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {GROUPS.map((group, gi) => (
            <div
              key={group.title}
              className={`rounded-xl border border-green-400/20 bg-gray-950/60 p-5 backdrop-blur ${reveal(visible)}`}
              style={{ transitionDelay: `${300 + gi * 150}ms` }}
            >
              <h3 className="font-mono text-sm text-gray-500">
                <span className="text-green-400">//</span> {group.title}
              </h3>

              <ul className="mt-3">
                {group.skills.map((skill, si) => (
                  <li
                    key={skill.name}
                    className="group flex items-center justify-between rounded px-2 py-2.5 transition-colors hover:bg-green-400/5"
                  >
                    <span className="text-gray-300 transition-colors group-hover:text-green-400">
                      {skill.name}
                    </span>
                    <Dots
                      level={skill.level}
                      show={visible}
                      delay={500 + gi * 150 + si * 80}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SkillsSection;
