import Image from "next/image";
import Link from "next/link";
import { nav, site } from "@/lib/site";

export default function Footer() {
  return (
    <>
      <div className="beam" aria-hidden />
      <footer className="footer">
        <div className="wrap footer__grid">
          <div>
            <span className="footer__logo">
              <Image src="/logo-sm.png" alt="Prime Media" width={360} height={172} />
            </span>
            <p>{site.promise} Interactive floor projection and the MagixPix photobooth for weddings and social events across Gujarat and Maharashtra.</p>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              <li><Link href="/">Home</Link></li>
              {nav.map((n) => (
                <li key={n.href}><Link href={n.href}>{n.label}</Link></li>
              ))}
              <li><Link href="/contact">Check your date</Link></li>
            </ul>
          </div>
          <div>
            <h4>Get in touch</h4>
            <ul>
              <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
              <li><a href={site.facebook} target="_blank" rel="noopener noreferrer">Facebook</a></li>
              <li>{site.address.line1}<br />{site.address.line2}</li>
            </ul>
          </div>
        </div>
        <div className="wrap">
          <small>© Prime Media. {site.tagline}.</small>
        </div>
      </footer>
    </>
  );
}
