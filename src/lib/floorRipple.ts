// Vanilla canvas "interactive floor" engine. No framework dependencies: React only mounts and unmounts it.
// Themes: "tiles" (electric dance-floor tiles that light under the pointer), "ripples", "petals", "sparkles".
// It is a visual preview of how Floor Projection reacts to guests, not a product list.

export type FloorTheme = "tiles" | "ripples" | "petals" | "sparkles";

export type FloorOptions = {
  /** Keep generating gentle ambient activity even after the user has touched the floor. */
  ambient?: boolean;
  /** Tile size in CSS px for the "tiles" theme. */
  tile?: number;
  /** Element that receives pointer events (defaults to the canvas). Lets a hero section drive a background canvas. */
  eventTarget?: HTMLElement;
};

type Particle = {
  x: number; y: number; vx: number; vy: number;
  life: number; max: number; size: number; hue: number; rot: number; vr: number;
};

const PALETTE = ["#a3fa04", "#b98cff", "#ffffff", "#5002b0"];
const LIME: [number, number, number] = [163, 250, 4];
const LILAC: [number, number, number] = [185, 140, 255];
const VIOLET: [number, number, number] = [80, 2, 176];

const mix = (a: [number, number, number], b: [number, number, number], t: number) =>
  `${Math.round(a[0] + (b[0] - a[0]) * t)},${Math.round(a[1] + (b[1] - a[1]) * t)},${Math.round(a[2] + (b[2] - a[2]) * t)}`;

