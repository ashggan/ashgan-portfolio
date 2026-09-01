"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import SideIndex from "@/components/SideIndex";
import ContactBadge from "@/components/ContactBadge";

export default function ScrollStage({ children }: { children: React.ReactNode }) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState("01");

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let lenis: Lenis | null = null;
    let tickerFn: ((time: number) => void) | null = null;
    if (!reduced) {
      lenis = new Lenis({ lerp: 0.09 });
      tickerFn = (time: number) => lenis!.raf(time * 1000);
      gsap.ticker.add(tickerFn);
      gsap.ticker.lagSmoothing(0);
      lenis.on("scroll", ScrollTrigger.update);
    }

    const anchors = Array.from(document.querySelectorAll<HTMLAnchorElement>('a[href^="#s-"]'));
    const onAnchorClick = (a: HTMLAnchorElement) => (e: Event) => {
      e.preventDefault();
      const el = document.querySelector(a.getAttribute("href")!);
      if (!el) return;
      ScrollTrigger.refresh();
      const y = el.getBoundingClientRect().top + window.scrollY;
      if (lenis) lenis.scrollTo(y, { duration: 1.1 });
      else window.scrollTo(0, y);
    };
    const handlers = anchors.map((a) => {
      const h = onAnchorClick(a);
      a.addEventListener("click", h);
      return { a, h };
    });

    const secs = Array.from(document.querySelectorAll<HTMLElement>("[data-sec]"));
    const triggers: ScrollTrigger[] = [];
    secs.forEach((sec) => {
      const id = sec.getAttribute("data-sec")!;
      const bg = sec.getAttribute("data-bg")!;
      const fg = sec.getAttribute("data-fg")!;
      const on = () => {
        if (canvasRef.current) gsap.to(canvasRef.current, { backgroundColor: bg, duration: 0.7, ease: "power2.out", overwrite: true });
        if (barRef.current) gsap.to(barRef.current, { color: fg, duration: 0.7, ease: "power2.out", overwrite: true });
        setActive((prev) => (prev !== id ? id : prev));
      };
      triggers.push(
        ScrollTrigger.create({ trigger: sec, start: "top 50%", end: "bottom 50%", invalidateOnRefresh: true, onEnter: on, onEnterBack: on }),
      );
    });

    const input = document.querySelector<HTMLInputElement>("[data-palette-input]");
    const skillsSec = document.querySelector<HTMLElement>("[data-sec='04']");
    if (input && skillsSec) {
      triggers.push(
        ScrollTrigger.create({
          trigger: skillsSec,
          start: "top 40%",
          once: true,
          onEnter: () => input.focus({ preventScroll: true }),
        }),
      );
    }

    let snapping = false;
    let snapIdle: ReturnType<typeof setTimeout> | undefined;
    let snapRelease: ReturnType<typeof setTimeout> | undefined;
    let onSnapScroll: (() => void) | null = null;
    let snapArmTimer: ReturnType<typeof setTimeout> | undefined;

    // Snap listeners are attached only after the initial ScrollTrigger.refresh()
    // calibration passes have settled — refresh() briefly nudges native scroll to
    // measure bounds, and an early-attached listener mistakes that for a real scroll.
    if (!reduced && lenis) {
      const activeLenis = lenis;
      snapArmTimer = setTimeout(() => {
        const tops = () => secs.map((sec) => sec.getBoundingClientRect().top + window.scrollY);
        const settle = () => {
          if (snapping) return;
          const y = window.scrollY;
          const vh = window.innerHeight;
          const max = document.documentElement.scrollHeight - vh;
          if (y <= 2 || y >= max - 2) return;
          const all = tops();
          let best = -1;
          let bestD = Infinity;
          all.forEach((t, i) => {
            const d = Math.abs(t - y);
            if (d < bestD) {
              bestD = d;
              best = i;
            }
          });
          if (best < 0 || bestD < 6) return;
          if (bestD > vh * 0.9) return;
          const target = Math.min(all[best], max);
          snapping = true;
          const release = () => {
            snapping = false;
          };
          activeLenis.scrollTo(target, { duration: 0.8, easing: (t: number) => 1 - Math.pow(1 - t, 3), force: true, onComplete: release });
          clearTimeout(snapRelease);
          snapRelease = setTimeout(release, 950);
        };
        onSnapScroll = () => {
          if (snapping) return;
          clearTimeout(snapIdle);
          snapIdle = setTimeout(settle, 160);
        };
        activeLenis.on("scroll", onSnapScroll);
      }, 1500);
    }

    if (!reduced) {
      const groups = new Map<Element, HTMLElement[]>();
      document.querySelectorAll<HTMLElement>("[data-fit] > *").forEach((el) => {
        const sec = el.closest("section");
        if (!sec || el.hasAttribute("data-noreveal")) return;
        if (!groups.has(sec)) groups.set(sec, []);
        groups.get(sec)!.push(el);
      });
      groups.forEach((els, sec) => {
        const inView = sec.getBoundingClientRect().top < window.innerHeight * 0.78;
        if (!inView) gsap.set(els, { y: 26, opacity: 0 });
        let shown = false;
        const show = () => {
          shown = true;
          gsap.to(els, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger: 0.06, overwrite: "auto" });
        };
        triggers.push(
          ScrollTrigger.create({
            trigger: sec,
            start: "top 78%",
            once: true,
            onEnter: show,
            onRefresh: (self) => {
              if (shown || self.progress > 0) gsap.set(els, { y: 0, opacity: 1 });
            },
          }),
        );
        if (inView) show();
      });
    }

    const gridCols = () => {
      const g = document.querySelector<HTMLElement>("[data-workgrid]");
      if (!g) return;
      const w = g.clientWidth;
      const cols = w < 560 ? 1 : w < 900 ? 2 : 3;
      g.style.gridTemplateColumns = `repeat(${cols},minmax(0,1fr))`;
    };

    const fit = () => {
      gridCols();
      document.querySelectorAll<HTMLElement>("[data-fit]").forEach((inner) => {
        const sec = inner.closest("section");
        if (!sec) return;
        inner.style.zoom = "1";
        const cs = getComputedStyle(sec);
        const avail = window.innerHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
        const need = inner.scrollHeight;
        inner.style.zoom = need > avail && avail > 0 ? String(Math.max(0.9, avail / need)) : "1";
      });
    };

    const refresh = () => {
      fit();
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", refresh);
    fit();
    requestAnimationFrame(refresh);
    const t1 = setTimeout(refresh, 400);
    const t2 = setTimeout(refresh, 1200);
    window.addEventListener("load", refresh);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);

    return () => {
      handlers.forEach(({ a, h }) => a.removeEventListener("click", h));
      triggers.forEach((t) => t.kill());
      ScrollTrigger.getAll().forEach((t) => t.kill());
      if (onSnapScroll && lenis) lenis.off("scroll", onSnapScroll);
      clearTimeout(snapArmTimer);
      clearTimeout(snapIdle);
      clearTimeout(snapRelease);
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("resize", refresh);
      window.removeEventListener("load", refresh);
      if (tickerFn) gsap.ticker.remove(tickerFn);
      if (lenis) lenis.destroy();
    };
  }, []);

  return (
    <div style={{ fontFamily: "var(--font-sans), Helvetica, Arial, sans-serif", lineHeight: 1.5 }}>
      <div ref={canvasRef} data-canvas="" style={{ position: "fixed", inset: 0, background: "#0F1214", zIndex: 0 }} />
      <ContactBadge />
      <SideIndex active={active} barRef={barRef} />
      <main style={{ position: "relative", zIndex: 1 }}>{children}</main>
    </div>
  );
}
