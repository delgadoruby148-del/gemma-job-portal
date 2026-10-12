"use client";

import { useEffect, useState, type ReactNode } from "react";

const FALLBACK_MS = 2000;

const INTRO_CSS = `
@keyframes orbit-intro {
  0%, 85.714% { opacity: 1; }
  100% { opacity: 0; visibility: hidden; }
}
#orbit-intro {
  animation: orbit-intro 1.75s linear forwards;
}
@media (prefers-reduced-motion: reduce) {
  #orbit-intro {
    animation-duration: 1.5s;
    animation-timing-function: step-end;
  }
}
`;

export function OrbitIntro({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const node = document.getElementById("orbit-intro");
    if (!node) {
      setVisible(false);
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    let finished = false;
    const hide = () => {
      if (finished) return;
      finished = true;
      document.body.style.overflow = previousOverflow;
      setVisible(false);
    };

    const animations = node.getAnimations();
    const running = animations.filter((animation) => animation.playState !== "finished");
    if (animations.length > 0 && running.length === 0) {
      hide();
      return;
    }

    const onFinish = () => {
      const current = node.getAnimations();
      if (current.length === 0 || current.every((animation) => animation.playState === "finished")) {
        hide();
      }
    };

    for (const animation of running) {
      animation.addEventListener("finish", onFinish);
    }

    const fallback = window.setTimeout(hide, FALLBACK_MS);

    return () => {
      window.clearTimeout(fallback);
      document.body.style.overflow = previousOverflow;
      for (const animation of animations) {
        animation.removeEventListener("finish", onFinish);
      }
    };
  }, []);

  return (
    <>
      <div inert={visible ? true : undefined}>{children}</div>
      {visible ? (
        <div
          id="orbit-intro"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950"
          role="status"
          aria-live="polite"
          aria-label="Loading"
        >
          <style>{INTRO_CSS}</style>
          <img
            src="/orbit-logo.png"
            alt=""
            width={600}
            height={182}
            className="h-auto w-[min(78vw,34rem)]"
          />
        </div>
      ) : null}
    </>
  );
}