export function initFloor(
  canvas: HTMLCanvasElement,
  getTheme: () => FloorTheme,
  onFirstTouch?: () => void,
  opts: FloorOptions = {},
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const target = opts.eventTarget ?? canvas;
  const ambientAlways = opts.ambient ?? false;

  let w = 0, h = 0, dpr = 1, raf = 0, last = 0, touched = false, ambient = 0, wave = 0, running = true;
  let size = opts.tile ?? 56, cols = 0, rows = 0, energy = new Float32Array(0);
  const parts: Particle[] = [];
  let prev: { x: number; y: number } | null = null;

  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    const r = canvas.getBoundingClientRect();
    w = r.width; h = r.height;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    size = w < 600 ? Math.min(opts.tile ?? 56, 44) : opts.tile ?? 56;
    cols = Math.ceil(w / size);
    rows = Math.ceil(h / size);
    energy = new Float32Array(cols * rows);
  };

  const light = (x: number, y: number, amount = 1, radius = 1) => {
    const cx = Math.floor(x / size), cy = Math.floor(y / size);
    for (let dy = -radius; dy <= radius; dy++) {
      for (let dx = -radius; dx <= radius; dx++) {
        const tx = cx + dx, ty = cy + dy;
        if (tx < 0 || ty < 0 || tx >= cols || ty >= rows) continue;
        const d = Math.hypot(dx, dy);
        const v = amount * Math.max(0, 1 - d / (radius + 0.6));
        const i = ty * cols + tx;
        if (v > energy[i]) energy[i] = v;
      }
    }
  };

  const spawn = (x: number, y: number, burst = 1) => {
    const theme = getTheme();
    if (theme === "tiles") { light(x, y, 1, 1); return; }
    for (let i = 0; i < burst; i++) {
      const hue = Math.floor(Math.random() * PALETTE.length);
      if (theme === "ripples") {
        parts.push({ x, y, vx: 0, vy: 0, life: 0, max: 1.1, size: 6, hue, rot: 0, vr: 0 });
      } else if (theme === "petals") {
        const a = Math.random() * Math.PI * 2, s = 20 + Math.random() * 60;
        parts.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 0, max: 1.6 + Math.random(), size: 7 + Math.random() * 8, hue: 1, rot: Math.random() * 6, vr: (Math.random() - 0.5) * 6 });
      } else {
        const a = Math.random() * Math.PI * 2, s = 10 + Math.random() * 90;
        parts.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 0, max: 0.7 + Math.random() * 0.8, size: 2 + Math.random() * 3, hue, rot: 0, vr: 0 });
      }
    }
    if (parts.length > 600) parts.splice(0, parts.length - 600);
  };

  const drawGrid = () => {
    ctx.fillStyle = "rgba(185,140,255,0.16)";
    const gap = 34;
    for (let gy = gap / 2; gy < h; gy += gap) for (let gx = gap / 2; gx < w; gx += gap) ctx.fillRect(gx, gy, 2, 2);
  };

  const drawTiles = (dt: number) => {
    // A radial "wave" sweeps outward now and then so the floor looks alive before anyone touches it.
    if (wave > 0) {
      wave -= dt;
    }
    for (let ty = 0; ty < rows; ty++) {
      for (let tx = 0; tx < cols; tx++) {
        const i = ty * cols + tx;
        let e = energy[i];
        if (e > 0) energy[i] = e = Math.max(0, e - dt * 0.7);
        const x = tx * size, y = ty * size, s = size - 4;
        let fill: string, glow = 0;
        if (e <= 0.004) {
          fill = "rgba(185,140,255,0.045)";
        } else if (e < 0.55) {
          const t = e / 0.55;
          fill = `rgba(${mix(VIOLET, LILAC, t)},${(0.12 + t * 0.5).toFixed(3)})`;
        } else {
          const t = (e - 0.55) / 0.45;
          fill = `rgba(${mix(LILAC, LIME, t)},${(0.6 + t * 0.4).toFixed(3)})`;
          glow = 14 * t;
        }
        ctx.shadowBlur = glow;
        ctx.shadowColor = glow ? "rgba(163,250,4,0.9)" : "transparent";
        ctx.fillStyle = fill;
        ctx.beginPath();
        ctx.roundRect(x + 2, y + 2, s, s, 6);
        ctx.fill();
      }
    }
    ctx.shadowBlur = 0;
  };

  const startWave = () => {
    const ox = Math.random() * w, oy = Math.random() * h;
    wave = 1.4;
    const t0 = performance.now();
    const step = (now: number) => {
      const k = (now - t0) / 1000;
      if (k > 1.4 || !running) return;
      const r = k * Math.max(w, h) * 0.55;
      for (let a = 0; a < Math.PI * 2; a += 0.12) light(ox + Math.cos(a) * r, oy + Math.sin(a) * r, 0.75, 0);
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const frame = (t: number) => {
    const dt = Math.min((t - last) / 1000 || 0.016, 0.05);
    last = t;
    ctx.clearRect(0, 0, w, h);
    const theme = getTheme();

    if (theme === "tiles") drawTiles(dt); else drawGrid();

    if (!touched || ambientAlways) {
      ambient += dt;
      const every = theme === "tiles" ? (touched ? 2.4 : 1.7) : 1.1;
      if (ambient > every) {
        ambient = 0;
        if (theme === "tiles") { if (Math.random() < 0.45) startWave(); else light(Math.random() * w, Math.random() * h, 1, 1); }
        else spawn(w * (0.25 + Math.random() * 0.5), h * (0.3 + Math.random() * 0.4));
      }
    }

    for (let i = parts.length - 1; i >= 0; i--) {
      const p = parts[i];
      p.life += dt;
      if (p.life >= p.max) { parts.splice(i, 1); continue; }
      const k = p.life / p.max, a = 1 - k;
      p.x += p.vx * dt; p.y += p.vy * dt; p.rot += p.vr * dt;
      if (theme === "ripples") {
        ctx.strokeStyle = PALETTE[p.hue]; ctx.globalAlpha = a * 0.9; ctx.lineWidth = 2 + a * 3;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size + k * 90, 0, Math.PI * 2); ctx.stroke();
      } else if (theme === "petals") {
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.globalAlpha = a;
        ctx.fillStyle = k < 0.5 ? "#ff7ab8" : "#ffb3d6";
        ctx.beginPath(); ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore();
      } else if (theme === "sparkles") {
        ctx.globalAlpha = a; ctx.fillStyle = PALETTE[p.hue];
        ctx.shadowColor = PALETTE[p.hue]; ctx.shadowBlur = 12;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size * (1 - k * 0.4), 0, Math.PI * 2); ctx.fill(); ctx.shadowBlur = 0;
      }
    }
    ctx.globalAlpha = 1;
    raf = requestAnimationFrame(frame);
  };

  const pos = (e: PointerEvent) => {
    const r = canvas.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };
  const touch = () => { if (!touched) { touched = true; onFirstTouch?.(); } };
  let lastSpawn = 0;
  const onMove = (e: PointerEvent) => {
    const { x, y } = pos(e);
    if (x < 0 || y < 0 || x > w || y > h) { prev = null; return; }
    const theme = getTheme();
    if (theme === "tiles") {
      // Interpolate between samples so a fast cursor leaves a continuous trail of lit tiles.
      if (e.pointerType === "mouse" || e.buttons) {
        touch();
        if (prev) {
          const dist = Math.hypot(x - prev.x, y - prev.y), n = Math.max(1, Math.ceil(dist / (size * 0.5)));
          for (let i = 1; i <= n; i++) light(prev.x + ((x - prev.x) * i) / n, prev.y + ((y - prev.y) * i) / n, 1, 1);
        } else light(x, y, 1, 1);
      }
      prev = { x, y };
      return;
    }
    const now = performance.now();
    if (now - lastSpawn > (theme === "ripples" ? 110 : 35)) {
      lastSpawn = now;
      if (e.pointerType === "mouse" || e.buttons) { touch(); spawn(x, y, theme === "ripples" ? 1 : 2); }
    }
  };
  const onDown = (e: PointerEvent) => {
    const { x, y } = pos(e);
    touch();
    if (getTheme() === "tiles") { light(x, y, 1, 2); prev = { x, y }; }
    else spawn(x, y, getTheme() === "ripples" ? 2 : 14);
  };
  const onLeave = () => { prev = null; };

  const onVisibility = () => {
    if (document.hidden) { cancelAnimationFrame(raf); running = false; }
    else if (!reduce && !running) { running = true; last = performance.now(); raf = requestAnimationFrame(frame); }
  };

  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  target.addEventListener("pointermove", onMove);
  target.addEventListener("pointerdown", onDown);
  target.addEventListener("pointerleave", onLeave);
  document.addEventListener("visibilitychange", onVisibility);

  const cleanup = () => {
    running = false;
    cancelAnimationFrame(raf);
    ro.disconnect();
    target.removeEventListener("pointermove", onMove);
    target.removeEventListener("pointerdown", onDown);
    target.removeEventListener("pointerleave", onLeave);
    document.removeEventListener("visibilitychange", onVisibility);
  };

  if (reduce) {
    // Reduced motion: no loop. Draw a still floor and light the tile a user taps.
    const redraw = () => { ctx.clearRect(0, 0, w, h); if (getTheme() === "tiles") drawTiles(0); else drawGrid(); };
    redraw();
    const onTapStill = (e: PointerEvent) => { const { x, y } = pos(e); light(x, y, 0.9, 1); redraw(); onFirstTouch?.(); };
    target.addEventListener("pointerdown", onTapStill);
    return () => { cleanup(); target.removeEventListener("pointerdown", onTapStill); };
  }

  raf = requestAnimationFrame(frame);
  return cleanup;
}
