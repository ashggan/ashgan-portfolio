"use client";

import { useState } from "react";
import { outcomeFiles, tokenStyle } from "@/data/outcomes";
import { useHover } from "@/hooks/useHover";

function FileRow({ active, name, accent, onClick }: { active: boolean; name: string; accent: string; onClick: () => void }) {
  const [hover, handlers] = useHover();
  return (
    <div
      onClick={onClick}
      {...handlers}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 9,
        padding: "8px 14px 8px 11px",
        borderLeft: `3px solid ${active ? accent : "transparent"}`,
        background: active ? "rgba(232,230,225,0.09)" : hover ? "rgba(232,230,225,0.07)" : "transparent",
        color: active ? "#E8E6E1" : "rgba(232,230,225,0.6)",
        fontSize: 12.5,
        cursor: "pointer",
        transition: "background .2s ease, color .2s ease",
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: accent, flex: "0 0 auto" }} />
      <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{name}</span>
    </div>
  );
}

export default function Achievements() {
  const [active, setActive] = useState(0);
  const cur = outcomeFiles[active];

  return (
    <section
      id="s-05"
      data-sec="05"
      data-bg="#EFEBE3"
      data-fg="#16181B"
      data-bar-bg="rgba(239,235,227,0.9)"
      style={{
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        color: "#16181B",
        padding: "clamp(56px,8vh,96px) clamp(18px,4vw,44px) clamp(56px,8vh,96px) clamp(100px,13vw,180px)",
      }}
    >
      <div data-fit="" style={{ maxWidth: 1240, margin: "0 auto", width: "100%" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "space-between", alignItems: "baseline", marginBottom: "clamp(16px,2.2vw,26px)" }}>
          <h2 style={{ margin: 0, fontSize: "clamp(20px,2.2vw,26px)", fontWeight: 600, letterSpacing: "-0.015em" }}>Achievements</h2>
          <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 10.5, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.55 }}>
            05 · My résumé as a repo — pick a file
          </span>
        </div>

        <div style={{ border: "1px solid rgba(22,24,27,0.22)", borderRadius: 12, overflow: "hidden", background: "#14171A", color: "#E8E6E1", fontFamily: "var(--font-mono), monospace" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "9px 14px", background: "#1B1F23", borderBottom: "1px solid rgba(232,230,225,0.12)" }}>
            <div style={{ display: "flex", gap: 7 }}>
              <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#E05C4B" }} />
              <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#E0A64B" }} />
              <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#4BC08A" }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#14171A", border: "1px solid rgba(232,230,225,0.14)", borderBottomColor: "transparent", padding: "6px 12px", borderRadius: "5px 5px 0 0", fontSize: 11.5, letterSpacing: "0.04em" }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: cur.accent }} />
              <span>{cur.name}</span>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "minmax(180px,225px) 1fr" }}>
            <div style={{ borderRight: "1px solid rgba(232,230,225,0.12)", background: "#171B1F", padding: "12px 0" }}>
              <div style={{ padding: "0 14px 10px", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(232,230,225,0.4)" }}>
                ~/outcomes
              </div>
              {outcomeFiles.map((fl, i) => (
                <FileRow key={fl.name} active={i === active} name={fl.name} accent={fl.accent} onClick={() => setActive(i)} />
              ))}
              <div style={{ padding: "12px 14px 0", fontSize: 10.5, color: "rgba(232,230,225,0.3)", lineHeight: 1.6 }}>
                {outcomeFiles.length} files · read-only
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
              <div style={{ flex: "1 1 auto", height: "clamp(180px,26vh,260px)", overflow: "auto", padding: "12px 0" }}>
                {cur.lines.map((toks, i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "44px 1fr", gap: 0, fontSize: 13, lineHeight: 1.7, whiteSpace: "nowrap" }}>
                    <span style={{ textAlign: "right", paddingRight: 14, color: "rgba(232,230,225,0.25)", userSelect: "none" }}>{i + 1}</span>
                    <span style={{ paddingRight: 16, overflow: "hidden", textOverflow: "ellipsis" }}>
                      {toks.length ? (
                        toks.map((tk, j) => (
                          <span key={j} style={{ whiteSpace: "pre", ...tokenStyle(tk.k) }}>
                            {tk.v}
                          </span>
                        ))
                      ) : (
                        <span style={{ whiteSpace: "pre" }}> </span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: "1px solid rgba(232,230,225,0.12)", background: "#101315", padding: "12px 16px", display: "flex", flexDirection: "column", gap: 7, fontSize: 12.5 }}>
                <div style={{ display: "flex", gap: 9, alignItems: "baseline", flexWrap: "wrap" }}>
                  <span style={{ color: "#4BC08A" }}>$</span>
                  <span style={{ color: "rgba(232,230,225,0.9)" }}>{cur.cmd}</span>
                </div>
                <div style={{ display: "flex", gap: 9, alignItems: "baseline", flexWrap: "wrap" }}>
                  <span style={{ color: cur.accent }}>→</span>
                  <span style={{ color: "rgba(232,230,225,0.62)" }}>{cur.out}</span>
                  <span data-caret="1" style={{ width: 7, height: 14, background: cur.accent, display: "inline-block", opacity: 0.85 }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
