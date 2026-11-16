"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";

/* Text is placed glyph by glyph so every character sits on the same circle
   with identical spacing — no textLength squeezing or crowded gaps. */
const RING_TEXT = "Have a project? ~ Let’s Talk ~";
const ACCENT_START = RING_TEXT.indexOf("Let’s Talk");
const ACCENT_END = ACCENT_START + "Let’s Talk".length;

const RING_SIZE = 120;
const RING_CENTER = RING_SIZE / 2;
const RING_RADIUS = 50;

export function TalkButton() {
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const hero = document.querySelector(".hero-scroll-stage");
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) => {
      setPastHero(entry.boundingClientRect.bottom <= 0);
    });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  if (!pastHero) return null;

  const chars = Array.from(RING_TEXT);
  const step = 360 / chars.length;

  return (
    <a
      className="talk"
      href={site.email ? `mailto:${site.email}` : "#contact"}
      aria-label="Let’s talk about your project"
    >
      <svg
        className="talk-ring"
        viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}
        aria-hidden="true"
      >
        {chars.map((char, i) => (
          <text
            key={i}
            x={RING_CENTER}
            y={RING_CENTER - RING_RADIUS}
            textAnchor="middle"
            transform={`rotate(${i * step} ${RING_CENTER} ${RING_CENTER})`}
            className={
              i >= ACCENT_START && i < ACCENT_END
                ? "talk-ring-accent"
                : undefined
            }
          >
            {char === " " ? "\u00a0" : char}
          </text>
        ))}
      </svg>
      <span className="talk-center">
        <img src="/assets/7bd96.svg" width="35" height="35" alt="" />
      </span>
    </a>
  );
}
