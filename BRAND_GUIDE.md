# Prime Media — Brand Guide (v0.1 draft)

Built from the client's **updated logo** (`assets/logo/logo-v2.png`, 1817×866). Colors were sampled from the file, and contrast ratios are WCAG calculations. (An earlier draft used the old 210 px logo; its colors were wrong and have been replaced.)
**Scope for now:** Floor Projection and MagixPix Photobooth. Other products (Prime Touch, Virtual DJ, Jumpido, Home Automation, AR, and so on) are parked and can be added later under the same system.

Legend: **[Source]** = measured or taken from the client's files. **[Proposed]** = my recommendation, for client approval.

---

## 1. Brand foundation

| | |
|---|---|
| **Name** | Prime Media (always two words, both capitalised) |
| **Tagline [Source]** | *Your Idea on Our Media* |
| **Positioning [Proposed]** | We make your event worth remembering, and give every guest something to take home. |
| **Personality [Proposed]** | Warm, playful, confident, reliable |
| **Primary audience** | Wedding and social-event planners, venues, and event-company owners |
| **Secondary audience** | Brand/marketing managers and BTL/activation agency producers; malls, entertainment zones and kids' play areas |
| **Business model [Source: client]** | Rented service, not sold equipment or software. Prime Media brings and sets up the experience for the booked time. Priced internally by time (and, for MagixPix, number of copies). **The website shows no prices and is lead-focused.** |
| **Proof headline [Client]** | **50+ weddings across Gujarat and Maharashtra** |
| **Values [Source, from site copy]** | Curiosity, customization, real-time delivery, service excellence, fair pricing |

**Two product stories**
- **Floor Projection.** The floor becomes the show. Guests step, dance and play, and the floor reacts, so the event has a moment people talk about.
- **MagixPix.** A photobooth where every guest leaves with a printed copy in hand and a digital copy on their phone (email and WhatsApp). Prints come in different paper types, wooden and non-frame formats, and can be customised, branded with the event's name or the host's design. A keepsake that outlasts the night.

---

## 2. Logo

### What the current logo is **[Source: updated logo, `assets/logo/logo-v2.png`, 1817×866]**
- **PRIME** in heavy deep-violet block capitals. A lime-green horizontal band runs *behind* the letters, which are cut where the band passes through, so it reads like a scan-line or projector beam.
- **MEDIA** in white on a green gradient bar (lime at the edges, mid-green in the centre).
- A red script tagline, *Your Idea on Our Media*.
- This replaces the old 210×100 files (`logo.png`, `smlogo.png`, `logo-trans.png`), which should no longer be used. The new file is still a raster image on a white background.

### What works
- The band cutting through PRIME is distinctive and already says "light, projection, screen". It is the brand's core graphic idea.
- Deep violet and electric lime is an unusual, high-energy pair that suits event and entertainment work.
- At 1817 px wide it is usable for web and most print.

### Problems to fix **[Proposed]**
| Issue | Why it matters |
|---|---|
| Raster with a white background | It can't sit on dark or photo backgrounds, and it will blur on very large banners or LED walls. It needs a **vector (SVG) trace and a transparent version**. |
| White "MEDIA" on the green bar has about **2.4:1** contrast (on the lime ends, about **1.3:1**) | Hard to read from a distance. The fix is dark violet text on the bar, or a darker green. |
| Red tagline on violet has about **2:1** contrast | It disappears on any violet surface, so the tagline is white-background only. |
| The lime band and gradient bar are bright and busy | On dark backgrounds the gradient looks muddy, so make flat one-colour versions. |
| Four colors (violet, lime, green, red) | The red script is the odd one out. Treat it as optional and drop it from compact uses. |

