"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { FeaturedProject } from "@/data/featured-projects";

const AUTOPLAY_MS = 6000;
const DRAG_THRESHOLD = 56;

function offsetOf(i: number, active: number, n: number) {
  let d = (i - active + n) % n;
  if (d > n / 2) d -= n;
  return d;
}

export function ProjectDeck({ items }: { items: FeaturedProject[] }) {
  const n = items.length;
  const [active, setActive] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [motionOff, setMotionOff] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ startX: 0, dx: 0, id: -1, captured: false });
  const suppressClick = useRef(false);

  const go = useCallback(
    (dir: number) => setActive((a) => (a + dir + n) % n),
    [n],
  );

  /* Respect the site-wide "Pause motion" switch. */
  useEffect(() => {
    const root = document.documentElement;
    const read = () => setMotionOff(root.dataset.motion === "off");
    read();
    const observer = new MutationObserver(read);
    observer.observe(root, { attributes: true, attributeFilter: ["data-motion"] });
    return () => observer.disconnect();
  }, []);

  const autoplay =
    !userPaused && !hovered && !focused && !dragging && !motionOff;

  useEffect(() => {
    if (!autoplay) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => go(1), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [autoplay, go]);

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    /* Capture only after real movement, otherwise the click never reaches the card link. */
    drag.current = { startX: e.clientX, dx: 0, id: e.pointerId, captured: false };
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (drag.current.id !== e.pointerId) return;
    drag.current.dx = e.clientX - drag.current.startX;
    if (!drag.current.captured && Math.abs(drag.current.dx) > 6) {
      drag.current.captured = true;
      setDragging(true);
      e.currentTarget.setPointerCapture(e.pointerId);
    }
    if (drag.current.captured) {
      stageRef.current?.style.setProperty("--drag", `${drag.current.dx}px`);
    }
  }

  function endDrag(e: React.PointerEvent<HTMLDivElement>) {
    if (drag.current.id !== e.pointerId) return;
    const dx = drag.current.dx;
    const wasCaptured = drag.current.captured;
    drag.current = { startX: 0, dx: 0, id: -1, captured: false };
    stageRef.current?.style.setProperty("--drag", "0px");
    setDragging(false);
    if (wasCaptured && Math.abs(dx) > 8) {
      suppressClick.current = true;
      window.setTimeout(() => (suppressClick.current = false), 0);
    }
    if (wasCaptured && Math.abs(dx) > DRAG_THRESHOLD) go(dx < 0 ? 1 : -1);
  }

  function onClickCapture(e: React.MouseEvent<HTMLDivElement>) {
    if (suppressClick.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    }
  }

  return (
    <section
      className="projects-deck"
      id="projects"
      aria-roledescription="carousel"
      aria-label="Selected projects"
    >
      <div className="deck-head">
        <h2>
          <span className="section-label">[/projects]</span>a look at my projects
        </h2>
        <Link className="deck-all" href="/work">
          View all projects
          <span className="deck-all-arrow" aria-hidden="true">
            ↗
          </span>
        </Link>
      </div>

      <div
        ref={stageRef}
        className={`deck-stage${dragging ? " is-dragging" : ""}`}
        tabIndex={0}
        role="group"
        aria-roledescription="slide container"
        aria-label="Use the arrow keys or drag to browse projects"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
        onDragStart={(e) => e.preventDefault()}
        onKeyDown={onKeyDown}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        {items.map((p, i) => {
          const d = offsetOf(i, active, n);
          const abs = Math.abs(d);
          const isActive = d === 0;
          return (
            <a
              key={p.slug}
              className={`deck-card${isActive ? " is-active" : ""}`}
              href={p.href}
              target="_blank"
              rel="noreferrer"
              aria-hidden={!isActive}
              aria-label={`${p.title} — ${p.kind}. Opens on Behance in a new tab`}
              tabIndex={isActive ? 0 : -1}
              data-abs={abs}
              data-hidden={abs > 2}
              draggable={false}
              style={
                {
                  "--d": d,
                  "--abs": abs,
                  zIndex: 30 - abs,
                } as React.CSSProperties
              }
            >
              <div className="deck-media">
                <Image
                  src={p.cover}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 700px) 78vw, 400px"
                  quality={75}
                />
              </div>
              <div className="deck-body">
                <p className="deck-tags">
                  {String(i + 1).padStart(2, "0")} · {p.tags}
                </p>
                <h3>{p.title}</h3>
                <p className="deck-desc">{p.description}</p>
              </div>
            </a>
          );
        })}
      </div>

      <div className="deck-controls">
        <button
          className="deck-nav"
          type="button"
          aria-label="Previous project"
          onClick={() => go(-1)}
        >
          <span aria-hidden="true">←</span>
        </button>

        <div className="deck-dots" role="tablist" aria-label="Choose a project">
          {items.map((p, i) => (
            <button
              key={p.slug}
              className={`deck-dot${i === active ? " is-active" : ""}`}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={p.title}
              onClick={() => setActive(i)}
            />
          ))}
        </div>

        <button
          className="deck-nav"
          type="button"
          aria-label="Next project"
          onClick={() => go(1)}
        >
          <span aria-hidden="true">→</span>
        </button>

        <button
          className="deck-nav deck-pause"
          type="button"
          aria-label={userPaused ? "Play slideshow" : "Pause slideshow"}
          aria-pressed={userPaused}
          onClick={() => setUserPaused((v) => !v)}
        >
          {userPaused ? (
            <span className="deck-play" aria-hidden="true" />
          ) : (
            <span className="deck-pause-icon" aria-hidden="true">
              <i />
              <i />
            </span>
          )}
        </button>
      </div>

      <p className="visually-hidden" aria-live="polite">
        {`Project ${active + 1} of ${n}: ${items[active].title}`}
      </p>
    </section>
  );
}
