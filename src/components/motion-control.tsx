"use client";
import { useEffect, useState } from "react";

export function MotionControl() {
  const [paused, setPaused] = useState(false);
  useEffect(
    () => () => {
      delete document.documentElement.dataset.motion;
    },
    [],
  );
  return (
    <button
      className="button motion-control"
      type="button"
      onClick={() => {
        document.documentElement.dataset.motion = paused ? "on" : "off";
        setPaused(!paused);
      }}
    >
      {paused ? "Resume motion" : "Pause motion"}
    </button>
  );
}
