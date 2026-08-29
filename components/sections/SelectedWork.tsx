"use client";

import { useState } from "react";
import { deployments } from "@/data/deployments";
import { useHover } from "@/hooks/useHover";

const chipLabels = ["All", "Live", "AI", "Frontend", "Security"];

function VisitLink({ href, accent }: { href: string; accent: string }) {
  const [hover, handlers] = useHover();
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      {...handlers}
      style={{
        fontFamily: "var(--font-mono), monospace",
        fontSize: 10.5,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        padding: "9px 14px",
        border: `1px solid ${hover ? accent : "rgba(22,24,27,0.25)"}`,
        borderRadius: 6,
        color: hover ? "#FFFDF9" : "#16181B",
        background: hover ? accent : "transparent",
        whiteSpace: "nowrap",
        transition: "background .2s ease, border-color .2s ease, color .2s ease",
      }}
    >
      Visit →
    </a>
  );
}

function ProjectCard({ pj, dim }: { pj: (typeof deployments)[number]; dim: boolean }) {
  const [hover, handlers] = useHover();
  return (
    <div
      {...handlers}
      style={{
        border: `1px solid ${hover ? pj.accent : "rgba(22,24,27,0.16)"}`,
        borderRadius: 12,
        background: "#FFFDF9",
        padding: "clamp(12px,1.6vw,18px) clamp(13px,1.8vw,20px)",
        display: "flex",
        flexWrap: "wrap",
        gap: "clamp(10px,1.6vw,18px)",
        alignItems: "flex-start",
        filter: dim ? "grayscale(1) opacity(0.34)" : "none",
        transform: hover ? "translateY(-2px)" : "none",
        transition: "filter .35s ease, transform .25s ease, border-color .25s ease",
      }}
    >
      <div aria-hidden="true" style={{ position: "relative", width: 10, height: 10, flex: "0 0 auto", marginTop: 6 }}>
        <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: pj.live ? pj.accent : "#9AA0A5" }} />
        {pj.live && (
          <span
            data-pulse="1"
            style={{ position: "absolute", inset: -5, borderRadius: "50%", border: `1px solid ${pj.accent}`, opacity: 0 }}
          />
        )}
      </div>

      <div style={{ flex: "1 1 300px", minWidth: 0 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 12px", alignItems: "baseline", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 9, alignItems: "baseline" }}>
            <h3 style={{ margin: 0, fontSize: "clamp(15.5px,1.5vw,19px)", fontWeight: 600, letterSpacing: "-0.012em" }}>{pj.title}</h3>
            <span
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: 9.5,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "3px 7px",
                borderRadius: 99,
                color: pj.live ? "#1B5E45" : "#5C5F63",
                background: pj.live ? "rgba(62,155,107,0.16)" : "rgba(22,24,27,0.08)",
              }}
            >
              {pj.live ? "Live" : "Internal"}
            </span>
          </div>
          <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11.5, color: "#5C5F63" }}>{pj.year}</span>
        </div>
        <div
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: 12,
            marginTop: 5,
            color: pj.live ? pj.accent : "#9AA0A5",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {pj.urlLabel}
        </div>
        <p style={{ margin: "7px 0 0", fontSize: 13.5, color: "#43464A", maxWidth: "74ch" }}>{pj.desc}</p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
            marginTop: 9,
            fontFamily: "var(--font-mono), monospace",
            fontSize: 9.5,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#5C5F63",
          }}
        >
          {pj.tags.map((tg) => (
            <span key={tg} style={{ border: "1px solid rgba(22,24,27,0.2)", padding: "4px 8px", borderRadius: 99 }}>
              {tg}
            </span>
          ))}
        </div>
      </div>

      <div style={{ flex: "0 0 auto", minWidth: 118, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10 }}>
        <div aria-hidden="true" style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 20 }}>
          {[7, 14, 10, 17, 9].map((hgt, i) => (
            <span
              key={i}
              data-eq={pj.live ? "1" : "0"}
              style={{ width: 3, height: hgt, background: pj.live ? pj.accent : "#9AA0A5", animationDelay: `${i * 0.14}s` }}
            />
          ))}
        </div>
        {pj.live ? (
          <VisitLink href={pj.href} accent={pj.accent} />
        ) : (
          <span
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: 10.5,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#9AA0A5",
              whiteSpace: "nowrap",
            }}
          >
            Not public
          </span>
        )}
      </div>
    </div>
  );
}

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: "var(--font-mono), monospace",
        fontSize: 10.5,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        padding: "7px 13px",
        borderRadius: 99,
        cursor: "pointer",
        background: active ? "#16181B" : "transparent",
        color: active ? "#F6F4EF" : "#16181B",
        border: `1px solid ${active ? "#16181B" : "rgba(22,24,27,0.25)"}`,
        transition: "background .2s ease, color .2s ease, border-color .2s ease",
      }}
    >
      {label}
    </button>
  );
}

export default function SelectedWork() {
  const [filter, setFilter] = useState("All");

  return (
    <section
      id="s-03"
      data-sec="03"
      data-bg="#F6F4EF"
      data-fg="#16181B"
      data-bar-bg="rgba(246,244,239,0.9)"
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
          Selected work: six deployments from 2020 to now, five publicly live and one internal, each listed with its
          status, technologies and link.
        </span>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px 18px", alignItems: "baseline", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, letterSpacing: "0.14em", color: "#5C5F63" }}>03</span>
            <h2 style={{ margin: 0, fontSize: "clamp(20px,2.2vw,26px)", fontWeight: 600, letterSpacing: "-0.015em" }}>Selected work</h2>
          </div>
          <span
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: 10.5,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#5C5F63",
            }}
          >
            03 · Live links
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8, fontSize: 13, color: "#5C5F63" }}>
          <span>6 deployments ·</span>
          <span aria-hidden="true" style={{ width: 7, height: 7, borderRadius: "50%", background: "#3E9B6B", display: "inline-block" }} />
          <span>5 live ·</span>
          <span aria-hidden="true" style={{ width: 7, height: 7, borderRadius: "50%", border: "1px solid #9AA0A5", display: "inline-block" }} />
          <span>1 internal ·</span>
          <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 12 }}>2020 — now</span>
        </div>

        <div data-noreveal="" style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: "clamp(14px,2vw,20px)" }}>
          {chipLabels.map((label) => (
            <FilterChip key={label} label={label} active={filter === label} onClick={() => setFilter(label)} />
          ))}
        </div>

        <div data-noreveal="" style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: "clamp(14px,2vw,20px)" }}>
          {deployments.map((pj) => {
            const match = filter === "All" || pj.filters.indexOf(filter.toLowerCase()) > -1;
            return <ProjectCard key={pj.title} pj={pj} dim={!match} />;
          })}
        </div>
      </div>
    </section>
  );
}
