import Interactions from "@/components/Interactions";
import Image from "next/image";
import Link from "next/link";
import EventsStrip from "@/components/EventsStrip";
import FloorDemo from "@/components/FloorDemo";
import Hero from "@/components/Hero";
import KeepsakeBuilder from "@/components/KeepsakeBuilder";
import Marquee from "@/components/Marquee";
import Story from "@/components/Story";
import { byName, photos } from "@/lib/photos";
import { site } from "@/lib/site";

const polA = byName("entrance-crowd");
const polB = byName("prints-red");
const polC = byName("friends");

const words = [{ t: "Make" }, { t: "your" }, { t: "event" }, { t: "worth", em: true }, { t: "remembering.", em: true }];

export default function Home() {
  return (
    <>
      <Hero
        eyebrow="Interactive floor projection + photobooth · Gujarat & Maharashtra"
        words={words}
        lead="We bring a floor that lights up under your guests' feet and a photobooth that sends everyone home with a printed keepsake. We set up and run both, for weddings and social events."
        actions={
          <>
            <Link className="btn btn--lime" href="/contact" data-magnetic>Check your date</Link>
            <a className="btn btn--ghost" href="#story" data-magnetic>Watch it unfold ↓</a>
          </>
        }
        aside={
          <>
            <figure className="polaroid polaroid--a" data-depth="40">
              <Image src={polA.src} alt="" width={polA.width} height={polA.height} sizes="320px" priority />
              <figcaption>The floor reacts</figcaption>
            </figure>
            <figure className="polaroid polaroid--b" data-depth="70">
              <Image src={polB.src} alt="" width={polB.width} height={polB.height} sizes="320px" priority />
              <figcaption>The keepsake</figcaption>
            </figure>
            <figure className="polaroid polaroid--c" data-depth="25">
              <Image src={polC.src} alt="" width={polC.width} height={polC.height} sizes="220px" />
            </figure>
          </>
        }
        foot={
          <>
            <span><b data-count="50">50</b>+ weddings across Gujarat &amp; Maharashtra</span>
            <span>Printed + digital copies</span>
            <span>We bring, set up &amp; run it</span>
          </>
        }
      />
      <div className="beam" aria-hidden />

      <Marquee items={["Worth remembering", "Take it home", "Floor Projection", "MagixPix", "Weddings", "Gujarat", "Maharashtra"]} />

      {/* Positioning */}
      <section className="section section--dark section--glow" id="what">
        <div className="wrap">
          <span className="eyebrow" data-reveal>What Prime Media is</span>
          <h2 className="mega" data-reveal>
            Interactive experiences for weddings &amp; events. <em>Rented, set up and run by us.</em>
          </h2>
          <div className="grid grid--3 pos" data-reveal-group>
            <article className="pcard" data-tilt>
              <b>01</b>
              <span className="tag tag--dark">Worth remembering</span>
              <h3>The Floor</h3>
              <p>Interactive floor projection. Guests step, and the floor reacts with light, petals and your welcome message.</p>
              <Link href="/floor-projection" data-magnetic>Explore the floor →</Link>
            </article>
            <article className="pcard" data-tilt>
              <b>02</b>
              <span className="tag tag--dark">Take something home</span>
              <h3>The Booth</h3>
              <p>MagixPix photobooth. Printed keepsakes in paper, wooden and non-frame formats, plus digital copies by email and WhatsApp.</p>
              <Link href="/magixpix" data-magnetic>Explore the booth →</Link>
            </article>
            <article className="pcard" data-tilt>
              <b>03</b>
              <span className="tag tag--dark">Nothing to manage</span>
              <h3>The Team</h3>
              <p>We bring, set up and operate everything for the time you book, with one point of contact looking after your event.</p>
              <Link href="/contact" data-magnetic>Check your date →</Link>
            </article>
          </div>
          <div className="built" data-reveal>
            <span>Built for</span>
            <b>Wedding &amp; event planners</b>
            <b>Venues &amp; banquet halls</b>
            <b>Families &amp; hosts</b>
            <em>Also: brands · malls · play zones</em>
          </div>
        </div>
      </section>

      <div id="story">
        <Story names="Riya & Arjun" date="14 February" photo={polC.src} />
      </div>

      <section className="section section--dark section--glow">
        <div className="wrap split">
          <div>
            <span className="eyebrow" data-reveal>Try the floor</span>
            <h2 className="mega" data-reveal>Don&apos;t take our word. <em>Step on it.</em></h2>
            <p className="lead" data-reveal>A small preview of how an interactive floor responds. At your event it is projected onto the real floor at your venue.</p>
            <ul className="checks" data-reveal>
              <li>Works on entrances, aisles and dance floors</li>
              <li>Welcome messages, patterns and effects matched to your theme</li>
              <li>Our team sets it up and runs it for the time you book</li>
            </ul>
            <div className="btn-row" data-reveal><Link className="btn btn--lime" href="/floor-projection" data-magnetic>See it at real events</Link></div>
          </div>
          <div data-reveal="scale"><FloorDemo /></div>
        </div>
      </section>

      <section className="section section--mist">
        <div className="wrap">
          <span className="eyebrow" data-reveal>Design your keepsake</span>
          <h2 className="mega" data-reveal>Put your names <em>on the night.</em></h2>
          <p className="lead" style={{ marginBottom: "2rem" }} data-reveal>Add your names and date, pick a frame and a print style, and see what guests could take home.</p>
          <div data-reveal><KeepsakeBuilder /></div>
        </div>
      </section>

      <EventsStrip photos={photos.filter((_, i) => [0, 8, 1, 10, 4, 9, 7, 12].includes(i))} />

      <section className="section">
        <div className="wrap">
          <span className="eyebrow" data-reveal>How it works</span>
          <h2 className="mega" data-reveal>From first message <em>to last dance.</em></h2>
          <ol className="steps" data-reveal-group>
            <li><h3>Tell us your date</h3><p>Share the occasion, city and date. It takes a minute, on WhatsApp or the form.</p></li>
            <li><h3>We shape it with you</h3><p>Our team talks through the floor effects and the keepsake design, then confirms everything.</p></li>
            <li><h3>We set up and run it</h3><p>We arrive, set up, and run it for the time you booked. You enjoy your event.</p></li>
          </ol>
        </div>
      </section>

      <section className="section section--mist">
        <div className="wrap grid grid--2" data-reveal-group>
          <div className="card" data-tilt><div className="card__body">
            <span className="tag">For planners &amp; venues</span>
            <h3>Something extra your clients will remember.</h3>
            <p>Event-company owners and venues: add a guest attraction to your packages and give clients a story to tell. We handle setup and the crew.</p>
            <Link className="btn btn--violet" href="/contact" data-magnetic>Talk to our team</Link>
          </div></div>
          <div className="card" data-tilt><div className="card__body">
            <span className="tag">Brands, malls &amp; play zones</span>
            <h3>Launches, activations and attractions.</h3>
            <p>The same experiences work for brand events, malls and kids&apos; play zones. Longer or repeat setups are possible on request.</p>
            <Link className="btn btn--violet" href="/contact" data-magnetic>Tell us your idea</Link>
          </div></div>
        </div>
      </section>

      <section className="section section--dark section--glow final">
        <div className="wrap center">
          <h2 className="mega" data-reveal>Is your date <em>still free?</em></h2>
          <p className="lead center" data-reveal>{site.proof}. Tell us your occasion and date, and our team will get back to you on WhatsApp or email.</p>
          <div className="btn-row" style={{ justifyContent: "center" }} data-reveal>
            <Link className="btn btn--lime btn--xl" href="/contact" data-magnetic>Check your date</Link>
          </div>
        </div>
      </section>
      <Interactions />
    </>
  );
}
