import Interactions from "@/components/Interactions";
import type { Metadata } from "next";
import EnquiryForm from "@/components/EnquiryForm";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Check Your Date",
  description: "Tell Prime Media your occasion, city and date. Our team will confirm availability for floor projection and the MagixPix photobooth.",
};

export default function ContactPage() {
  return (
    <>
      <section className="section section--dark" style={{ paddingBottom: "2.5rem" }}>
        <div className="wrap">
          <span className="eyebrow">Plan your event</span>
          <h1>Is your date still free?</h1>
          <p className="lead">Tell us a little about your event. Our team will get back to you on WhatsApp or email to confirm and talk through the details.</p>
        </div>
      </section>
      <div className="beam" aria-hidden />
      <section className="section section--mist">
        <div className="wrap split" style={{ alignItems: "start" }}>
          <EnquiryForm />
          <div>
            <h3>Prefer to message us?</h3>
            <p>Send your date and occasion straight to our team.</p>
            <div className="btn-row" style={{ marginTop: ".5rem" }}>
              <a className="btn btn--lime" href={whatsappLink("Hi Prime Media! I'd like to check availability for my event.")} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
              <a className="btn btn--violet" href={`mailto:${site.email}`}>Email us</a>
            </div>
            <h3 style={{ marginTop: "2.5rem" }}>Visit</h3>
            <p>{site.address.line1}<br />{site.address.line2}</p>
            <p className="note">Serving weddings and events across Gujarat and Maharashtra. {site.proof}.</p>
          </div>
        </div>
      </section>
      <Interactions />
    </>
  );
}
