import { useState, useEffect } from "react";

const CHARS = "!<>-_\\/[]{}=+*^?#01";
const rand = () => CHARS[Math.floor(Math.random() * CHARS.length)];

export function useScramble(text, startDelay = 0, active = true) {
  const [output, setOutput] = useState(() => text.replace(/\S/g, rand));

  useEffect(() => {
    if (!active) return; // wait until told to start

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOutput(text);
      return;
    }

    let frame = 0;
    let interval;
    const starter = setTimeout(() => {
      interval = setInterval(() => {
        frame += 1;
        const revealed = Math.floor(frame / 3);
        setOutput(
          text
            .split("")
            .map((ch, i) => (ch === " " || i < revealed ? ch : rand()))
            .join(""),
        );
        if (revealed >= text.length) clearInterval(interval);
      }, 40);
    }, startDelay);

    return () => {
      clearTimeout(starter);
      clearInterval(interval);
    };
  }, [text, startDelay, active]);

  return output;
}