### Logo versions to produce
1. **Primary lockup.** PRIME and MEDIA, with the tagline optional.
2. **Compact lockup.** PRIME and MEDIA without the tagline, for headers.
3. **Monogram "P".** The "P" cut by the lime band, for favicons, social avatars and photobooth watermarks (minimum 16 px).
4. **One-colour versions.** All white, all deep purple, and all black, for print, embroidery and sponsor-overlay use.
5. **On-dark version.** The light violet (`violet-300`) plus lime, flat with no gradient.

### Clear space and size
- Clear space on all sides equals the height of the "M" in MEDIA.
- Minimum width: **120 px** for screens or **30 mm** for print on the full lockup; **90 px** without the tagline. Use the monogram below that.
- Don't stretch, rotate, recolor outside the palette, add shadows or outlines, or place on busy photos without a solid plate.

---

## 3. Color

### Core palette **[Source: sampled from the updated logo]**
| Role | Name | Hex |
|---|---|---|
| Brand primary | **Prime Violet** | `#5002B0` |
| Brand accent | **Spark Lime** | `#A3FA04` |
| Secondary green | **Media Green** | `#58BD03` |
| Tagline red | **Signal Red** | `#D90807` |

### Extended palette **[Proposed]**
| Token | Hex | Use |
|---|---|---|
| `violet-950` | `#150033` | Dark-mode background, footer, hero overlays, text on lime |
| `violet-600` | `#5002B0` | **Logo violet**: headings, links, primary buttons on light |
| `violet-300` | `#B98CFF` | Glow and highlights on dark backgrounds |
| `lime-400` | `#A3FA04` | **Logo lime**: CTAs, highlights, glows (never as a text color on white) |
| `green-500` | `#58BD03` | Logo green, graphics and icons only |
| `green-700` | `#3F7A00` | Green text on white |
| `mist` | `#F6F2FF` | Light section backgrounds |
| `white` | `#FFFFFF` | Surfaces |
| `red-600` | `#D90807` | Errors, and tagline on white only |

