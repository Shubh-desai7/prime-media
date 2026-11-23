"use client";

import Image from "next/image";
import { useRef } from "react";
import { MOTION_OK, gsap, useGSAP } from "@/lib/gsap";

// Waypoints (in % of the floor plane) the "guest" walks across. Tiles and ripples sit on the same points.
const PTS = [
  { x: 14, y: 82 },
  { x: 30, y: 64 },
  { x: 48, y: 74 },
  { x: 64, y: 50 },
  { x: 82, y: 58 },
];
const PETALS = Array.from({ length: 16 }, (_, i) => {
  const a = (i / 16) * Math.PI * 2 + (i % 3) * 0.2;
  const r = 70 + (i % 4) * 34;
  return { x: Math.round(Math.cos(a) * r), y: Math.round(Math.sin(a) * r * 0.7), s: 10 + (i % 3) * 5 };
});

const STEPS = [
  { t: "The floor is waiting.", d: "A projected floor lights the way as your guests arrive." },
  { t: "Every step sets it off.", d: "Tiles glow and petals scatter. The entrance becomes the first thing guests talk about." },
  { t: "Then they pose.", d: "The MagixPix photobooth, ready with your names and your theme." },
  { t: "A print slides out.", d: "A printed keepsake in their hand, plus a digital copy on email and WhatsApp." },
  { t: "They take the night home.", d: "A memory they can hold, not one buried in a phone." },
];

