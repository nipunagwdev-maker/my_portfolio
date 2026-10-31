import { useState } from "react";
import { useReveal } from "../hooks/useReveal";
import { useScramble } from "../hooks/useScramble";
import { reveal } from "../utils/reveal";

// ===== CHANGE THESE 3 LINES =====
const EMAIL = "nipuna.gw.dev@gmail.com";
const PHONE_DISPLAY = "+94 76 117 8865"; // how it looks on the page
const PHONE_INTL = "94761178865"; // for links: 94 + number WITHOUT the first 0
// =================================

const CONTACTS = [
  { label: "email", value: EMAIL, href: `mailto:${EMAIL}`, copy: EMAIL },
  {
    label: "whatsapp",
    value: PHONE_DISPLAY,
    href: `https://wa.me/${PHONE_INTL}`,
    external: true,
  },
  {
    label: "phone",
    value: PHONE_DISPLAY,
    href: `tel:+${PHONE_INTL}`,
    copy: PHONE_DISPLAY,
  },
  {
    label: "linkedin",
    value: "in/nipuna-madhuranga",
    href: "https://www.linkedin.com/in/nipuna-madhuranga",
    external: true,
  },
  {
    label: "github",
    value: "nipunagwdev-maker",
    href: "https://github.com/nipunagwdev-maker",
    external: true,
  },
];

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard blocked by the browser: do nothing
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={`Copy ${text}`}
      className="rounded border border-green-400/30 px-2 py-0.5 font-mono text-xs text-green-400 transition hover:bg-green-400/10"
    >
      {copied ? "copied!" : "copy"}
    </button>
  );
}

function ContactSection() {
  const [contentRef, visible] = useReveal(0.15);
  const heading = useScramble("contact", 200, visible);

  return (
    <section id="contact" className="scroll-mt-24">
      <div ref={contentRef} className="mx-auto max-w-5xl px-6 py-24">
        {/* Heading + growing line */}
        <div className={`flex items-center gap-4 ${reveal(visible)}`}>
          <h2
            aria-label="contact"
            className="font-mono text-2xl font-bold text-white"
          >
            <span className="text-green-400">04.</span>{" "}
            <span aria-hidden="true">{heading}</span>
          </h2>
          <span
            className={`h-px flex-1 origin-left bg-green-400/30 transition-transform delay-300 duration-1000 motion-reduce:transition-none ${
              visible ? "scale-x-100" : "scale-x-0"
            }`}
          />
        </div>

        <div className="mt-10 grid items-center gap-10 md:grid-cols-2">
          {/* Left: message */}
          <div>
            <p
              className={`font-mono text-sm text-green-400 ${reveal(visible)}`}
              style={{ transitionDelay: "200ms" }}
            >
              &gt; ./say_hello
            </p>
            <h3
              className={`mt-3 text-3xl font-bold leading-tight text-white md:text-4xl ${reveal(visible)}`}
              style={{ transitionDelay: "300ms" }}
            >
              Let's build something{" "}
              <span className="text-green-400">useful</span> together.
            </h3>
            <p
              className={`mt-4 max-w-md text-gray-400 ${reveal(visible)}`}
              style={{ transitionDelay: "450ms" }}
            >
              I'm open to internships and junior developer roles. The fastest
              way to reach me is email or WhatsApp.
            </p>
            <div
              className={reveal(visible)}
              style={{ transitionDelay: "600ms" }}
            >
              <a
                href={`mailto:${EMAIL}`}
                className="mt-6 inline-block rounded bg-green-400 px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-green-300 hover:shadow-[0_0_24px_rgba(74,222,128,0.5)]"
              >
                Send an email
              </a>
            </div>
          </div>

          {/* Right: terminal card */}
          <div
            className={`overflow-hidden rounded-xl border border-green-400/20 bg-gray-950/60 font-mono text-sm backdrop-blur ${reveal(visible)}`}
            style={{ transitionDelay: "300ms" }}
          >
            {/* title bar */}
            <div className="flex items-center gap-2 border-b border-green-400/20 bg-green-400/5 px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
              <span className="ml-2 text-xs text-gray-500">
                nipuna@portfolio:~/contact
              </span>
            </div>

            <ul className="p-3">
              {CONTACTS.map((c, i) => (
                // outer li = reveal, inner div = hover (one element, one job)
                <li
                  key={c.label}
                  className={reveal(visible)}
                  style={{ transitionDelay: `${500 + i * 120}ms` }}
                >
                  <div className="group flex items-center justify-between gap-3 rounded px-3 py-2.5 transition-colors hover:bg-green-400/5">
                    <a
                      href={c.href}
                      {...(c.external && {
                        target: "_blank",
                        rel: "noopener noreferrer",
                      })}
                      className="flex min-w-0 flex-1 flex-col gap-0.5 sm:flex-row sm:items-center sm:gap-3"
                    >
                      <span className="shrink-0 text-gray-500">
                        <span className="text-green-400">$</span> {c.label}
                      </span>
                      <span className="truncate text-gray-200 transition-colors group-hover:text-green-400">
                        {c.value}
                      </span>
                    </a>
                    {c.copy && <CopyButton text={c.copy} />}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mx-auto max-w-5xl border-t border-green-400/10 px-6 py-6 text-center font-mono text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Nipuna Madhuranga &middot; built with
        React &amp; Tailwind CSS
      </footer>
    </section>
  );
}

export default ContactSection;
