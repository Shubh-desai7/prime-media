export type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  tag: "floor" | "booth";
};

const W = 1600;

export const photos: Photo[] = [
  { src: "/images/floor/welcome-petals.jpg", alt: "Guests walking over a Welcome floor projection with rose petals", width: W, height: 1195, tag: "floor" },
  { src: "/images/floor/entrance-crowd.jpg", alt: "Wedding guests on an interactive projected floor at a pink-lit entrance", width: W, height: 1195, tag: "floor" },
  { src: "/images/floor/blue-aisle.jpg", alt: "Projected floral carpet in a blue-lit wedding aisle", width: W, height: 900, tag: "floor" },
  { src: "/images/floor/pink-aisle.jpg", alt: "Pink floral floor projection in a wedding walkway", width: W, height: 900, tag: "floor" },
  { src: "/images/floor/family.jpg", alt: "A family stepping on petals of an interactive floor", width: W, height: 1195, tag: "floor" },
  { src: "/images/floor/kids.jpg", alt: "Children playing on an interactive floor projection", width: W, height: 1195, tag: "floor" },
  { src: "/images/floor/sunflower.jpg", alt: "Sunflower pattern projected on the floor at an event entrance", width: W, height: 1195, tag: "floor" },
  { src: "/images/floor/wedding-arch.jpg", alt: "Floor projection at the entrance arch of a wedding", width: W, height: 1195, tag: "floor" },
  { src: "/images/booth/prints-frames.jpg", alt: "Printed photo keepsakes in decorative frames", width: W, height: 1195, tag: "booth" },
  { src: "/images/booth/prints-red.jpg", alt: "A spread of printed MagixPix photos with red borders", width: W, height: 1195, tag: "booth" },
  { src: "/images/booth/booth-night.jpg", alt: "MagixPix photobooth screen at an outdoor evening event", width: W, height: 1195, tag: "booth" },
  { src: "/images/booth/booth-event.jpg", alt: "Guests gathered around the MagixPix photobooth at a wedding", width: W, height: 1195, tag: "booth" },
  { src: "/images/booth/friends.jpg", alt: "Friends posing with props for a photobooth picture", width: W, height: 1195, tag: "booth" },
  { src: "/images/booth/backdrop.jpg", alt: "Photobooth with a colourful backdrop at an event", width: W, height: 1195, tag: "booth" },
];

export const byName = (name: string) => {
  const p = photos.find((x) => x.src.includes(name));
  if (!p) throw new Error(`Unknown photo: ${name}`);
  return p;
};