export default function Story({ names, date, photo }: { names: string; date: string; photo: string }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const el = root.current;
        if (!el) return;
        el.classList.add("story--live");
        const q = <T extends HTMLElement = HTMLElement>(s: string) => gsap.utils.toArray<T>(s, el);
        const stage = el.querySelector<HTMLElement>(".sg")!;
        const steps = q<HTMLLIElement>(".story__steps li");
        const bar = el.querySelector<HTMLElement>(".story__bar i")!;

        // Starting state for the scrubbed sequence.
        gsap.set(".sg__floor", { autoAlpha: 0, rotateX: 82 });
        gsap.set(".sg__orb", { autoAlpha: 0, left: `${PTS[0].x}%`, top: `${PTS[0].y}%` });
        gsap.set(".sg__tile, .sg__petal", { autoAlpha: 0 });
        gsap.set(".sg__rip", { autoAlpha: 0, scale: 0 });
        gsap.set(".sg__booth", { autoAlpha: 0, scale: 0.7, y: 40 });
        gsap.set(".sg__flash", { autoAlpha: 0 });
        gsap.set(".sg__strip", { yPercent: -105, autoAlpha: 0 });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: el,
            start: "top top+=68",
            end: () => `+=${window.innerHeight * 3.6}`,
            pin: ".story__pin",
            scrub: 0.7,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const idx = Math.min(STEPS.length - 1, Math.floor(self.progress * STEPS.length));
              steps.forEach((s, i) => s.classList.toggle("is-on", i === idx));
              gsap.set(bar, { scaleX: self.progress });
            },
          },
        });

        // 1. The floor powers up.
        tl.to(".sg__floor", { autoAlpha: 1, rotateX: 62, duration: 2, ease: "power2.out" }, 0);

        // 2. A guest walks across; tiles light, ripples ring out, petals scatter.
        tl.to(".sg__orb", { autoAlpha: 1, duration: 0.2 }, 2);
        PTS.forEach((p, i) => {
          const at = 2.15 + i * 0.38;
          if (i > 0) tl.to(".sg__orb", { left: `${p.x}%`, top: `${p.y}%`, duration: 0.38 }, 2.15 + (i - 1) * 0.38);
          tl.to(`.sg__tile[data-i="${i}"]`, { autoAlpha: 1, duration: 0.1 }, at);
          tl.fromTo(`.sg__rip[data-i="${i}"]`, { autoAlpha: 0.9, scale: 0 }, { autoAlpha: 0, scale: 3.2, duration: 0.6, ease: "power2.out" }, at);
        });
        const burst = 2.15 + 2 * 0.38;
        q(".sg__petal").forEach((pe, i) => {
          const p = PETALS[i];
          tl.fromTo(pe, { autoAlpha: 1, x: 0, y: 0, rotate: 0 }, { x: p.x, y: p.y, rotate: 160 + i * 20, autoAlpha: 0, duration: 1, ease: "power2.out" }, burst + i * 0.01);
        });
        tl.to(".sg__orb", { autoAlpha: 0, duration: 0.2 }, 3.5);

        // 3. The booth takes over; the floor tips away.
        tl.to(".sg__floor", { rotateX: 88, y: 90, autoAlpha: 0.12, duration: 1.4, ease: "power2.inOut" }, 4);
        tl.to(".sg__booth", { autoAlpha: 1, scale: 1, y: 0, duration: 1.4, ease: "back.out(1.4)" }, 4.2);

        // 4. Flash, then the print slides out.
        tl.to(".sg__flash", { autoAlpha: 0.95, duration: 0.2, ease: "power1.in" }, 6);
        tl.to(".sg__flash", { autoAlpha: 0, duration: 0.5, ease: "power1.out" }, 6.2);
        tl.set(".sg__strip", { autoAlpha: 1 }, 6.4);
        tl.to(".sg__strip", { yPercent: 6, duration: 1.7, ease: "power2.out" }, 6.5);

        // 5. The keepsake steps forward.
        tl.to(".sg__booth", { autoAlpha: 0.22, scale: 0.9, duration: 1.2, ease: "power2.inOut" }, 8.1);
        tl.set(".sg__out", { zIndex: 6 }, 8.1);
        tl.to(".sg__strip", {
          y: () => -stage.clientHeight * 0.3, yPercent: 0, scale: 1.55, rotate: -5,
          boxShadow: "0 0 60px rgba(163,250,4,0.55), 0 30px 70px rgba(0,0,0,0.5)", duration: 1.5, ease: "power3.inOut",
        }, 8.2);
        tl.to({}, { duration: 0 }, 10);

        return () => {
          el.classList.remove("story--live");
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="story" aria-label="How a Prime Media event unfolds">
      <div className="story__pin">
        <div className="wrap story__grid">
          <div className="story__text">
            <span className="eyebrow">From the first step to the last photo</span>
            <h2>One night. <em>Two things they&apos;ll never forget.</em></h2>
            <ol className="story__steps">
              {STEPS.map((s, i) => (
                <li key={s.t} className="is-on">
                  <b>0{i + 1}</b>
                  <div><h3>{s.t}</h3><p>{s.d}</p></div>
                </li>
              ))}
            </ol>
            <div className="story__bar" aria-hidden><i /></div>
          </div>

          <div className="sg" aria-hidden>
            <div className="sg__glow" />
            <div className="sg__floor">
              {PTS.map((p, i) => (
                <span key={i} className="sg__tile" data-i={i} style={{ left: `${p.x}%`, top: `${p.y}%` }} />
              ))}
              {PTS.map((p, i) => (
                <span key={i} className="sg__rip" data-i={i} style={{ left: `${p.x}%`, top: `${p.y}%` }} />
              ))}
              {PETALS.map((p, i) => (
                <span key={i} className="sg__petal" style={{ left: "48%", top: "74%", width: p.s, height: p.s * 0.6 }} />
              ))}
              <span className="sg__orb" />
            </div>

            <div className="sg__booth">
              <div className="sg__screen">
                <Image src={photo} alt="" fill sizes="(min-width: 900px) 280px, 60vw" />
                <span className="sg__flash" />
              </div>
              <span className="sg__slot" />
            </div>
            <div className="sg__out">
              <div className="sg__strip">
                <Image src={photo} alt="" width={320} height={240} sizes="200px" />
                <div><strong>{names}</strong><span>{date}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
