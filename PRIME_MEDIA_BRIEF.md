# Prime Media — Client Brief & Discovery Notes

Source: the client's existing site files (`PrimeWeb.zip`: `index`, `products`, `Dproduct`, `pdetail`, `Eventgallery`, `process.php`, images).
Legend: **[Source]** = stated in the client's files. **[Inferred]** = my interpretation, confirm with the client. **[Unknown]** = not in the files, must be asked.

---

## 1. What is Prime Media?

An interactive-technology and experiential-media company based in **Valsad, Gujarat, India**. **[Source]**

- Address: Office No. 3, 1st Floor, Bai Avabai Shopping Center, Halar Road, Valsad 396001
- Phone: +91 98984 44164, +91 99044 45164 · Email: primemedia@live.com · Facebook: /primemedia6
- Tagline: *"In the world of technology, we make the difference!"* and *"From concept to production to execution, we are a one-stop solution for everything that is on your mind."*
- Business model **[Inferred]**: B2B sales, installation and rental of interactive installations, plus custom content and software. They work at events, exhibitions, retail and schools.

### Product and service lines **[Source]**
| Product | What it is |
|---|---|
| Floor Projection / Interactive Projection | Sensor-based motion detection on standard projectors, with analytics, central content management and ready templates |
| Interactive Game Zone | Same tech as floor projection, applied to games |
| MagixPix Photobooth | Open-air photobooth that captures leads and sends photos by email, phone or social, branded with the advertiser's logo |
| Prime Touch (Glass Wall) | Touch through shop-window glass up to 20 mm; plug-and-play, pinch/zoom, 30 apps, vandal-resistant |
| Virtual DJ | Kinect/Xtion body-tracking visuals and music |
| Jumpido | Kinect-based maths game for schools |
| Home Automation | Voice control (in regional languages), up to 999 appliances, remote control, video door phone, 60-minute install, no rewiring |
| Augmented Reality | Marker-based 3D overlays for marketing, education and architecture |
| Leap Motion | Resold hand-gesture controller (credited "By Code Rare") |
| Aqua / Fog Projection, 3D Mapping | Listed on the home page but with no detail pages |

### Proof points **[Source]**
- **Vibrant Gujarat Summit 2011**, Mahatma Mandir, Gandhinagar. They claim to be the first in Gujarat to bring touch-based interactive technology there, with touch and motion-based books on Mahatma Gandhi. The Chief Minister at the time, Narendra Modi, visited.
- Event gallery includes weddings (Hyderabad, Chennai), football, DJ and school events.

### Things that stand out **[Inferred]**
- The site is a template (WowThemes), apparently from the Kinect/Leap-Motion era (~2011–2015). Several products use discontinued hardware (Kinect for Windows, Leap Motion), so the tech claims may be outdated.
- The newest dated proof is from 2011. Nothing recent is shown.
- The existing contact form is broken: `process.php` uses `$_post` instead of `$_POST`, wraps PHP in a stray `<root>` tag, and sends to a personal Gmail address. It likely never worked.
- The "Blog" and "About" links exist but the pages weren't supplied.

---

## 2. Who is their target group (TG)?

Not stated by the client. **[Unknown]**, so the list below is **[Inferred]** from the products and content. Validate it.

| Segment | Why | Product fit |
|---|---|---|
| **Brands and marketing / BTL agencies** | They run activations, launches and exhibitions and want footfall and lead capture | MagixPix, floor projection, game zone, AR |
| **Event and wedding planners, corporate event organisers** | Entertainment and "wow" factor at events | Virtual DJ, photobooth, floor projection |
| **Government / large public events** | Past proof is the Vibrant Gujarat Summit | Touch-based showcases, 3D mapping |
| **Retailers and showrooms** | Window and glass-wall interaction to extend selling hours | Prime Touch |
| **Schools and ed-tech buyers** | Interactive education and gesture-based maths | Jumpido, interactive education |
| **Premium homeowners and builders** | Smart home | Home Automation |

Geography: likely Gujarat and western India first, with national event work (Hyderabad, Chennai appear in the gallery). **[Inferred]**

---

## 3. Vision, Mission, Purpose

The client did not state a vision or mission. **[Unknown]** The wording below is derived only from their own copy, as a draft for the client to approve.

- **Purpose (draft):** Make technology feel human and exciting by turning ideas into interactive experiences people can touch, move and play with. Their own line is *"The technology you use impresses no one, the experience you create with it is everything."*
- **Mission (draft):** Be a one-stop partner who takes a client's idea from concept to production to execution, combining cutting-edge technology with the client's requirements at fair pricing and with high standards of service.
- **Vision (draft):** To be the go-to name for interactive and experiential technology in Gujarat and India. *Needs the client's real ambition, e.g. regional, national or international.*

