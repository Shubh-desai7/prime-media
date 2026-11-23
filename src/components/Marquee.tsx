"use client";

import { useRef } from "react";
import { MOTION_OK, ScrollTrigger, gsap, useGSAP } from "@/lib/gsap";

/** Big kinetic type band. Runs on its own, speeds up and skews with scroll velocity. */
export default function Marquee({ items }: { items: string[] }) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const loop = gsap.to(track.current, { xPercent: -50, duration: 28, ease: "none", repeat: -1 });
        const skew = gsap.quickTo(root.current, "skewX", { duration: 0.4, ease: "power3.out" });
        const st = ScrollTrigger.create({
          onUpdate: (self) => {
            const v = self.getVelocity();
            gsap.to(loop, { timeScale: 1 + Math.min(Math.abs(v) / 250, 6), duration: 0.2, overwrite: true });
            gsap.to(loop, { timeScale: 1, duration: 1, delay: 0.2, overwrite: "auto" });
            skew(Math.max(-8, Math.min(8, v / -120)));
          },
        });
        return () => { st.kill(); loop.kill(); };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const row = items.map((t, i) => (
    <span key={i} className={i % 2 ? "mq__item mq__item--solid" : "mq__item"}>
      {t}
      <i aria-hidden>✦</i>
    </span>
  ));

  return (
    <div ref={root} className="mq" aria-hidden>
      <div ref={track} className="mq__track">
        <div className="mq__row">{row}</div>
        <div className="mq__row">{row}</div>
      </div>
    </div>
  );
}
