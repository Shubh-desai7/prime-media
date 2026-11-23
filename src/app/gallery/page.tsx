import Interactions from "@/components/Interactions";
import type { Metadata } from "next";
import Link from "next/link";
import Gallery from "@/components/Gallery";
import { photos } from "@/lib/photos";

export const metadata: Metadata = {
  title: "Event Gallery",
  description: "Real weddings and events: interactive floor projection and MagixPix photobooth keepsakes from Prime Media.",
};

export default function GalleryPage() {
  return (
    <>
      <section className="section section--dark" style={{ paddingBottom: "2.5rem" }}>
        <div className="wrap">
          <span className="eyebrow">Gallery</span>
          <h1>Real events, real keepsakes.</h1>
          <p className="lead">A look at the floors and photobooths we have set up at weddings and celebrations.</p>
        </div>
      </section>
      <div className="beam" aria-hidden />
      <section className="section">
        <div className="wrap">
          <Gallery photos={photos} />
          <div className="btn-row"><Link className="btn btn--lime" href="/contact">Check your date</Link></div>
        </div>
      </section>
      <Interactions />
    </>
  );
}
