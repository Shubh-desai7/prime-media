import Interactions from "@/components/Interactions";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Faq from "@/components/Faq";
import Hero from "@/components/Hero";
import FloorDemo from "@/components/FloorDemo";
import { byName, photos } from "@/lib/photos";

export const metadata: Metadata = {
  title: "Interactive Floor Projection for Weddings & Events",
  description:
    "Turn the floor into the moment everyone remembers. Interactive floor projection for weddings, receptions and social events across Gujarat and Maharashtra, set up and run by Prime Media.",
};

const hero = byName("entrance-crowd");
const floor = photos.filter((p) => p.tag === "floor");

const faqs = [
  { q: "Do you set it up, or do we need a technician?", a: "We do everything. Our team brings the setup, installs it at your venue and runs it for the time you book." },
  { q: "Does it work with an ordinary projector?", a: "Yes. The experience is designed to work with standard projectors, using sensor-based motion detection so the floor reacts to guests." },
  { q: "Can it match our wedding theme?", a: "Yes. Welcome messages, patterns and effects can be customised, and ready-made templates are available as a starting point." },
  { q: "Where can it be used?", a: "Entrances, aisles, walkways and dance floors are common. Tell us about your venue and we will advise on the best spot." },
  { q: "Which areas do you serve?", a: "We work across Gujarat and Maharashtra, and have delivered 50+ weddings across both states." },
  { q: "How do we book?", a: "Send us your occasion, city and date through the form or WhatsApp. Our team will confirm availability and talk through the details with you." },
];

export default function FloorProjectionPage() {
  return (
    <>
      <Hero
        compact
        bg={hero.src}
        eyebrow="Floor Projection · Worth remembering"
        words={[{ t: "Turn" }, { t: "the" }, { t: "floor" }, { t: "into", em: true }, { t: "the", em: true }, { t: "moment.", em: true }]}
        lead="An interactive floor that responds to every step, with welcome messages, petals and patterns that bloom as guests walk, dance and play. We bring it, set it up and run it."
        actions={
          <>
            <Link className="btn btn--lime" href="/contact" data-magnetic>Check your date</Link>
            <Link className="btn btn--ghost" href="/gallery" data-magnetic>See it at events</Link>
          </>
        }
      />
      <div className="beam" aria-hidden />

      <section className="section">
        <div className="wrap split">
          <div>
            <span className="eyebrow">What it is</span>
            <h2>A floor that plays back.</h2>
            <p>Guests step onto the floor and it reacts: petals scatter, patterns shift, a welcome message appears. It turns an entrance or a dance floor into something people stop for, film and talk about.</p>
            <ul className="checks">
              <li>Works with standard projectors, with sensor-based motion detection</li>
              <li>Ready-made templates, with customisation to your theme</li>
              <li>Brought, set up and run by our team for the time you book</li>
            </ul>
            <div className="btn-row"><Link className="btn btn--violet" href="/contact">Get a quote</Link></div>
          </div>
          <div className="frame">
            <Image src={byName("welcome-petals").src} alt={byName("welcome-petals").alt} width={1600} height={1195} sizes="(min-width: 900px) 560px, 100vw" />
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="wrap split">
          <div>
            <span className="eyebrow">Preview</span>
            <h2>Touch the floor.</h2>
            <p className="lead">A quick preview of how an interactive floor responds. Pick an effect and move your cursor or finger across it.</p>
          </div>
          <FloorDemo />
        </div>
      </section>

      <section className="section section--mist">
        <div className="wrap">
          <span className="eyebrow">At real events</span>
          <h2>From our weddings and celebrations.</h2>
          <div className="grid grid--3" style={{ marginTop: "2rem" }}>
            {floor.slice(0, 6).map((p) => (
              <div className="card" key={p.src}>
                <Image className="card__img" src={p.src} alt={p.alt} width={p.width} height={p.height} sizes="(min-width: 760px) 380px, 100vw" />
              </div>
            ))}
          </div>
          <div className="btn-row"><Link className="btn btn--violet" href="/gallery">Open the full gallery</Link></div>
        </div>
      </section>

      <section className="section">
        <div className="wrap" style={{ maxWidth: 820 }}>
          <span className="eyebrow">Questions</span>
          <h2>Good to know.</h2>
          <Faq items={faqs} />
        </div>
      </section>

      <section className="section section--dark">
        <div className="wrap center">
          <h2>Is your date still free?</h2>
          <p className="lead center">Tell us the occasion and date. We will come back to you on WhatsApp or email.</p>
          <div className="btn-row" style={{ justifyContent: "center" }}>
            <Link className="btn btn--lime" href="/contact">Check your date</Link>
          </div>
        </div>
      </section>
      <Interactions />
    </>
  );
}
