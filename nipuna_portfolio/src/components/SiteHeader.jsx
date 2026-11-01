import { useState } from "react";

const LINKS = ["about", "projects", "skills", "contact"];

function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4 mt-5">
      {/* The pill */}
      <nav className="mx-auto flex max-w-3xl items-center justify-between rounded-full border border-green-400/20 bg-gray-950/70 py-2 pl-5 pr-2 font-mono text-sm shadow-lg shadow-green-400/5 backdrop-blur-md">
        <a
          href="https://github.com/nipunagwdev-maker"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-green-400 text-lg"
        >
          ~/nipuna
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <li key={link}>
              <a
                href={`#${link}`}
                className="rounded-full px-4 py-2 text-gray-300 transition hover:bg-green-400/10 hover:text-green-400"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop button */}
        <a
          href="https://www.fiverr.com/s/yeW2m8A"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden rounded-full bg-green-400 px-4 py-2 font-semibold text-black transition hover:bg-green-300 md:block"
        >
          hire_me()
        </a>

        {/* Mobile button */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="rounded-full px-4 py-2 text-green-400 md:hidden"
        >
          {open ? "close" : "menu"}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <ul className="mx-auto mt-2 max-w-3xl rounded-2xl border border-green-400/20 bg-gray-950/90 p-3 font-mono backdrop-blur-md md:hidden">
          {LINKS.map((link) => (
            <li key={link}>
              <a
                href={`#${link}`}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-4 py-3 text-gray-300 hover:bg-green-400/10 hover:text-green-400"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}

export default SiteHeader;
