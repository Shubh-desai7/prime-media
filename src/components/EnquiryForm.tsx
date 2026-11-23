"use client";

import { FormEvent, useState } from "react";
import { mailtoLink, whatsappLink } from "@/lib/site";

type Values = Record<string, string>;

function compose(v: Values) {
  return [
    "Hi Prime Media! I'd like to check availability.",
    "",
    `Name: ${v.name}`,
    `Phone: ${v.phone}`,
    v.email ? `Email: ${v.email}` : "",
    `Event: ${v.event}`,
    `Date: ${v.date || "Not decided yet"}`,
    `City: ${v.city}`,
    `Looking for: ${v.experience}`,
    v.guests ? `Approx. guests: ${v.guests}` : "",
    v.message ? `Notes: ${v.message}` : "",
  ].filter(Boolean).join("\n");
}

export default function EnquiryForm() {
  const [sent, setSent] = useState<Values | null>(null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const v = Object.fromEntries(new FormData(e.currentTarget).entries()) as Values;
    setSent(v);
    window.open(whatsappLink(compose(v)), "_blank", "noopener,noreferrer");
  }

  if (sent) {
    return (
      <div className="formbox" role="status">
        <h3>One last tap on WhatsApp</h3>
        <p>We opened WhatsApp with your details filled in. Just press send and our team will get back to you.</p>
        <p className="note">Nothing opened? Use the buttons below.</p>
        <div className="btn-row">
          <a className="btn btn--lime" href={whatsappLink(compose(sent))} target="_blank" rel="noopener noreferrer">Open WhatsApp</a>
          <a className="btn btn--violet" href={mailtoLink("Event enquiry — Prime Media", compose(sent))}>Send by email instead</a>
          <button className="btn btn--ghost" type="button" onClick={() => setSent(null)}>Edit details</button>
        </div>
      </div>
    );
  }

  return (
    <form className="formbox" onSubmit={onSubmit}>
      <div className="row2">
        <div className="field">
          <label htmlFor="name">Your name *</label>
          <input id="name" name="name" required autoComplete="name" />
        </div>
        <div className="field">
          <label htmlFor="phone">Phone / WhatsApp *</label>
          <input id="phone" name="phone" type="tel" required autoComplete="tel" inputMode="tel" />
        </div>
      </div>
      <div className="field">
        <label htmlFor="email">Email (optional)</label>
        <input id="email" name="email" type="email" autoComplete="email" />
      </div>
      <div className="row2">
        <div className="field">
          <label htmlFor="event">Occasion *</label>
          <select id="event" name="event" required defaultValue="Wedding">
            <option>Wedding</option>
            <option>Sangeet / Mehendi / Haldi</option>
            <option>Reception / Engagement</option>
            <option>Birthday / Anniversary</option>
            <option>Corporate / Brand event</option>
            <option>Mall / Play zone</option>
            <option>Other</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="date">Event date</label>
          <input id="date" name="date" type="date" />
        </div>
      </div>
      <div className="row2">
        <div className="field">
          <label htmlFor="city">City / venue *</label>
          <input id="city" name="city" required placeholder="e.g. Surat, Mumbai" />
        </div>
        <div className="field">
          <label htmlFor="experience">What are you looking for? *</label>
          <select id="experience" name="experience" required defaultValue="Both">
            <option value="Both">Both — floor projection and photobooth</option>
            <option value="Floor Projection">Floor Projection</option>
            <option value="MagixPix Photobooth">MagixPix Photobooth</option>
            <option value="Not sure yet">Not sure yet</option>
          </select>
        </div>
      </div>
      <div className="field">
        <label htmlFor="guests">Approx. guests (optional)</label>
        <input id="guests" name="guests" inputMode="numeric" placeholder="e.g. 300" />
      </div>
      <div className="field">
        <label htmlFor="message">Anything we should know? (optional)</label>
        <textarea id="message" name="message" rows={3} placeholder="Theme, venue, ideas for the printed keepsake…" />
      </div>
      <button className="btn btn--lime" type="submit">Send on WhatsApp</button>
      <p className="note" style={{ marginTop: ".9rem" }}>This opens WhatsApp with your details filled in. You can also email us from the next step.</p>
    </form>
  );
}
