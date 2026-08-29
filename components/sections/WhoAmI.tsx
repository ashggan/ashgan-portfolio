"use client";

import { useState } from "react";
import FlightArc from "@/components/canvas/FlightArc";

function Mark({ color, delay, children }: { color: string; delay: string; children: React.ReactNode }) {
  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <span
        data-mark=""
        style={{
          position: "absolute",
          left: -2,
          right: -2,
          bottom: 1,
          height: 9,
          background: color,
          transformOrigin: "left center",
          animationDelay: delay,
          zIndex: 0,
        }}
      />
      <span style={{ position: "relative", zIndex: 1 }}>{children}</span>
    </span>
  );
}

export default function WhoAmI() {
  const [replaySignal, setReplaySignal] = useState(0);

  return (
    <section
      id="s-07"
      data-sec="07"
      data-bg="#F1EDE4"
      data-fg="#16181B"
      data-bar-bg="rgba(241,237,228,0.9)"
      style={{
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        color: "#16181B",
        padding: "clamp(56px,8vh,96px) clamp(18px,4vw,44px) clamp(56px,8vh,96px) clamp(100px,13vw,180px)",
      }}
    >
      <div data-fit="" style={{ maxWidth: 1240, margin: "0 auto", width: "100%" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px 18px", alignItems: "baseline", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, letterSpacing: "0.14em", color: "#5C5F63" }}>07</span>
            <h2
              style={{
                margin: 0,
                fontFamily: "var(--font-mono), monospace",
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#5C5F63",
              }}
            >
              Who am I?
            </h2>
          </div>
          <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 10.5, letterSpacing: "0.12em", textTransform: "uppercase", color: "#5C5F63" }}>
            07 · Off the clock
          </span>
        </div>

        <p
          style={{
            margin: "clamp(14px,2vw,22px) 0 0",
            fontFamily: "var(--font-serif), Georgia, serif",
            fontWeight: 300,
            fontSize: "clamp(25px,3.6vw,48px)",
            lineHeight: 1.14,
            letterSpacing: "-0.02em",
            maxWidth: "34ch",
          }}
        >
          I&rsquo;m Ashgan — from Omdurman, and these days learning Kigali on my own.
        </p>

        <div
          data-storygrid=""
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,3fr) minmax(0,2fr)",
            gap: "clamp(22px,3.5vw,52px)",
            marginTop: "clamp(18px,2.6vw,32px)",
            alignItems: "start",
          }}
        >
          <div style={{ minWidth: 0 }}>
            <p style={{ margin: "0 0 14px", fontSize: "clamp(15px,1.35vw,17px)", lineHeight: 1.75, color: "#33363A", maxWidth: "62ch" }}>
              I grew up in <Mark color="rgba(216,90,48,0.28)" delay=".15s">Omdurman, Sudan</Mark>, and spent my whole
              life there — until about a year and a half ago, when I packed up and moved to{" "}
              <Mark color="rgba(29,158,117,0.28)" delay=".35s">Kigali</Mark>. I live{" "}
              <Mark color="rgba(55,138,221,0.26)" delay=".55s">on my own</Mark> here now, and to my own surprise,
              I&rsquo;ve come to love it.
            </p>
            <p style={{ margin: "0 0 14px", fontSize: "clamp(15px,1.35vw,17px)", lineHeight: 1.75, color: "#33363A", maxWidth: "62ch" }}>
              I&rsquo;m not much of an outdoors person. Most of the time you&rsquo;ll find me at home — deep in a
              film or a book, or{" "}
              <Mark color="rgba(186,117,23,0.26)" delay=".75s">hosting friends for dinner and games</Mark>. When I do
              head out, I take trips around the country, go for walks and runs, and recently picked up tennis, which
              the jury is still out on.
            </p>
            <p style={{ margin: 0, fontSize: "clamp(15px,1.35vw,17px)", lineHeight: 1.75, color: "#33363A", maxWidth: "62ch" }}>
              My taste runs to <Mark color="rgba(212,83,126,0.26)" delay=".95s">horror and comedy</Mark> — two genres
              that shouldn&rsquo;t belong together, and are somehow exactly my two moods.
            </p>

            <div
              onClick={() => setReplaySignal((n) => n + 1)}
              data-noreveal=""
              style={{ marginTop: "clamp(16px,2.2vw,26px)", position: "relative", height: 190, overflow: "hidden", cursor: "pointer" }}
            >
              <span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)", whiteSpace: "nowrap" }}>
                An animated flight path from Omdurman to Kigali.
              </span>
              <FlightArc replaySignal={replaySignal} />

              <div style={{ position: "absolute", bottom: 13, left: 15, pointerEvents: "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, color: "#16181B", fontSize: 14.5, fontWeight: 600 }}>
                  <span
                    aria-hidden="true"
                    style={{ display: "inline-block", width: 0, height: 0, borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderBottom: "7px solid #D85A30" }}
                  />
                  Omdurman
                </div>
                <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: 9.5, letterSpacing: "0.09em", textTransform: "uppercase", color: "#5C5F63", marginTop: 4 }}>
                  where I&rsquo;m from
                </div>
              </div>

              <div style={{ position: "absolute", bottom: 13, right: 15, textAlign: "right", pointerEvents: "none" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 7, color: "#16181B", fontSize: 14.5, fontWeight: 600 }}>
                  <span aria-hidden="true" style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50% 50% 50% 0", background: "#1D9E75", transform: "rotate(-45deg)" }} />
                  Kigali
                </div>
                <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: 9.5, letterSpacing: "0.09em", textTransform: "uppercase", color: "#5C5F63", marginTop: 4 }}>
                  now · UTC+2
                </div>
              </div>
            </div>
          </div>

          <aside style={{ minWidth: 0, background: "rgba(22,24,27,0.045)", borderRadius: 10, padding: "clamp(18px,2.4vw,28px)" }}>
            <span aria-hidden="true" style={{ fontFamily: "var(--font-serif), Georgia, serif", fontSize: 34, lineHeight: 0.6, color: "#B4552F", display: "block", marginBottom: 12 }}>
              &ldquo;
            </span>
            <p style={{ margin: 0, fontFamily: "var(--font-serif), Georgia, serif", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(17px,1.8vw,23px)", lineHeight: 1.45, color: "#33363A" }}>
              Listen to the reed, how it tells its tale, lamenting the separations it has known — since I
            </p>
            <div style={{ marginTop: 14, fontFamily: "var(--font-mono), monospace", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#5C5F63" }}>
              Rumi · the Masnavi
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
