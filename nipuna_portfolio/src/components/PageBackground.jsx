import { useEffect, useRef } from "react";

const GRID = "28px 28px";
const SPOT = "var(--x, 50%) var(--y, 35%)";

function PageBackground() {
  const ref = useRef(null);

  useEffect(() => {
    const move = (e) => {
      ref.current?.style.setProperty("--x", `${e.clientX}px`);
      ref.current?.style.setProperty("--y", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10"
    >
      {/* 1. faint dots everywhere */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(74,222,128,0.18) 1px, transparent 1px)",
          backgroundSize: GRID,
        }}
      />

      {/* 2. bright dots, visible only near the mouse */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(74,222,128,0.9) 1px, transparent 1px)",
          backgroundSize: GRID,
          maskImage: `radial-gradient(260px circle at ${SPOT}, black, transparent)`,
          WebkitMaskImage: `radial-gradient(260px circle at ${SPOT}, black, transparent)`,
        }}
      />

      {/* 3. soft green glow */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(450px circle at ${SPOT}, rgba(74,222,128,0.12), transparent 70%)`,
        }}
      />
    </div>
  );
}

export default PageBackground;
