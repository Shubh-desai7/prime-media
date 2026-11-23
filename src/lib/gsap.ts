"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register once. Import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap" in client components only.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  // Dev-only handle so animations can be stepped manually in throttled/headless browsers.
  if (process.env.NODE_ENV !== "production") Object.assign(window, { __gsap: gsap, __ST: ScrollTrigger });
}

export { gsap, ScrollTrigger, useGSAP };

export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
export const FINE_POINTER = "(hover: hover) and (pointer: fine)";
