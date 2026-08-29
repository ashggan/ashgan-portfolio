"use client";

import { useState } from "react";
import { certs } from "@/data/certs";
import { hexA } from "@/lib/utils";

function CertCard({ cd, flipped, onFlip }: { cd: (typeof certs)[number]; flipped: boolean; onFlip: () => void }) {
  const [focused, setFocused] = useState(false);
  return (
    <div
      onClick={onFlip}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onFlip();
        }
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      tabIndex={0}
      role="button"
      aria-label={`${cd.title}, ${cd.issuer}. Flips to reveal a verification link.`}
      aria-pressed={flipped}
      style={{
        height: 196,
        perspective: 900,
        cursor: "pointer",
        outlineOffset: 3,
        outline: focused ? `2px solid ${cd.color}` : "none",
      }}
    >
      <div
        data-faces={flipped ? "1" : "0"}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          transition: "transform .55s cubic-bezier(.4,0,.2,1)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            border: "1px solid rgba(22,24,27,0.22)",
            borderRadius: 10,
            padding: 5,
            background: "#FFFDF9",
          }}
        >
          <div
            style={{
              height: "100%",
              border: `1px solid ${hexA(cd.color, 0.4)}`,
              borderRadius: 7,
              padding: "14px 12px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 9,
              textAlign: "center",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                border: `1.5px solid ${cd.color}`,
                color: cd.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 15,
              }}
            >
              ✦
            </span>
            <span style={{ fontSize: 13.5, fontWeight: 600, lineHeight: 1.3, letterSpacing: "-0.01em" }}>{cd.title}</span>
            <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 10, color: "#5C5F63" }}>{cd.issuer}</span>
            <span
              style={{
                marginTop: "auto",
                fontFamily: "var(--font-mono), monospace",
                fontSize: 9.5,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: cd.color,
              }}
            >
              ⟳ tap to verify
            </span>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            border: "1px solid rgba(22,24,27,0.22)",
            borderRadius: 10,
            padding: 5,
            background: "#FFFDF9",
          }}
        >
          <div
            style={{
              height: "100%",
              border: `1px solid ${hexA(cd.color, 0.4)}`,
              borderRadius: 7,
              padding: "14px 12px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              textAlign: "center",
            }}
          >
            <span style={{ fontSize: 13.5, fontWeight: 600, color: "#2E7D52" }}>✓ Verified</span>
            <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 10, color: "#5C5F63" }}>{cd.issuer}</span>
            <a
              href={cd.href}
              target="_blank"
              rel="noopener"
              onClick={(e) => e.stopPropagation()}
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: 10,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                background: cd.color,
                color: "#FFFDF9",
                padding: "9px 16px",
                borderRadius: 5,
              }}
            >
              Verify →
            </a>
            <span style={{ marginTop: "auto", fontFamily: "var(--font-mono), monospace", fontSize: 9.5, letterSpacing: "0.08em", textTransform: "uppercase", color: "#9AA0A5" }}>
              tap to flip back
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Education() {
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});

  return (
    <section
      id="s-06"
      data-sec="06"
      data-bg="#E3E9E4"
      data-fg="#16181B"
      data-bar-bg="rgba(227,233,228,0.9)"
      style={{
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        color: "#16181B",
        padding: "clamp(56px,8vh,96px) clamp(18px,4vw,44px) clamp(56px,8vh,96px) clamp(100px,13vw,180px)",
      }}
    >
      <div data-fit="" style={{ maxWidth: 1240, margin: "0 auto", width: "100%" }}>
        <span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)", whiteSpace: "nowrap" }}>
          Education and certifications: a BSc in Mathematics and Computer Science from the University of Khartoum,
          plus three verifiable certificates from EquiJob, Udacity and edX — each badge flips to reveal its
          verification link.
        </span>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px 18px", alignItems: "baseline", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, letterSpacing: "0.14em", color: "#5C5F63" }}>06</span>
            <h2 style={{ margin: 0, fontSize: "clamp(20px,2.2vw,26px)", fontWeight: 600, letterSpacing: "-0.015em" }}>
              Education &amp; certifications
            </h2>
          </div>
          <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 10.5, letterSpacing: "0.12em", textTransform: "uppercase", color: "#5C5F63" }}>
            06 · Verified
          </span>
        </div>

        <div style={{ marginTop: "clamp(14px,2vw,22px)", border: "1px solid rgba(22,24,27,0.22)", borderRadius: 10, padding: 6, background: "#FFFDF9" }}>
          <div style={{ border: "1px solid rgba(22,24,27,0.14)", borderRadius: 7, padding: "clamp(14px,2vw,22px) clamp(15px,2.2vw,26px)", display: "flex", flexWrap: "wrap", gap: "clamp(14px,2.4vw,28px)", alignItems: "center" }}>
            <span
              aria-hidden="true"
              style={{ width: 46, height: 46, borderRadius: "50%", border: "1.5px solid #7F77DD", color: "#7F77DD", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 19, flex: "0 0 auto" }}
            >
              ◎
            </span>
            <div style={{ flex: "1 1 280px", minWidth: 0 }}>
              <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11.5, letterSpacing: "0.08em", color: "#7F77DD" }}>2010 — 2015</div>
              <div style={{ fontSize: "clamp(16px,1.7vw,21px)", fontWeight: 600, letterSpacing: "-0.012em", marginTop: 5 }}>
                BSc Mathematics and Computer Science
              </div>
              <div style={{ fontSize: 13.5, color: "#43464A", marginTop: 3 }}>Faculty of Mathematical Sciences, University of Khartoum — Sudan</div>
            </div>
            <span
              data-ribbon=""
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: 9.5,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#7F77DD",
                border: "1px solid rgba(127,119,221,0.45)",
                background: "rgba(127,119,221,0.1)",
                padding: "6px 12px",
                borderRadius: 99,
                flex: "0 0 auto",
              }}
            >
              Foundation
            </span>
          </div>
        </div>

        <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#5C5F63", marginTop: "clamp(14px,2vw,20px)" }}>
          Verified certifications · tap a badge to verify
        </div>

        <div data-noreveal="" style={{ marginTop: 9, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))", gap: 10 }}>
          {certs.map((cd, i) => (
            <CertCard
              key={cd.title}
              cd={cd}
              flipped={!!flipped[i]}
              onFlip={() => setFlipped((s) => ({ ...s, [i]: !s[i] }))}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