Brand values visible in their copy **[Source]**: curiosity, customization, real-time delivery, service excellence, fair pricing, satisfaction guaranteed. The home-page "PRIME MEDIA" acronym (Perfect solutions, Reinforcing support, Integration & customization, Marvellous technology, Effective pricing) is a ready-made values framework.

---

## 4. Why do they need a (new) website?

**[Inferred]**, to confirm with the client:

1. **Credibility.** A dated template site undermines a company that sells "cutting-edge technology".
2. **Lead generation.** The contact form is broken, so enquiries are probably being lost today.
3. **Mobile.** Bootstrap 3 and jQuery 1.11 pages are unlikely to hold up well on modern phones.
4. **Show, don't tell.** Their products are visual and motion-based. They need video, demo reels and a proper event gallery, not static thumbnails.
5. **Fresh proof.** Recent events, clients and testimonials are missing, so buyers can't tell whether the company is still active.
6. **Findability.** The site has no meta description, no clear product/service pages and no local SEO (Valsad / Gujarat / "interactive projection India").
7. **Segmented messaging.** Brands, schools, retailers and homeowners need different pages and calls to action.
8. **Product catalogue clean-up.** Retire or update discontinued-hardware products and finish the half-built pages (Aqua/Fog/3D Mapping).

---

## 5. Who are their competitors?

Nothing was supplied. **[Unknown]** Use this as a research starting point and **verify each name before presenting it to the client**.

**Direct (interactive tech and experiential vendors)**
- Interactive floor/wall projection and game-zone providers in India, found via searches like "interactive floor projection Ahmedabad/Mumbai/Surat". Include the local Gujarat players.
- Photobooth and activation rental companies (MagixPix-style)
- Touch-glass / interactive kiosk vendors

**Indirect**
- Event-management and BTL agencies that bundle activations
- Home-automation brands and integrators (Google/Alexa-based DIY, Havells, Legrand, local installers)
- Ed-tech and smart-classroom vendors (for Jumpido)
- Freelancers and AR/VR studios

**Action:** run a competitor audit of 5–8 sites, covering positioning, portfolio depth, video use, pricing transparency, lead capture and SEO.

---

## 6. Ideas and questions to answer

### Questions for the client
**Business**
1. Is the company active today? Which product lines still sell? Which should be dropped?
2. Who are the top 3–5 clients you want more of: brands, agencies, schools or homeowners?
3. What counts as success for the new site: enquiries, quote requests, bookings or brand image?
4. Which cities and regions do you serve? Do you ship or travel nationally?
5. Rent, sell or both? Is pricing public, "from ₹X" or on request?
6. What is your real vision, and what makes you different from others in your category?

**Content and proof**
7. Can you provide recent event photos and videos, client logos, testimonials and case studies?
8. Do you have a legal name, logo files and brand colours, or should we design a brand refresh?
9. Do you own the images and videos in the gallery? Is the Narendra Modi mention and photo cleared for use? (A public figure's name and image on a commercial site has legal and reputational risk.)
10. Which of the 2011-era claims should stay (e.g. "first in Gujarat")?

**Technical and operational**
11. Who receives enquiries? Replace the personal Gmail address with a company mailbox.
12. Do you want WhatsApp click-to-chat, a booking calendar or a brochure download?
13. Existing domain, hosting (the `Web.config` suggests IIS/Windows) and email? Is a migration needed?
14. Languages needed: English only, or Gujarati/Hindi as well?
15. Who updates the site after launch, and how often?

### Ideas to propose
- A **hero showreel video** and per-product demo videos
- **Solution pages by audience** (Brands, Events, Retail, Education, Home)
- A **case-study section** led by Vibrant Gujarat, rebuilt from the gallery
- A **"Book a demo / get a quote"** flow with WhatsApp, a working form and a mobile-first call button
- A **filterable event gallery** with lightbox and video
- A **product catalogue** with specs, use cases and "works with" requirements
- **Local SEO** and Google Business Profile for Valsad and Gujarat
- A refreshed visual identity that feels modern, with dark and neon "tech" styling to suit the products
- A **tech refresh narrative** covering updated sensors and hardware to replace Kinect/Leap

### Recommended next steps
1. Get answers to the client questions above (a 30-minute call).
2. Run the competitor audit.
3. Agree sitemap, tone and visual direction.
4. Choose the stack (static site is enough unless a CMS is needed), then build and write the repository's `CLAUDE.md`.
