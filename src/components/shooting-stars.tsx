"use client";

import { useEffect, useRef } from "react";
import type { AnimationItem } from "lottie-web";

export function ShootingStars() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
    let animation: AnimationItem | undefined;
    let visible = false;
    let loading = false;
    let disposed = false;

    function syncPlayback() {
      const shouldPlay =
        visible &&
        !document.hidden &&
        !reducedMotion.matches &&
        document.documentElement.dataset.motion !== "off";

      if (shouldPlay && !animation && !loading) {
        loading = true;
        // Load the player only when the About section needs it.
        import("lottie-web").then(({ default: lottie }) => {
          if (disposed || !container) return;
          animation = lottie.loadAnimation({
            container,
            renderer: "svg",
            loop: true,
            autoplay: false,
            path: "/assets/shooting-stars.json",
            rendererSettings: {
              preserveAspectRatio: "xMidYMid slice",
              focusable: false,
            },
          });
          animation.addEventListener("DOMLoaded", syncPlayback);
          syncPlayback();
        }).catch(() => {
          // Decorative animation failure must not affect the page content.
          loading = false;
        });
      }

      if (shouldPlay) animation?.play();
      else animation?.pause();
    }

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncPlayback();
    });
    visibilityObserver.observe(container);

    const motionObserver = new MutationObserver(syncPlayback);
    motionObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-motion"],
    });
    reducedMotion.addEventListener("change", syncPlayback);
    document.addEventListener("visibilitychange", syncPlayback);

    return () => {
      disposed = true;
      visibilityObserver.disconnect();
      motionObserver.disconnect();
      reducedMotion.removeEventListener("change", syncPlayback);
      document.removeEventListener("visibilitychange", syncPlayback);
      animation?.destroy();
    };
  }, []);

  return <div ref={containerRef} className="shooting-stars" aria-hidden="true" />;
}
