"use client";

import Image from "next/image";
import { ReactNode, useEffect, useRef } from "react";
import { initFloor } from "@/lib/floorRipple";
import { FINE_POINTER, MOTION_OK, gsap, useGSAP } from "@/lib/gsap";

type Word = { t: string; em?: boolean };

type Props = {
  eyebrow: string;
  words: Word[];
  lead: string;
  actions: ReactNode;
  aside?: ReactNode;
  foot?: ReactNode;
  compact?: boolean;
  /** Optional photo shown dimly behind the floor. */
  bg?: string;
};

/**
 * Hero whose background IS the interactive floor: electric tiles light up under the cursor or finger,
 * the headline slams in word by word, and floating photos drift with the pointer.
 */
export default function Hero({ eyebrow, words, lead, actions, aside, foot, compact, bg }: Props) {
  const root = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = canvas.current, r = root.current;
    if (!c || !r) return;
    return initFloor(c, () => "tiles", undefined, { ambient: true, tile: compact ? 52 : 60, eventTarget: r });
  }, [compact]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
        tl.set(".hero__title .wi", { yPercent: 115, rotate: 6, visibility: "visible" })
          .from(".hero__eyebrow", { autoAlpha: 0, x: -30, duration: 0.7 })
          .to(".hero__title .wi", { yPercent: 0, rotate: 0, duration: 0.95, stagger: 0.09 }, "-=0.35")
          .add(() => { root.current?.querySelectorAll<HTMLElement>(".hero__title .w").forEach((w) => { w.style.overflow = "visible"; }); })
          .from(".hero__beam", { scaleX: 0, transformOrigin: "left center", duration: 1.1, ease: "expo.out" }, "-=0.5")
          .from(".hero__lead", { autoAlpha: 0, y: 26, duration: 0.8 }, "-=0.7")
          .from(".hero__actions > *", { autoAlpha: 0, y: 24, scale: 0.9, duration: 0.6, stagger: 0.1 }, "-=0.5")
          .from(".hero__aside [data-depth]", { autoAlpha: 0, y: -160, rotate: (i) => (i % 2 ? 18 : -18), duration: 1.2, stagger: 0.18, ease: "back.out(1.5)" }, "-=1")
          .from(".hero__foot > *", { autoAlpha: 0, y: 20, duration: 0.6, stagger: 0.1 }, "-=0.6");

        // Electric flicker on the highlighted words, like a neon sign finding its power.
        gsap.fromTo(
          ".hero__title .em",
          { textShadow: "0 0 0 rgba(163,250,4,0)" },
          { textShadow: "0 0 28px rgba(163,250,4,0.65), 0 0 60px rgba(163,250,4,0.3)", duration: 0.12, repeat: 7, yoyo: true, ease: "none", delay: 1.4, repeatRefresh: false },
        );
        gsap.to(".hero__title .em", { textShadow: "0 0 24px rgba(163,250,4,0.55), 0 0 56px rgba(163,250,4,0.25)", delay: 2.4, duration: 1.4, repeat: -1, yoyo: true, ease: "sine.inOut" });

        // Count-up for the proof number.
        const counter = root.current?.querySelector<HTMLElement>("[data-count]");
        if (counter) {
          const end = Number(counter.dataset.count);
          counter.textContent = "0";
          const o = { v: 0 };
          gsap.to(o, { v: end, duration: 2.2, delay: 1.6, ease: "power2.out", onUpdate: () => { counter.textContent = String(Math.round(o.v)); } });
        }
      });

      mm.add(`${MOTION_OK} and ${FINE_POINTER}`, () => {
        // Pointer parallax: each floating photo moves at its own depth.
        const els = gsap.utils.toArray<HTMLElement>(".hero__aside [data-depth]");
        const movers = els.map((el) => ({
          x: gsap.quickTo(el, "x", { duration: 0.9, ease: "power3.out" }),
          y: gsap.quickTo(el, "y", { duration: 0.9, ease: "power3.out" }),
          d: Number(el.dataset.depth),
        }));
        const move = (e: PointerEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5, ny = e.clientY / window.innerHeight - 0.5;
          movers.forEach((m) => { m.x(nx * m.d * -1); m.y(ny * m.d * -1); });
        };
        window.addEventListener("pointermove", move);
        return () => window.removeEventListener("pointermove", move);
      });

      // Scroll-away: content drifts up and the floor dims as you leave the hero.
      mm.add(MOTION_OK, () => {
        gsap.to(".hero__content", {
          yPercent: -14, autoAlpha: 0.2, ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className={`hero hero--electric${compact ? " hero--compact" : ""}`}>
      {bg && <Image className="hero__bg" src={bg} alt="" fill priority sizes="100vw" />}
      <canvas ref={canvas} className="hero__floor" aria-hidden />
      <div className="hero__vignette" aria-hidden />
      <div className="wrap hero__content">
        <div className={`hero__grid${aside ? " hero__grid--aside" : ""}`}>
          <div className="hero__copy">
            <span className="eyebrow hero__eyebrow">{eyebrow}</span>
            <h1 className="hero__title" aria-label={words.map((w) => w.t).join(" ")}>
              {words.map((w, i) => (
                <span className="w" key={i} aria-hidden>
                  <span className={`wi${w.em ? " em" : ""}`}>{w.t}</span>
                </span>
              ))}
            </h1>
            <div className="hero__beam" aria-hidden />
            <p className="lead hero__lead">{lead}</p>
            <div className="btn-row hero__actions">{actions}</div>
          </div>
          {aside && <div className="hero__aside">{aside}</div>}
        </div>
        {foot && <div className="hero__foot">{foot}</div>}
      </div>
    </section>
  );
}
