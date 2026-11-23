// Central site config. Contact details come from env so the POC can change them in Vercel without a code change.
// WhatsApp number format: country code + number, digits only, e.g. 919876543210.
export const site = {
  name: "Prime Media",
  tagline: "Your Idea on Our Media",
  promise: "Make your event worth remembering.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://primemedia.example",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "primemedia@live.com",
  facebook: "https://www.facebook.com/primemedia6/",
  address: {
    line1: "Office No. 3, 1st Floor, Bai Avabai Shopping Center",
    line2: "Halar Road, Valsad 396001, Gujarat",
  },
  proof: "50+ weddings across Gujarat & Maharashtra",
} as const;

/** Build a WhatsApp click-to-chat link. Falls back to the number picker if no number is configured. */
export function whatsappLink(text: string): string {
  const base = site.whatsapp ? `https://wa.me/${site.whatsapp}` : "https://wa.me/";
  return `${base}?text=${encodeURIComponent(text)}`;
}

export function mailtoLink(subject: string, body: string): string {
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export const nav = [
  { href: "/floor-projection", label: "Floor Projection" },
  { href: "/magixpix", label: "MagixPix Photobooth" },
  { href: "/gallery", label: "Gallery" },
] as const;
