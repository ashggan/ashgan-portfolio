"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { stack, stackTotal } from "@/data/stack";
import { hexA } from "@/lib/utils";

interface FlatRow {
  name: string;
  sub: string;
  hasSub: boolean;
  parts: { v: string; c: string }[];
  color: string;
  glyph: string;
  cat: string;
}

export default function Skills() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");
  const [cursor, setCursor] = useState(0);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);

  const { groups, flat } = useMemo(() => {
    const q = query.trim().toLowerCase();
    const flatRows: FlatRow[] = [];
    const grps: { name: string; color: string; items: FlatRow[] }[] = [];

    stack.forEach((g) => {
      if (cat !== "All" && g.name !== cat) return;
      const catHit = !!q && g.name.toLowerCase().indexOf(q) > -1;
      const rows: FlatRow[] = [];
      g.items.forEach((raw) => {
        const name = typeof raw === "string" ? raw : raw.name;
        const sub = typeof raw === "string" ? "" : raw.sub || "";
        const at = name.toLowerCase().indexOf(q);
        if (q && at < 0 && !catHit) return;
        const parts =
          q && at > -1
            ? [
                { v: name.slice(0, at), c: "#F6F4EF" },
                { v: name.slice(at, at + q.length), c: g.color },
                { v: name.slice(at + q.length), c: "#F6F4EF" },
              ].filter((x) => x.v)
            : [{ v: name, c: "#F6F4EF" }];
        const row: FlatRow = { name, sub, hasSub: !!sub, parts, color: g.color, glyph: g.glyph, cat: g.name };
        rows.push(row);
        flatRows.push(row);
      });
      if (rows.length) grps.push({ name: g.name, color: g.color, items: rows });
    });

    return { groups: grps, flat: flatRows };
  }, [query, cat]);

  const effectiveCursor = flat.length ? Math.min(cursor, flat.length - 1) : 0;

  useEffect(() => {
    const row = rowRefs.current[effectiveCursor];
    if (row) row.scrollIntoView({ block: "nearest" });
  }, [effectiveCursor, query, cat]);

  const moveCursor = (d: number) => {
    setCursor((c) => Math.max(0, Math.min(flat.length - 1, c + d)));
  };

  const isEmpty = flat.length === 0;
  const countLabel = query.trim() || cat !== "All" ? `${flat.length} / ${stackTotal}` : `${stackTotal} technologies`;

  return (
    <section
      id="s-04"
      data-sec="04"
      data-bg="#16181B"
      data-fg="#F6F4EF"
      data-bar-bg="rgba(22,24,27,0.9)"
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
          Technical skills: a searchable list of {stackTotal} technologies grouped into eight categories, from
          languages and frontend frameworks to cloud, security, testing and tools.
        </span>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px 18px", alignItems: "baseline", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, letterSpacing: "0.14em", color: "rgba(246,244,239,0.55)" }}>
              04
            </span>
            <h2 style={{ margin: 0, fontSize: "clamp(20px,2.2vw,26px)", fontWeight: 600, letterSpacing: "-0.015em" }}>Technical skills</h2>
          </div>
          <span
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: 10.5,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(246,244,239,0.5)",
            }}
          >
            04 · Search the stack
          </span>
        </div>

        <div
          data-noreveal=""
          style={{
            marginTop: "clamp(14px,2vw,22px)",
            border: "1px solid rgba(246,244,239,0.16)",
            borderRadius: 12,
            background: "#1E2226",
            overflow: "hidden",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 11, padding: "13px 15px", borderBottom: "1px solid rgba(246,244,239,0.12)" }}>
            <span aria-hidden="true" style={{ width: 13, height: 13, border: "1.5px solid rgba(246,244,239,0.45)", borderRadius: "50%", flex: "0 0 auto" }} />
            <input
              ref={inputRef}
              data-palette-input=""
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setCursor(0);
              }}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  moveCursor(1);
                } else if (e.key === "ArrowUp") {
                  e.preventDefault();
                  moveCursor(-1);
                } else if (e.key === "Escape") {
                  e.preventDefault();
                  setQuery("");
                  setCat("All");
                  setCursor(0);
                }
              }}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              aria-label="Search the stack"
              placeholder="Search the stack — try 'react', 'cloud', 'test'…"
              style={{
                flex: "1 1 auto",
                minWidth: 0,
                background: "transparent",
                border: 0,
                outline: "none",
                color: "#F6F4EF",
                fontFamily: "var(--font-sans), Helvetica, Arial, sans-serif",
                fontSize: 15,
              }}
            />
            {focused && (
              <span
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: 9.5,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(246,244,239,0.4)",
                  border: "1px solid rgba(246,244,239,0.2)",
                  borderRadius: 4,
                  padding: "3px 6px",
                }}
              >
                esc
              </span>
            )}
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, padding: "11px 15px", borderBottom: "1px solid rgba(246,244,239,0.12)" }}>
            {[{ label: "All", name: "All", color: "" }, ...stack.map((g) => ({ label: g.name, name: g.name, color: g.color }))].map((c) => {
              const on = cat === c.name;
              return (
                <button
                  key={c.name}
                  onClick={() => {
                    setCat(c.name);
                    setCursor(0);
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: 9.5,
                    letterSpacing: "0.09em",
                    textTransform: "uppercase",
                    padding: "6px 11px",
                    borderRadius: 99,
                    cursor: "pointer",
                    background: on ? c.color || "#F6F4EF" : "transparent",
                    color: on ? (c.color ? "#FFFFFF" : "#16181B") : "rgba(246,244,239,0.75)",
                    border: `1px solid ${on ? c.color || "#F6F4EF" : "rgba(246,244,239,0.22)"}`,
                    transition: "background .2s ease, color .2s ease, border-color .2s ease",
                  }}
                >
                  {c.color && <span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: "50%", background: c.color }} />}
                  <span>{c.label}</span>
                </button>
              );
            })}
          </div>

          <div data-results="" style={{ position: "relative", maxHeight: "min(340px,38vh)", overflow: "auto", padding: "6px 0" }}>
            {groups.map((gr) => (
              <div key={gr.name}>
                <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "10px 15px 6px" }}>
                  <span aria-hidden="true" style={{ width: 8, height: 8, borderRadius: 2, background: gr.color }} />
                  <span
                    style={{
                      fontFamily: "var(--font-mono), monospace",
                      fontSize: 9.5,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "rgba(246,244,239,0.5)",
                    }}
                  >
                    {gr.name}
                  </span>
                </div>
                {gr.items.map((it) => {
                  const flatIndex = flat.indexOf(it);
                  const on = flatIndex === effectiveCursor;
                  return (
                    <div
                      key={it.name}
                      ref={(el) => {
                        rowRefs.current[flatIndex] = el;
                      }}
                      onClick={() => setCursor(flatIndex)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 11,
                        padding: "7px 15px 7px 12px",
                        borderLeft: `3px solid ${on ? it.color : "transparent"}`,
                        background: on ? hexA(it.color, 0.12) : "transparent",
                        cursor: "pointer",
                        transition: "background .18s ease",
                      }}
                    >
                      <span
                        aria-hidden="true"
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: 4,
                          flex: "0 0 auto",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: hexA(it.color, 0.16),
                          color: it.color,
                          fontFamily: "var(--font-mono), monospace",
                          fontSize: 10,
                        }}
                      >
                        {it.glyph}
                      </span>
                      <span style={{ flex: "1 1 auto", minWidth: 0 }}>
                        <span style={{ fontSize: 14.5, display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {it.parts.map((pt, i) => (
                            <span key={i} style={{ color: pt.c }}>
                              {pt.v}
                            </span>
                          ))}
                        </span>
                        {it.hasSub && (
                          <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 10, color: "rgba(246,244,239,0.42)" }}>
                            {it.sub}
                          </span>
                        )}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-mono), monospace",
                          fontSize: 9.5,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: it.color,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {it.cat}
                      </span>
                      <span aria-hidden="true" style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, color: it.color, opacity: on ? 1 : 0, width: 10 }}>
                        ↵
                      </span>
                    </div>
                  );
                })}
              </div>
            ))}
            {isEmpty && (
              <div style={{ padding: "26px 15px", textAlign: "center", fontSize: 14, color: "rgba(246,244,239,0.55)" }}>
                No match — probably something I picked up last sprint.
              </div>
            )}
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px 16px",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 15px",
              borderTop: "1px solid rgba(246,244,239,0.12)",
              fontFamily: "var(--font-mono), monospace",
              fontSize: 9.5,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(246,244,239,0.45)",
            }}
          >
            <span>{countLabel}</span>
            <span style={{ display: "flex", gap: 14 }}>
              <span>↑↓ navigate</span>
              <span>esc clear</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
