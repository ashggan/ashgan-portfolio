"use client";

import { RefObject } from "react";
import { navItems } from "@/data/nav";
import { useKigaliClock } from "@/hooks/useKigaliClock";

export default function SideIndex({ active, barRef }: { active: string; barRef: RefObject<HTMLDivElement | null> }) {
  const clock = useKigaliClock();

  return (
    <div
      ref={barRef}
      data-bar=""
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 130,
        width: "clamp(84px,11vw,150px)",
        color: "#F1EFEA",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "clamp(14px,2.2vw,26px) 0 clamp(14px,2.2vw,26px) clamp(16px,2.6vw,30px)",
        pointerEvents: "none",
      }}
    >
      <a
        href="#s-01"
        style={{ pointerEvents: "auto", display: "flex", flexDirection: "column", gap: 3, color: "inherit", textDecoration: "none" }}
      >
        <span style={{ fontWeight: 700, fontSize: 13, letterSpacing: "-0.01em", lineHeight: 1.2 }}>
          Ashgan
          <br />
          Mustafa
        </span>
        <span
          data-barsub=""
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: 9,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            opacity: 0.5,
            lineHeight: 1.4,
          }}
        >
          Senior
          <br />
          full-stack
        </span>
      </a>

      <nav
        aria-label="Section index"
        style={{
          pointerEvents: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(4px,0.9vh,10px)",
          fontFamily: "var(--font-mono), monospace",
          fontSize: 10,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        {navItems.map((n) => {
          const current = n.id === active;
          return (
            <a
              key={n.id}
              href={n.href}
              aria-current={current ? "true" : undefined}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                color: "inherit",
                textDecoration: "none",
                opacity: current ? 1 : 0.42,
                transition: "opacity .3s ease",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: current ? 16 : 6,
                  height: 1,
                  background: "currentColor",
                  flex: "0 0 auto",
                  transition: "width .35s cubic-bezier(.22,1,.36,1)",
                }}
              />
              <span>{n.id}</span>
              <span
                data-navlabel=""
                style={{ opacity: 0.6, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
              >
                {n.label}
              </span>
            </a>
          );
        })}
      </nav>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 5,
          fontFamily: "var(--font-mono), monospace",
          fontSize: 9.5,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        <span style={{ opacity: 0.95 }}>{active} / 08</span>
        <span data-barsub="" style={{ opacity: 0.45, lineHeight: 1.5 }}>
          Kigali
          <br />
          {clock} UTC+2
        </span>
      </div>
    </div>
  );
}
