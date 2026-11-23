"use client";

import { useEffect, useRef, useState } from "react";
import { initFloor, type FloorTheme } from "@/lib/floorRipple";

const themes: { id: FloorTheme; label: string }[] = [
  { id: "tiles", label: "Electric tiles" },
  { id: "ripples", label: "Ripples" },
  { id: "petals", label: "Petals" },
  { id: "sparkles", label: "Sparkles" },
];

export default function FloorDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const themeRef = useRef<FloorTheme>("tiles");
  const [theme, setTheme] = useState<FloorTheme>("tiles");
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    return initFloor(c, () => themeRef.current, () => setTouched(true), { ambient: true, tile: 52 });
  }, []);

  return (
    <div>
      <div className="floor" data-cursor="Step here">
        <canvas ref={canvasRef} aria-label="Interactive floor preview. Move your cursor or tap to light the floor." role="img" />
        <div className={`floor__hint${touched ? " hide" : ""}`}>Move your cursor or drag a finger across the floor</div>
      </div>
      <div className="chips" role="group" aria-label="Floor effect preview">
        {themes.map((t) => (
          <button
            key={t.id}
            className="chip"
            aria-pressed={theme === t.id}
            onClick={() => { themeRef.current = t.id; setTheme(t.id); }}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}
