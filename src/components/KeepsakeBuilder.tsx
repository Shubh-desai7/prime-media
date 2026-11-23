"use client";

import Image from "next/image";
import { useState } from "react";
import { whatsappLink } from "@/lib/site";

const frames = [
  { id: "white", label: "Classic white", bg: "#ffffff", fg: "#150033" },
  { id: "violet", label: "Prime violet", bg: "#5002b0", fg: "#ffffff" },
  { id: "lime", label: "Lime", bg: "#a3fa04", fg: "#150033" },
  { id: "ink", label: "Midnight", bg: "#150033", fg: "#ffffff" },
] as const;

const formats = [
  { id: "paper", label: "Printed strip" },
  { id: "wood", label: "Wooden frame" },
  { id: "flat", label: "Non-frame print" },
] as const;

export default function KeepsakeBuilder() {
  const [title, setTitle] = useState("Riya & Arjun");
  const [date, setDate] = useState("14 February");
  const [frame, setFrame] = useState<(typeof frames)[number]["id"]>("violet");
  const [format, setFormat] = useState<(typeof formats)[number]["id"]>("paper");
  const f = frames.find((x) => x.id === frame)!;
  const fm = formats.find((x) => x.id === format)!;

  const msg = `Hi Prime Media! I designed a keepsake on your website: "${title}" · ${date}, ${f.label} frame, ${fm.label}. I'd like to check availability for my event.`;

  return (
    <div className="builder">
      <div>
        <div className="field">
          <label htmlFor="kb-title">Names or event title</label>
          <input id="kb-title" value={title} maxLength={32} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="kb-date">Date or line of text</label>
          <input id="kb-date" value={date} maxLength={36} onChange={(e) => setDate(e.target.value)} />
        </div>
        <fieldset className="field">
          <legend>Frame colour</legend>
          <div className="swatches">
            {frames.map((x) => (
              <button
                key={x.id}
                type="button"
                className="swatch"
                style={{ background: x.bg }}
                aria-label={x.label}
                aria-pressed={frame === x.id}
                onClick={() => setFrame(x.id)}
              />
            ))}
          </div>
        </fieldset>
        <fieldset className="field">
          <legend>Print style</legend>
          <div className="seg">
            {formats.map((x) => (
              <button key={x.id} type="button" aria-pressed={format === x.id} onClick={() => setFormat(x.id)}>
                {x.label}
              </button>
            ))}
          </div>
        </fieldset>
        <p className="note">A preview only. Paper types, sizes and designs are fully customisable. Tell us what you have in mind and our team will shape it with you.</p>
        <div className="btn-row">
          <a className="btn btn--lime" href={whatsappLink(msg)} target="_blank" rel="noopener noreferrer">Like it? Check your date</a>
        </div>
      </div>

      <div className={`keep keep--${format === "paper" ? "paper" : format}`} aria-live="polite">
        <div className="keep__card" style={format === "wood" ? undefined : format === "flat" ? undefined : { background: f.bg, color: f.fg }}>
          <Image src="/images/booth/friends.jpg" alt="Sample photobooth photo" width={640} height={478} />
          <div className="keep__foot" style={format === "flat" ? undefined : format === "wood" ? undefined : { color: f.fg }}>
            <strong>{title || "Your names"}</strong>
            <span>{date || "Your date"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
