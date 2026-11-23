"use client";

import { useRef } from "react";
import { FINE_POINTER, MOTION_OK, ScrollTrigger, gsap, useGSAP } from "@/lib/gsap";

/**
 * Site-wide motion layer. Pages stay server-rendered and simply opt in with data attributes:
 *   data-reveal            fade/slide up on scroll ("left" | "right" | "scale" variants)
 *   data-reveal-group      reveal its direct children one after another
 *   data-magnetic          button/link gently pulls toward the cursor
 *   data-tilt              card tilts in 3D toward the cursor
 *   data-cursor="Label"    glow cursor grows and shows a label over this element
 * Everything is skipped under prefers-reduced-motion.
 *
 * IMPORTANT: render <Interactions /> as the LAST child inside each page, not in the layout. It writes inline styles onto
 * page elements, so it must hydrate after them (the layout hydrates before the page boundary, which causes hydration warnings).
 */
export default function Interactions() {
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        // Scroll reveals
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          const v = el.dataset.reveal;
          gsap.from(el, {
            autoAlpha: 0,
            y: v === "left" || v === "right" || v === "scale" ? 0 : 46,
            x: v === "left" ? -60 : v === "right" ? 60 : 0,
            scale: v === "scale" ? 0.88 : 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });
        gsap.utils.toArray<HTMLElement>("[data-reveal-group]").forEach((group) => {
          gsap.from(group.children, {
            autoAlpha: 0,
            y: 50,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: { trigger: group, start: "top 85%", once: true },
          });
        });
      });

      mm.add(`${MOTION_OK} and ${FINE_POINTER}`, () => {
        const cleanups: Array<() => void> = [];

        // Magnetic buttons
        gsap.utils.toArray<HTMLElement>("[data-magnetic]").forEach((el) => {
          const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
          const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
          const move = (e: PointerEvent) => {
            const r = el.getBoundingClientRect();
            xTo((e.clientX - (r.left + r.width / 2)) * 0.32);
            yTo((e.clientY - (r.top + r.height / 2)) * 0.45);
          };
          const leave = () => { xTo(0); yTo(0); };
          el.addEventListener("pointermove", move);
          el.addEventListener("pointerleave", leave);
          cleanups.push(() => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); });
        });

        // 3D tilt cards
        gsap.utils.toArray<HTMLElement>("[data-tilt]").forEach((el) => {
          gsap.set(el, { transformPerspective: 900, transformOrigin: "center" });
          const rx = gsap.quickTo(el, "rotationX", { duration: 0.5, ease: "power2.out" });
          const ry = gsap.quickTo(el, "rotationY", { duration: 0.5, ease: "power2.out" });
          const move = (e: PointerEvent) => {
            const r = el.getBoundingClientRect();
            ry(((e.clientX - r.left) / r.width - 0.5) * 14);
            rx(-((e.clientY - r.top) / r.height - 0.5) * 14);
          };
          const leave = () => { rx(0); ry(0); };
          el.addEventListener("pointermove", move);
          el.addEventListener("pointerleave", leave);
          cleanups.push(() => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); });
        });

        // Glow cursor
        const c = ring.current, l = label.current;
        if (c && l) {
          gsap.set(c, { autoAlpha: 0, xPercent: -50, yPercent: -50 });
          const cx = gsap.quickTo(c, "x", { duration: 0.28, ease: "power3.out" });
          const cy = gsap.quickTo(c, "y", { duration: 0.28, ease: "power3.out" });
          let shown = false;
          const move = (e: PointerEvent) => {
            if (!shown) { shown = true; gsap.to(c, { autoAlpha: 1, duration: 0.3 }); }
            cx(e.clientX); cy(e.clientY);
            const t = (e.target as HTMLElement | null)?.closest<HTMLElement>("a, button, summary, [data-cursor]");
            const text = t?.closest<HTMLElement>("[data-cursor]")?.dataset.cursor ?? "";
            l.textContent = text;
            gsap.to(c, { scale: text ? 3.4 : t ? 1.9 : 1, duration: 0.3, ease: "power2.out", overwrite: "auto" });
          };
          const out = () => { shown = false; gsap.to(c, { autoAlpha: 0, duration: 0.2 }); };
          window.addEventListener("pointermove", move);
          document.documentElement.addEventListener("pointerleave", out);
          cleanups.push(() => { window.removeEventListener("pointermove", move); document.documentElement.removeEventListener("pointerleave", out); });
        }

        return () => cleanups.forEach((f) => f());
      });

      // Images and fonts change layout height; recompute trigger positions once things settle.
      const t = window.setTimeout(() => ScrollTrigger.refresh(), 400);
      return () => { window.clearTimeout(t); mm.revert(); };
    },
    { dependencies: [] },
  );

  return (
    <div ref={ring} className="cursor" aria-hidden>
      <span ref={label} className="cursor__label" />
    </div>
  );
}