### Approved pairings (WCAG contrast)
| Text on background | Ratio | Verdict |
|---|---|---|
| White on `violet-950` | 19.5 | AAA |
| White on `violet-600` (logo violet) | 10.6 | AAA |
| `violet-600` on `mist` | 9.6 | AAA |
| `violet-950` on `lime-400` | 15.0 | AAA (**use this for buttons**) |
| `lime-400` on `violet-950` | 15.0 | AAA (lime on dark) |
| `violet-600` on `lime-400` | 8.2 | AAA |
| `violet-300` on `violet-950` | 7.7 | AAA |
| `green-700` on white | 5.3 | AA |
| White on `red-600` | 5.3 | AA |
| White on `green-500` (the logo's MEDIA bar) | 2.4 | **Fails** |
| White on `lime-400` | 1.3 | **Never** |
| `red-600` on `violet-600` | 2.0 | **Never** |

### Usage ratio
60% neutral (white, mist or violet-950), 30% violet, 10% lime. Lime is the "action" color, so keep it for CTAs and key moments.

### Product accents **[Proposed]**
Both products share the system and are told apart by a single secondary color:
- **Floor Projection:** violet-led, with lime interaction highlights. It feels like a dark room with glowing light.
- **MagixPix:** lime-led on light backgrounds. It feels bright, social and friendly.

---

## 4. Typography

The current site uses **Raleway** (headings and nav) and **Source Sans Pro** (body), both from Google Fonts. **[Source]**

| Role | Font | Weight | Notes |
|---|---|---|---|
| Display / H1–H2 | **Raleway** | 700–800 | Keep it: continuity with the existing identity and it's free. Uppercase for display, tracking +2%. |
| Headings H3–H4 | Raleway | 600 | Sentence case |
| Body / UI | **Source Sans 3** (the current name of Source Sans Pro) | 400/600 | 16–18 px, line height 1.6 |
| Tagline / accent | **Caveat** or similar script | 600 | **[Proposed]** Replaces the logo's script for web, used sparingly and only large |

Scale (web, desktop → mobile): H1 56 → 36 px, H2 40 → 28, H3 24 → 20, body 18 → 16.
Always self-host fonts. The current site loads over `http://`, which gets blocked on https pages.

---

## 5. Graphic language

- **Scan-line stripes.** Reuse the lime beam that cuts through PRIME as a horizontal band or repeating scan-lines in section dividers, hero overlays and photobooth frame borders. This is the brand's signature device.
- **Light and glow.** Soft violet and lime glows on dark backgrounds, as if cast by a projector.
- **Shapes.** Rounded rectangles (12–16 px radius) for cards and buttons, circles for the interaction "ripples" in Floor Projection visuals.
- **Floor Projection motif.** A top-down grid with radial ripples and footprints.
- **MagixPix motif.** A photo-strip or polaroid frame with the event name and date in the footer, like a keepsake.
- **Icons.** Rounded line icons, 2 px stroke.

---

## 6. Photography and video

- **Always show people in the act.** Kids chasing floor graphics, groups posing in the booth. The product is the experience, not the hardware.
- Floor Projection should be shot in dim ambient light so the projection glows. Include a wide shot and a close-up of feet and effects.
- MagixPix should show the booth and a finished branded photo side by side.
- Use real event photos from the client's gallery where licensed. Don't mix in stock photos of unrelated tech.
- The old pages use low-resolution images, so request **originals** from the client before building.
- Video: a 15–30 s looping silent hero reel per product.

---

## 7. Voice and messaging

- **Tone:** warm, energetic, clear. Talk about the guest's experience and what they take home, not hardware.
- **Do:** short sentences, active verbs, concrete moments ("a printed copy in your hand in seconds, a digital copy on your phone"). **Don't** put prices on the site.
- **Don't:** jargon, exclamation marks everywhere, or the legacy lines "We ain't stopping there" and "no life without technology".

**Tagline.** Keep *Your Idea on Our Media* as the master line.

| Product | Draft headline **[Proposed]** | Support line |
|---|---|---|
| Master line | **Make your event worth remembering.** | We bring the experience, set it up and run it for your event. |
| Floor Projection | **Turn the floor into the moment everyone remembers.** | An interactive floor that reacts to every step, for weddings, parties and launches. |
| MagixPix | **Every guest takes the night home.** | A photobooth with instant printed copies and digital copies, designed for your event. |

**Calls to action:** "Check your date", "Get a quote", "See it live". Use these instead of "Visit product" or "Book a demo" (there is no product to demo or buy; they are booking a service).

---

## 8. Web design tokens (starter)

```css
:root {
  --violet-950: #150033;
  --violet-600: #5002B0;
  --violet-300: #B98CFF;
  --lime-400:   #A3FA04;
  --green-500:  #58BD03;
  --green-700:  #3F7A00;
  --ink:        #150033;
  --mist:       #F6F2FF;
  --red-600:    #D90807;

  --font-display: "Raleway", system-ui, sans-serif;
  --font-body: "Source Sans 3", system-ui, sans-serif;
  --radius: 14px;
}
.btn-primary { background: var(--lime-400); color: var(--ink); } /* 15:1 */
```

---

## 9. Applications (first priority)

1. Website (home, Floor Projection page, MagixPix page, gallery, contact)
2. Product one-pager PDFs for each product
3. Photobooth overlay templates (frame, logo placement, QR)
4. Social avatar and cover images
5. Event standees and banners (vector logo required)

---

## 10. Decisions needed from the client

1. Is the logo open to a **cleanup and vector redraw**, or must it stay pixel-identical? (My recommendation is a faithful redraw with the contrast fixes above.)
2. Do you have the **original logo file** (AI, PSD or CDR or a high-res PNG)? The supplied one is only 210 px wide.
3. Is the **red script tagline** to stay in the logo?
4. Are the **Raleway** and green and purple colors approved as the base, or is there appetite for a refresh?
5. Should **MagixPix** and **Floor Projection** be presented as sub-brands under Prime Media, or as simply product names?
