"use client";

import Image from "next/image";
import { useRef } from "react";
import type { Photo } from "@/lib/photos";
import { MOTION_OK, gsap, useGSAP } from "@/lib/gsap";

/** "Real events" gallery. On desktop the section pins and the photos glide sideways as you scroll; on phones it is a swipeable row. */
export default function EventsStrip({ photos }: { photos: Photo[] }) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`(min-width: 900px) and ${MOTION_OK}`, () => {
        const el = root.current, tr = track.current;
        if (!el || !tr) return;
        el.classList.add("hs--live");
        const dist = () => Math.max(0, tr.scrollWidth - window.innerWidth + 80);
        const tween = gsap.to(tr, {
          x: () => -dist(),
          ease: "none",
          scrollTrigger: { trigger: el, start: "top top+=68", end: () => `+=${dist()}`, pin: true, scrub: 0.6, anticipatePin: 1, invalidateOnRefresh: true },
        });
        // Photos drift against the scroll for depth.
        gsap.utils.toArray<HTMLElement>(".hs__card img", el).forEach((img, i) => {
          gsap.fromTo(img, { xPercent: -6 }, { xPercent: 6, ease: "none", scrollTrigger: { trigger: el, start: "top top+=68", end: () => `+=${dist()}`, scrub: true } , delay: i * 0 });
        });
        return () => { el.classList.remove("hs--live"); tween.scrollTrigger?.kill(); tween.kill(); };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="hs" aria-label="Real events">
      <div className="hs__pin">
        <div className="hs__track" ref={track}>
          <div className="hs__intro">
            <span className="eyebrow">Real events</span>
            <h2>Not a mock-up. <em>Real floors, real prints.</em></h2>
            <p className="lead">From weddings across Gujarat and Maharashtra.</p>
          </div>
          {photos.map((p, i) => (
            <figure className={`hs__card hs__card--${i % 3}`} key={p.src} data-cursor="View">
              <div className="hs__img">
                <Image src={p.src} alt={p.alt} width={p.width} height={p.height} sizes="(min-width: 900px) 520px, 80vw" />
              </div>
              <figcaption>{p.tag === "floor" ? "Floor Projection" : "MagixPix"}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
