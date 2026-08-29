"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Point {
  x: number;
  y: number;
}

export default function FlightArc({ replaySignal }: { replaySignal: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const flightStartRef = useRef(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    flightStartRef.current = performance.now();
  }, [replaySignal]);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const BLUE = "#378ADD";
    const EMBER = "#D85A30";
    const GREEN = "#1D9E75";
    const FAINT = "rgba(22,24,27,0.28)";
    const TRIP = 3400;
    const PAUSE = 1000;
    let w = 0;
    let h = 0;
    let A: Point, B: Point, C: Point;

    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = cv.clientWidth;
      h = cv.clientHeight;
      if (!w || !h) return false;
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      A = { x: w * 0.1, y: h * 0.7 };
      B = { x: w * 0.9, y: h * 0.34 };
      C = { x: w * 0.38, y: h * 0.04 };
      return true;
    };

    const T0 = 0.05;
    const T1 = 0.95;
    const at = (t: number): Point => ({
      x: (1 - t) * (1 - t) * A.x + 2 * (1 - t) * t * C.x + t * t * B.x,
      y: (1 - t) * (1 - t) * A.y + 2 * (1 - t) * t * C.y + t * t * B.y,
    });
    const tangent = (t: number): Point => ({
      x: 2 * (1 - t) * (C.x - A.x) + 2 * t * (B.x - C.x),
      y: 2 * (1 - t) * (C.y - A.y) + 2 * t * (B.y - C.y),
    });

    const arc = (from: number, to: number) => {
      ctx.beginPath();
      const p0 = at(from);
      ctx.moveTo(p0.x, p0.y);
      const steps = 60;
      for (let i = 1; i <= steps; i++) {
        const pt = at(from + (to - from) * (i / steps));
        ctx.lineTo(pt.x, pt.y);
      }
    };

    const draw = (prog: number, ring: number) => {
      ctx.clearRect(0, 0, w, h);

      ctx.save();
      ctx.setLineDash([6, 7]);
      ctx.strokeStyle = FAINT;
      ctx.lineWidth = 1.5;
      ctx.lineCap = "round";
      arc(0, 1);
      ctx.stroke();
      ctx.restore();

      if (prog > T0 + 0.004) {
        ctx.strokeStyle = BLUE;
        ctx.lineWidth = 2.6;
        ctx.lineCap = "round";
        arc(T0, prog);
        ctx.stroke();
      }

      [0.3, 0.5, 0.7].forEach((t) => {
        const pt = at(t);
        ctx.fillStyle = prog >= t ? BLUE : "rgba(22,24,27,0.3)";
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 3.4, 0, 6.2832);
        ctx.fill();
      });

      if (!reduced && ring > 0) {
        ctx.strokeStyle = `rgba(29,158,117,${(1 - ring).toFixed(3)})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(B.x, B.y, 6 + ring * 15, 0, 6.2832);
        ctx.stroke();
      }

      ctx.fillStyle = EMBER;
      ctx.beginPath();
      ctx.arc(A.x, A.y, 5.5, 0, 6.2832);
      ctx.fill();
      ctx.fillStyle = GREEN;
      ctx.beginPath();
      ctx.arc(B.x, B.y, 5.5, 0, 6.2832);
      ctx.fill();

      const pp = at(prog);
      const tg = tangent(prog);
      ctx.save();
      ctx.translate(pp.x, pp.y);
      ctx.rotate(Math.atan2(tg.y, tg.x));
      ctx.fillStyle = BLUE;
      ctx.beginPath();
      ctx.moveTo(9, 0);
      ctx.lineTo(-6, 5.5);
      ctx.lineTo(-6, -5.5);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    let raf = 0;
    flightStartRef.current = performance.now();
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!w && !size()) return;
      if (reduced) {
        draw(T1, 0);
        cancelAnimationFrame(raf);
        return;
      }
      const cycle = TRIP + PAUSE;
      const el = (now - flightStartRef.current) % cycle;
      const prog = Math.min(1, el / TRIP);
      const ease = prog < 1 ? 1 - Math.pow(1 - prog, 2) : 1;
      draw(T0 + (T1 - T0) * ease, (now / 2200) % 1);
    };

    const onResize = () => size();
    size();
    window.addEventListener("resize", onResize);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [reduced]);

  return <canvas ref={canvasRef} data-flight="" aria-hidden="true" style={{ display: "block", position: "absolute", inset: 0, width: "100%", height: "100%" }} />;
}
