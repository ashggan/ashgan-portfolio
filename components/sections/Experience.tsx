"use client";

import { useEffect, useState } from "react";
import { roles } from "@/data/roles";
import { axisYears, pctOf, AXIS_END } from "@/lib/timeline";
import { useHover } from "@/hooks/useHover";

function StepButton({ onClick, label, children }: { onClick: () => void; label: string; children: React.ReactNode }) {
  const [hover, handlers] = useHover();
  return (
    <button
      onClick={onClick}
      aria-label={label}
      {...handlers}
      style={{
        width: 34,
        height: 34,
        border: `1px solid ${hover ? "#F6F4EF" : "rgba(246,244,239,0.3)"}`,
        background: "transparent",
        color: "#F6F4EF",
        borderRadius: 5,
        cursor: "pointer",
        fontSize: 14,
        lineHeight: 1,
      }}
    >
      {children}
    </button>
  );
}

const DEFAULT_ROLE_INDEX = Math.max(
  0,
  roles.findIndex((r) => r.org === "Spring ACT"),
);

export default function Experience() {
  const [selected, setSelected] = useState(DEFAULT_ROLE_INDEX);
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only clock, unknown at SSR time
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 60000);
    return () => clearInterval(id);
  }, []);

  const nowMs = now ?? AXIS_END;
  const years = axisYears();
  const nowLeft = pctOf(nowMs) + "%";

  const lanes = roles.map((r, i) => {
    const s = new Date(r.start[0], r.start[1], r.start[2] || 1).getTime();
    const e = r.current ? nowMs : new Date(r.end![0], r.end![1] + 1, 0).getTime();
    const left = parseFloat(pctOf(s));
    const right = parseFloat(pctOf(e));
    const on = i === selected;
    return {
      role: r,
      left,
      right,
      on,
      leftPct: left + "%",
      widthPct: Math.max(0.8, right - left) + "%",
      endLeftPct: right + "%",
    };
  });

  const role = roles[Math.min(selected, roles.length - 1)];
  const meta = role.personal ? role.place : `${role.org} · ${role.place}`;

  const step = (d: number) => setSelected((s) => (s + d + roles.length) % roles.length);

  return (
    <section
      id="s-02"
      data-sec="02"
      data-bg="#0E3B36"
      data-fg="#F6F4EF"
      data-bar-bg="rgba(14,59,54,0.9)"
      style={{
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        color: "#F6F4EF",
        padding: "clamp(56px,8vh,96px) clamp(18px,4vw,44px) clamp(56px,8vh,96px) clamp(100px,13vw,180px)",
      }}
    >
      <div data-fit="" style={{ maxWidth: 1240, margin: "0 auto", width: "100%" }}>
        <span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)", whiteSpace: "nowrap" }}>
          Experience timeline: eight roles from 2019 to the present, shown as bars scaled to their real dates, with
          the two current Spring ACT roles running in parallel.
        </span>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px 18px", alignItems: "baseline", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, letterSpacing: "0.14em", color: "rgba(246,244,239,0.6)" }}>
              02
            </span>
            <h2 style={{ margin: 0, fontSize: "clamp(20px,2.2vw,26px)", fontWeight: 600, letterSpacing: "-0.015em" }}>Experience</h2>
          </div>
          <span
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: 10.5,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(246,244,239,0.55)",
            }}
          >
            02 · Career timeline
          </span>
        </div>
        <p style={{ margin: "7px 0 0", fontSize: 13.5, color: "rgba(246,244,239,0.7)", maxWidth: "70ch" }}>
          2019 — present. Tap any bar to expand — including the chapter that isn&rsquo;t a job.
        </p>

        <div
          data-noreveal=""
          style={{
            marginTop: "clamp(14px,2vw,22px)",
            display: "grid",
            gridTemplateColumns: "minmax(96px,158px) 1fr",
            gap: "clamp(8px,1.4vw,16px)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {lanes.map((ln, i) => (
              <div
                key={ln.role.org + i}
                onClick={() => setSelected(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelected(i);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-pressed={ln.on}
                style={{
                  height: 34,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  cursor: "pointer",
                  paddingRight: 8,
                  opacity: ln.on ? 1 : 0.55,
                  transition: "opacity .25s ease",
                }}
              >
                <span
                  style={{
                    fontSize: 12.5,
                    fontWeight: 600,
                    letterSpacing: "-0.01em",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {ln.role.personal && (
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      width="0.72em"
                      height="0.72em"
                      style={{ verticalAlign: "baseline", marginRight: "0.24em" }}
                    >
                      <path
                        d="M12 2c3 4.2 6.5 6.4 6.5 11a6.5 6.5 0 0 1-13 0c0-2.6 1.4-4.2 3-6 .3 1.6 1.1 2.6 2.2 3 .6-3.2-.4-5.6 1.3-8z"
                        fill="#D85A30"
                      />
                    </svg>
                  )}
                  {ln.role.org}
                </span>
                <span
                  data-tag=""
                  style={{
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: 9.5,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    fontStyle: ln.role.personal ? "italic" : "normal",
                    color: ln.role.personal ? ln.role.accent : "rgba(246,244,239,0.5)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {ln.role.tag}
                </span>
              </div>
            ))}
            <div style={{ height: 22 }} />
          </div>

          <div style={{ position: "relative" }}>
            <div aria-hidden="true" style={{ position: "absolute", inset: "0 0 22px 0", pointerEvents: "none" }}>
              {years.map((yr) => (
                <span
                  key={yr.label}
                  style={{ position: "absolute", top: 0, bottom: 0, left: yr.left, width: 1, background: "rgba(246,244,239,0.14)" }}
                />
              ))}
            </div>
            <div
              aria-hidden="true"
              style={{ position: "absolute", top: 0, bottom: 22, left: nowLeft, width: 0, borderLeft: "1px dashed #4BC08A" }}
            />
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                top: -2,
                left: nowLeft,
                transform: "translateX(-50%)",
                fontFamily: "var(--font-mono), monospace",
                fontSize: 9,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#4BC08A",
                background: "#0E3B36",
                padding: "0 5px",
              }}
            >
              now
            </span>

            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {lanes.map((ln, i) => (
                <div key={ln.role.org + i} style={{ position: "relative", height: 34 }}>
                  <div
                    onClick={() => setSelected(i)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelected(i);
                      }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label={ln.role.personal ? `${ln.role.title}, ${ln.role.period}` : `${ln.role.org}, ${ln.role.title}, ${ln.role.period}`}
                    aria-pressed={ln.on}
                    style={{
                      position: "absolute",
                      top: 8,
                      height: 18,
                      left: ln.leftPct,
                      width: ln.widthPct,
                      minWidth: 10,
                      borderRadius: 4,
                      background: ln.role.personal ? "transparent" : ln.role.accent,
                      border: ln.role.personal ? `1.5px dashed ${ln.role.accent}` : "0",
                      boxSizing: "border-box",
                      opacity: ln.on ? 1 : 0.5,
                      cursor: "pointer",
                      transition: "opacity .25s ease, transform .2s ease",
                    }}
                  />
                  {ln.role.current && (
                    <span
                      aria-hidden="true"
                      data-pulse="1"
                      style={{
                        position: "absolute",
                        top: 12,
                        left: ln.endLeftPct,
                        width: 10,
                        height: 10,
                        marginLeft: -5,
                        borderRadius: "50%",
                        background: "#4BC08A",
                      }}
                    />
                  )}
                </div>
              ))}
              <div aria-hidden="true" style={{ position: "relative", height: 22 }}>
                {years.map((yr) => (
                  <span
                    key={yr.label}
                    style={{
                      position: "absolute",
                      top: 5,
                      left: yr.left,
                      transform: "translateX(-50%)",
                      fontFamily: "var(--font-mono), monospace",
                      fontSize: 10,
                      color: "rgba(246,244,239,0.45)",
                    }}
                  >
                    {yr.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          data-noreveal=""
          style={{
            marginTop: "clamp(14px,2vw,22px)",
            borderLeft: `3px solid ${role.accent}`,
            background: "rgba(246,244,239,0.05)",
            padding: "clamp(14px,1.8vw,22px) clamp(15px,2vw,24px)",
          }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 18px", alignItems: "baseline", justifyContent: "space-between" }}>
            <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11.5, letterSpacing: "0.06em", color: role.accent }}>
              {role.period}
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: 10.5,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(246,244,239,0.55)",
              }}
            >
              {meta}
            </span>
          </div>
          <h3
            style={{
              margin: "9px 0 3px",
              fontFamily: "var(--font-serif), Georgia, serif",
              fontWeight: 400,
              fontSize: "clamp(21px,2.4vw,31px)",
              lineHeight: 1.1,
              letterSpacing: "-0.015em",
            }}
          >
            {role.personal && (
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                width="0.72em"
                height="0.72em"
                style={{ verticalAlign: "baseline", marginRight: "0.24em" }}
              >
                <path
                  d="M12 2c3 4.2 6.5 6.4 6.5 11a6.5 6.5 0 0 1-13 0c0-2.6 1.4-4.2 3-6 .3 1.6 1.1 2.6 2.2 3 .6-3.2-.4-5.6 1.3-8z"
                  fill="#D85A30"
                />
              </svg>
            )}
            {role.title}
          </h3>
          <div style={{ fontSize: 13, color: "rgba(246,244,239,0.65)" }}>{role.context}</div>

          {!role.personal && (
            <div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 11, fontFamily: "var(--font-mono), monospace", fontSize: 9.5, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                {role.stack.map((st) => (
                  <span key={st} style={{ border: "1px solid rgba(246,244,239,0.28)", color: role.accent, padding: "4px 8px", borderRadius: 99 }}>
                    {st}
                  </span>
                ))}
              </div>
              <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 7 }}>
                {role.points.map((pt, i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "14px 1fr", gap: 9, alignItems: "baseline" }}>
                    <span aria-hidden="true" style={{ width: 5, height: 5, borderRadius: "50%", background: role.accent, marginTop: 7 }} />
                    <span style={{ fontSize: 13.5, color: "rgba(246,244,239,0.85)" }}>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {role.personal && (
            <div>
              <span
                style={{
                  display: "inline-block",
                  marginTop: 11,
                  border: "1px solid rgba(216,90,48,0.6)",
                  color: "#E8845C",
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: 9.5,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "4px 10px",
                  borderRadius: 99,
                }}
              >
                {role.chip}
              </span>
              <p
                style={{
                  margin: "13px 0 0",
                  fontFamily: "var(--font-serif), Georgia, serif",
                  fontWeight: 300,
                  fontSize: 16,
                  lineHeight: 1.6,
                  color: "rgba(246,244,239,0.88)",
                  maxWidth: "76ch",
                }}
              >
                {role.prose}
              </p>
            </div>
          )}
        </div>

        <div data-noreveal="" style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 12 }}>
          <StepButton onClick={() => step(-1)} label="Previous role">
            ‹
          </StepButton>
          <StepButton onClick={() => step(1)} label="Next role">
            ›
          </StepButton>
          <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, letterSpacing: "0.1em", color: "rgba(246,244,239,0.6)" }}>
            {selected + 1} / {roles.length}
          </span>
        </div>
      </div>
    </section>
  );
}
