"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { PARTICLE_WORDS } from "@/data/chat";

interface Particle {
  tx: number;
  ty: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  c: string;
  r: number;
}

export default function ParticleText() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const INK = "#F6F4EF";
    const ACCENT = "#16181B";
    let pts: Particle[] = [];
    let w = 0;
    let h = 0;
    const mouse = { x: -9999, y: -9999 };

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = cv.clientWidth;
      h = cv.clientHeight;
      if (!w || !h) return;
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const off = document.createElement("canvas");
      off.width = w;
      off.height = h;
      const o = off.getContext("2d")!;
      const lines = PARTICLE_WORDS;
      const lineH = h / (lines.length + 0.35);
      let size = Math.min(lineH * 1.05, w / 3.4);
      o.textAlign = "center";
      o.textBaseline = "middle";
      o.fillStyle = "#fff";
      const fit = () => {
        o.font = `700 ${size}px Manrope, Helvetica, Arial, sans-serif`;
        return Math.max(...lines.map((t) => o.measureText(t).width));
      };
      while (fit() > w * 0.92 && size > 8) size -= 2;
      o.clearRect(0, 0, w, h);
      lines.forEach((t, i) => {
        o.fillText(t, w / 2, h / 2 + (i - (lines.length - 1) / 2) * lineH);
      });

      const data = o.getImageData(0, 0, w, h).data;
      const gap = w < 480 ? 4 : 5;
      pts = [];
      for (let y = 0; y < h; y += gap) {
        for (let x = 0; x < w; x += gap) {
          if (data[(y * w + x) * 4 + 3] > 128) {
            const accent = Math.random() < 0.12;
            pts.push({
              tx: x,
              ty: y,
              x: reduced ? x : Math.random() * w,
              y: reduced ? y : Math.random() * h,
              vx: 0,
              vy: 0,
              c: accent ? ACCENT : INK,
              r: accent ? 1.6 : 1.2,
            });
          }
        }
      }
    };

    let raf = 0;
    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!pts.length) return;
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < pts.length; i++) {
        const pt = pts[i];
        if (!reduced) {
          pt.vx += (pt.tx - pt.x) * 0.035;
          pt.vy += (pt.ty - pt.y) * 0.035;
          const dx = pt.x - mouse.x;
          const dy = pt.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 1600) {
            const d = Math.sqrt(d2) || 1;
            const push = ((40 - d) / 40) * 4.5;
            pt.vx += (dx / d) * push;
            pt.vy += (dy / d) * push;
          }
          pt.vx *= 0.86;
          pt.vy *= 0.86;
          pt.x += pt.vx;
          pt.y += pt.vy;
        }
        ctx.fillStyle = pt.c;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.r, 0, 6.2832);
        ctx.fill();
      }
    };

    const onMove = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const onResize = () => build();

    build();
    if (!reduced) {
      cv.addEventListener("pointermove", onMove);
      cv.addEventListener("pointerleave", onLeave);
      window.addEventListener("resize", onResize);
    }
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      cv.removeEventListener("pointermove", onMove);
      cv.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      data-particles=""
      aria-hidden="true"
      style={{ display: "block", width: "100%", height: "clamp(140px,20vh,190px)" }}
    />
  );
}
