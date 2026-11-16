"use client";

import { useEffect, useId, useState } from "react";
import { site } from "@/data/site";

export function TalkButton() {
  const circleId = useId();
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

  return (
    <a
      className="talk"
      href={site.email ? `mailto:${site.email}` : "#contact"}
      aria-label="Let’s talk about your project"
    >
      <svg className="talk-ring" viewBox="0 0 104 104" aria-hidden="true">
        <defs>
          <path
            id={circleId}
            d="M52,52 m-43,0 a43,43 0 1,1 86,0 a43,43 0 1,1 -86,0"
          />
        </defs>
        <text>
          <textPath href={`#${circleId}`} startOffset="6" textLength="258" lengthAdjust="spacing">
            Have a project? ~{" "}
            <tspan fill="#b4df12" fontWeight="700">
              Let’s Talk
            </tspan>{" "}
            ~{" "}
          </textPath>
        </text>
      </svg>
      <span className="talk-center">
        <img src="/assets/7bd96.svg" width="35" height="35" alt="" />
      </span>
    </a>
  );
}
