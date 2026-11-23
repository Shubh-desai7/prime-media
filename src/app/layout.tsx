import type { Metadata, Viewport } from "next";
import { Raleway, Source_Sans_3 } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { site } from "@/lib/site";
import "./globals.css";

const display = Raleway({ variable: "--font-display", subsets: ["latin"], weight: ["600", "700", "800"] });
const body = Source_Sans_3({ variable: "--font-body", subsets: ["latin"], weight: ["400", "600", "700"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Prime Media — Interactive Floor Projection & Photobooth for Weddings in Gujarat & Maharashtra",
    template: "%s | Prime Media",
  },
  description:
    "Make your event worth remembering. Prime Media brings interactive floor projection and the MagixPix photobooth to weddings and social events across Gujarat and Maharashtra, with printed and digital keepsakes for every guest.",
  openGraph: {
    type: "website",
    siteName: "Prime Media",
    images: ["/logo.png"],
  },
  icons: { icon: "/logo-sm.png" },
};

export const viewport: Viewport = {
  themeColor: "#150033",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
