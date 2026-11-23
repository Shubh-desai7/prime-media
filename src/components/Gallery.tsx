"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Photo } from "@/lib/photos";

type Filter = "all" | Photo["tag"];

export default function Gallery({ photos }: { photos: Photo[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [active, setActive] = useState<Photo | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const shown = photos.filter((p) => filter === "all" || p.tag === filter);

  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: "All" },
    { id: "floor", label: "Floor Projection" },
    { id: "booth", label: "MagixPix" },
  ];

  return (
    <>
      <div className="filters" role="group" aria-label="Filter photos">
        {filters.map((f) => (
          <button key={f.id} className="chip" style={{ color: "var(--ink)", borderColor: "#cdbbf0" }} aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>
            {f.label}
          </button>
        ))}
      </div>
      <div className="masonry">
        {shown.map((p) => (
          <button key={p.src} onClick={() => { setActive(p); dialog.current?.showModal(); }} aria-label={`Enlarge: ${p.alt}`}>
            <Image src={p.src} alt={p.alt} width={p.width} height={p.height} sizes="(min-width: 960px) 380px, (min-width: 600px) 50vw, 100vw" />
          </button>
        ))}
      </div>
      <dialog ref={dialog} className="lightbox" onClick={(e) => { if (e.target === dialog.current) dialog.current?.close(); }}>
        {active && (
          <>
            <Image src={active.src} alt={active.alt} width={active.width} height={active.height} sizes="100vw" />
            <p>{active.alt}</p>
            <form method="dialog"><button className="btn btn--lime">Close</button></form>
          </>
        )}
      </dialog>
    </>
  );
}
