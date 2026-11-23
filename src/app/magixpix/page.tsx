import Interactions from "@/components/Interactions";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Faq from "@/components/Faq";
import Hero from "@/components/Hero";
import KeepsakeBuilder from "@/components/KeepsakeBuilder";
import { byName, photos } from "@/lib/photos";

export const metadata: Metadata = {
  title: "MagixPix Photobooth with Printed & Digital Copies",
  description:
    "A photobooth where every guest takes the night home. Customised printed keepsakes in paper, wooden and non-frame formats, plus digital copies on email and WhatsApp. Weddings across Gujarat and Maharashtra.",
};

const hero = byName("booth-event");
const booth = photos.filter((p) => p.tag === "booth");

const faqs = [
  { q: "What do guests get?", a: "A printed copy to take home that night, plus a digital copy sent by email or WhatsApp." },
  { q: "What print formats are available?", a: "Prints come on different paper types, in wooden frame and non-frame formats. Our team will show you the options and help you choose." },
  { q: "Can the keepsake be customised?", a: "Yes. Names, the date and the design can be shaped around your event. Tell us your theme and we will take it from there." },
  { q: "Who sets it up?", a: "We do. Our team brings the photobooth, sets it up and runs it for the time you book, so guests can simply walk up and enjoy it." },
  { q: "How do digital copies reach guests?", a: "By email and WhatsApp." },
  { q: "Which areas do you serve?", a: "Across Gujarat and Maharashtra. We have delivered 50+ weddings across both states." },
  { q: "How do we book?", a: "Send us your occasion, city and date through the form or WhatsApp. Our team will confirm availability and talk through the details." },
];

export default function MagixPixPage() {
  return (
    <>
      <Hero
        compact
        bg={hero.src}
        eyebrow="MagixPix Photobooth · Take something home"
        words={[{ t: "Every" }, { t: "guest" }, { t: "takes", em: true }, { t: "the", em: true }, { t: "night", em: true }, { t: "home.", em: true }]}
        lead="A photobooth with a printed keepsake in every guest's hand and a digital copy on their phone, designed around your event. We bring it, set it up and run it."
        actions={
          <>
            <Link className="btn btn--lime" href="/contact" data-magnetic>Check your date</Link>
            <Link className="btn btn--ghost" href="/gallery" data-magnetic>See it at events</Link>
          </>
        }
      />
      <div className="beam" aria-hidden />

      <section className="section">
        <div className="wrap split split--rev">
          <div className="frame">
            <Image src={byName("prints-red").src} alt={byName("prints-red").alt} width={1600} height={1195} sizes="(min-width: 900px) 560px, 100vw" />
          </div>
          <div>
            <span className="eyebrow">The keepsake</span>
            <h2>Photos on phones get forgotten. Prints don&apos;t.</h2>
            <p>Guests pose, the booth prints, and they leave with a physical memory of your event. A digital copy follows on email and WhatsApp.</p>
            <ul className="checks">
              <li>Printed copies on different paper types</li>
              <li>Wooden frame and non-frame formats</li>
              <li>Customised with your names, date and design</li>
              <li>Digital copies by email and WhatsApp</li>
            </ul>
            <div className="btn-row"><Link className="btn btn--violet" href="/contact">Get a quote</Link></div>
          </div>
        </div>
      </section>

      <section className="section section--mist">
        <div className="wrap">
          <span className="eyebrow">Design your keepsake</span>
          <h2>See it with your names.</h2>
          <p className="lead" style={{ marginBottom: "2rem" }}>A quick preview. The final design is fully customisable, and our team will shape it with you.</p>
          <KeepsakeBuilder />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <span className="eyebrow">At real events</span>
          <h2>Guests, props and prints.</h2>
          <div className="grid grid--3" style={{ marginTop: "2rem" }}>
            {booth.slice(0, 6).map((p) => (
              <div className="card" key={p.src}>
                <Image className="card__img" src={p.src} alt={p.alt} width={p.width} height={p.height} sizes="(min-width: 760px) 380px, 100vw" />
              </div>
            ))}
          </div>
          <div className="btn-row"><Link className="btn btn--violet" href="/gallery">Open the full gallery</Link></div>
        </div>
      </section>

      <section className="section section--mist">
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
