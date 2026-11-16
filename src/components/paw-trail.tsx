"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const PRINT_COUNT = 48;
const STEP_DISTANCE = 42;
const PRINT_LIFETIME = 900;

export function PawTrail() {
  const layerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;
    const prints = Array.from(layer.children) as HTMLSpanElement[];
    const animations: (Animation | undefined)[] = [];
    const mouse = matchMedia("(any-hover: hover) and (any-pointer: fine)");
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
    let last: { x: number; y: number } | null = null;
    let nextPrint = 0;
    let side = 1;
    let enabled = false;

    function clear() {
      last = null;
      for (const animation of animations) animation?.cancel();
    }

    function syncPreference() {
      enabled =
        mouse.matches &&
        !reducedMotion.matches &&
        document.documentElement.dataset.motion !== "off";
      if (!enabled) clear();
    }

    function stamp(x: number, y: number, angle: number) {
      const index = nextPrint++ % PRINT_COUNT;
      const print = prints[index];
      animations[index]?.cancel();
      // Offset left/right perpendicular to travel, like a cat walking.
      const offset = side * 9;
      side *= -1;
      const left = x - Math.sin(angle) * offset - 16;
      const top = y + Math.cos(angle) * offset - 16;
      print.style.transform = `translate3d(${left}px, ${top}px, 0) rotate(${angle + Math.PI / 2}rad)`;
      animations[index] = print.animate(
        [{ opacity: 0.3 }, { opacity: 0.12, offset: 0.5 }, { opacity: 0 }],
        { duration: PRINT_LIFETIME, easing: "ease-out", fill: "forwards" },
      );
    }

    function onPointerMove(event: PointerEvent) {
      if (!enabled || event.pointerType !== "mouse" || event.buttons !== 0) {
        last = null;
        return;
      }
      const point = { x: event.pageX, y: event.pageY };
      if (!last) {
        last = point;
        return;
      }
      const dx = point.x - last.x;
      const dy = point.y - last.y;
      const distance = Math.hypot(dx, dy);
      if (distance < STEP_DISTANCE) return;
      const angle = Math.atan2(dy, dx);
      // Bound work even when a pointer jumps across a large display.
      const steps = Math.min(Math.floor(distance / STEP_DISTANCE), 12);
      for (let step = 0; step < steps; step++) {
        last = {
          x: last.x + Math.cos(angle) * STEP_DISTANCE,
          y: last.y + Math.sin(angle) * STEP_DISTANCE,
        };
        stamp(last.x, last.y, angle);
      }
      if (distance > STEP_DISTANCE * 12) last = point;
    }

    const resetPosition = () => {
      last = null;
    };
    const onPointerOut = (event: PointerEvent) => {
      if (!event.relatedTarget) resetPosition();
    };
    const observer = new MutationObserver(syncPreference);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-motion"],
    });
    syncPreference();
    mouse.addEventListener("change", syncPreference);
    reducedMotion.addEventListener("change", syncPreference);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerout", onPointerOut);
    window.addEventListener("scroll", resetPosition, { passive: true });
    window.addEventListener("blur", clear);
    document.addEventListener("visibilitychange", clear);
    return () => {
      clear();
      observer.disconnect();
      mouse.removeEventListener("change", syncPreference);
      reducedMotion.removeEventListener("change", syncPreference);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerout", onPointerOut);
      window.removeEventListener("scroll", resetPosition);
      window.removeEventListener("blur", clear);
      document.removeEventListener("visibilitychange", clear);
    };
  }, [pathname]);

  return (
    <div ref={layerRef} className="paw-trail" aria-hidden="true">
      {Array.from({ length: PRINT_COUNT }, (_, index) => (
        <span key={index} className="paw-print" />
      ))}
    </div>
  );
}
