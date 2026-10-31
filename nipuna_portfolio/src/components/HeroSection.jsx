import { useState, useEffect, useRef } from "react";
import profilePhoto from "../assets/me.jpg";
import { useScramble } from "../hooks/useScramble";

const ROLES = [
  "building Flutter apps",
  "learning React",
  "solving problems in Python",
  "following the latest tech trends",
  "exploring DSA and algorithms",
];

// Shared style for the floating code tags
const TAG =
  "animate-float absolute rounded-lg border border-gray-700 bg-gray-950/90 px-3 py-1.5 font-mono text-xs text-green-400 motion-reduce:animate-none";

function useTypewriter(words, speed = 80, pause = 1500) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIndex];
    let delay = deleting ? speed / 2 : speed;
    if (!deleting && text === word) delay = pause;

    const timer = setTimeout(() => {
      if (!deleting && text === word) {
        setDeleting(true);
      } else if (deleting && text === "") {
        setDeleting(false);
        setWordIndex((wordIndex + 1) % words.length);
      } else {
        setText(word.slice(0, text.length + (deleting ? -1 : 1)));
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [text, deleting, wordIndex, words, speed, pause]);

  return text;
}

function HeroSection() {
  const typed = useTypewriter(ROLES);
  const firstLine = useScramble("I'm Nipuna", 300);
  const secondLine = useScramble("Madhuranga", 900);

  const tiltRef = useRef(null);

  // Photo tilts in 3D toward the mouse
  const handleTilt = (e) => {
    const el = tiltRef.current;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg)`;
  };
  const resetTilt = () => {
    tiltRef.current.style.transform =
      "perspective(900px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <section id="home" className="relative">
      <div className="mx-auto grid min-h-screen max-w-6xl items-center gap-10 px-6 pb-16 pt-28 md:grid-cols-2">
        {/* Left: text */}
        <div>
          <p className="animate-fade-up font-mono text-sm text-green-400 motion-reduce:animate-none">
            &gt; {typed}
            <span className="animate-blink">_</span>
          </p>

          <h1
            aria-label="I'm Nipuna Madhuranga"
            className="mt-3 font-mono text-5xl font-bold leading-tight text-white"
          >
            <span aria-hidden="true">{firstLine}</span>
            <br />
            <span aria-hidden="true" className="text-green-400">
              {secondLine}
            </span>
          </h1>

          <p className="mt-4 text-gray-400">
            <span className="animate-fade-up inline-block [animation-delay:1000ms] motion-reduce:animate-none">
              I design it.
            </span>{" "}
            <span className="animate-fade-up inline-block [animation-delay:1300ms] motion-reduce:animate-none">
              I code it.
            </span>{" "}
            <span className="animate-fade-up inline-block text-green-400 [animation-delay:1600ms] motion-reduce:animate-none">
              I ship it.
            </span>
          </p>

          <div className="animate-fade-up mt-6 flex gap-3 [animation-delay:1900ms] motion-reduce:animate-none">
            <a
              href="#projects"
              className="group rounded bg-green-400 px-4 py-2 text-sm font-semibold text-black transition hover:bg-green-300 hover:shadow-[0_0_24px_rgba(74,222,128,0.5)]"
            >
              View Projects{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1">
                &rarr;
              </span>
            </a>
            <a
              href="#contact"
              className="rounded border border-green-400 px-4 py-2 text-sm text-green-400 transition hover:bg-green-400 hover:text-black"
            >
              Contact Me
            </a>
          </div>
        </div>

        {/* Right: photo (outer = fade-in, inner = 3D tilt) */}
        <div className="animate-fade-up mx-auto w-fit [animation-delay:400ms] motion-reduce:animate-none">
          <div
            ref={tiltRef}
            onMouseMove={handleTilt}
            onMouseLeave={resetTilt}
            className="group relative transition-transform duration-200 ease-out"
          >
            {/* green frame */}
            <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl border-2 border-green-400 transition duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />

            {/* photo + scan line */}
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src={profilePhoto}
                alt="Nipuna Madhuranga"
                className="aspect-[4/5] h-[50vh] w-auto object-cover grayscale transition duration-500 group-hover:grayscale-0 md:h-[60vh]"
              />
              <div className="animate-scan pointer-events-none absolute inset-x-0 h-1/5 bg-linear-to-b from-transparent via-green-400/30 to-transparent motion-reduce:animate-none" />
            </div>

            {/* floating code tags */}
            <div className={`${TAG} -bottom-4 -left-4`}>
              <span className="text-gray-500">const</span> role = "Flutter Dev";
            </div>
            <div className={`${TAG} -right-6 top-10 [animation-delay:1s]`}>
              &lt;React /&gt;
            </div>
            <div className={`${TAG} -left-8 top-1/3 [animation-delay:2s]`}>
              print("Python")
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <a
        href="#about"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 font-mono text-xs text-gray-500 transition hover:text-green-400 md:block"
      >
        scroll <span className="inline-block animate-bounce">&darr;</span>
      </a>
    </section>
  );
}

export default HeroSection;
