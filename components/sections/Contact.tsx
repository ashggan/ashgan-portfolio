"use client";

import { useEffect, useRef, useState } from "react";
import ParticleText from "@/components/canvas/ParticleText";
import { quickReplies, CONTACT } from "@/data/chat";
import { kigaliHour } from "@/lib/utils";
import { useKigaliClock } from "@/hooks/useKigaliClock";
import { useAvailability } from "@/hooks/useAvailability";

interface ChatMsg {
  role: "bot" | "user";
  text: string;
  actions: boolean;
  live: boolean;
}

function greeting() {
  const h = kigaliHour();
  return h >= 22 || h < 7
    ? "Hey — I'm Ashgan. It's late here in Kigali, but I'm hiring-curious and read every message within a day. Ask me anything."
    : "Hey — I'm Ashgan, a senior full-stack engineer in Kigali. Hiring for a senior or lead role? Ask me anything.";
}

function LinksRow() {
  return (
    <span style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 11 }}>
      <a
        href={`mailto:${CONTACT.email}`}
        style={{ fontFamily: "var(--font-mono), monospace", fontSize: 10, letterSpacing: "0.09em", textTransform: "uppercase", background: "#B4552F", color: "#FFFDF9", padding: "8px 13px", borderRadius: 6 }}
      >
        Email
      </a>
      <a
        href={CONTACT.github}
        target="_blank"
        rel="noopener"
        style={{ fontFamily: "var(--font-mono), monospace", fontSize: 10, letterSpacing: "0.09em", textTransform: "uppercase", border: "1px solid rgba(22,24,27,0.25)", color: "#16181B", padding: "8px 13px", borderRadius: 6 }}
      >
        GitHub
      </a>
      <a
        href={CONTACT.linkedin}
        target="_blank"
        rel="noopener"
        style={{ fontFamily: "var(--font-mono), monospace", fontSize: 10, letterSpacing: "0.09em", textTransform: "uppercase", border: "1px solid rgba(22,24,27,0.25)", color: "#16181B", padding: "8px 13px", borderRadius: 6 }}
      >
        LinkedIn
      </a>
    </span>
  );
}

export default function Contact() {
  const [chat, setChat] = useState<ChatMsg[]>([]);
  const [typing, setTyping] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const [draft, setDraft] = useState("");
  const [chatError, setChatError] = useState("");
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const typeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const streamTimer = useRef<ReturnType<typeof setInterval>>(undefined);
  const streamingRef = useRef(false);
  const clock = useKigaliClock();
  const availability = useAvailability();

  const scrollChat = () => {
    const box = chatBoxRef.current;
    if (box) box.scrollTop = box.scrollHeight;
  };

  const botReply = (text: string, actions: boolean, delay: number) => {
    clearTimeout(typeTimer.current);
    clearInterval(streamTimer.current);
    streamingRef.current = true;
    setTyping(true);
    setStreaming(true);
    scrollChat();
    typeTimer.current = setTimeout(() => {
      setTyping(false);
      setChat((s) => [...s, { role: "bot", text: "", actions: false, live: true }]);
      scrollChat();
      let i = 0;
      streamTimer.current = setInterval(() => {
        i += 2;
        const done = i >= text.length;
        setChat((s) => {
          const next = s.slice();
          next[next.length - 1] = { role: "bot", text: text.slice(0, Math.min(i, text.length)), actions: done && actions, live: !done };
          return next;
        });
        scrollChat();
        if (done) {
          clearInterval(streamTimer.current);
          streamingRef.current = false;
          setStreaming(false);
        }
      }, 16);
    }, delay);
  };

  const sendUser = (text: string, answer: string, actions?: boolean) => {
    if (streamingRef.current) return;
    setChat((s) => [...s, { role: "user", text, actions: false, live: false }]);
    scrollChat();
    botReply(answer, !!actions, 700);
  };

  const submitDraft = () => {
    const text = draft.trim();
    if (!text) {
      setChatError("Type a message first.");
      return;
    }
    setDraft("");
    setChatError("");
    sendUser(text, "Thanks for the note. I'm a small bot standing in for Ashgan — but he's one message away, and reads everything within a day:", true);
  };

  useEffect(() => {
    const greetTimer = setTimeout(() => botReply(greeting(), false, 900), 1200);
    return () => {
      clearTimeout(greetTimer);
      clearTimeout(typeTimer.current);
      clearInterval(streamTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      id="s-08"
      data-sec="08"
      data-bg="#B4552F"
      data-fg="#F6F4EF"
      data-bar-bg="rgba(180,85,47,0.9)"
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
          Contact: a small chat assistant answers common questions about availability, location and how to reach
          Ashgan, and provides direct email, GitHub and LinkedIn links. Let&rsquo;s talk.
        </span>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px 18px", alignItems: "baseline", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, letterSpacing: "0.14em", color: "rgba(246,244,239,0.7)" }}>08</span>
            <h2 style={{ margin: 0, fontSize: "clamp(20px,2.2vw,26px)", fontWeight: 600, letterSpacing: "-0.015em" }}>Contact</h2>
          </div>
          <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 10.5, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(246,244,239,0.65)" }}>
            08 · Say hello
          </span>
        </div>

        <div data-chatgrid="" style={{ marginTop: "clamp(14px,2vw,22px)", display: "grid", gridTemplateColumns: "minmax(0,3fr) minmax(0,2fr)", gap: "clamp(16px,2.4vw,32px)", alignItems: "stretch" }}>
          <div data-noreveal="" style={{ maxWidth: 760, border: "1px solid rgba(22,24,27,0.14)", borderRadius: 16, background: "#FFFDF9", color: "#16181B", overflow: "hidden" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", justifyContent: "space-between", padding: "12px 15px", borderBottom: "1px solid rgba(22,24,27,0.12)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 11, minWidth: 0 }}>
                <span aria-hidden="true" style={{ width: 34, height: 34, borderRadius: "50%", background: "#16181B", color: "#F6F4EF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, flex: "0 0 auto" }}>
                  AM
                </span>
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <span style={{ fontSize: 14.5, fontWeight: 600 }}>Ashgan</span>
                    <span aria-hidden="true" data-pulse="1" style={{ width: 7, height: 7, borderRadius: "50%", background: "#3E9B6B" }} />
                  </div>
                  <div style={{ fontSize: 11.5, color: "#5C5F63", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    Senior full-stack engineer · replies within a day
                  </div>
                </div>
              </div>
              <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, color: "#5C5F63", whiteSpace: "nowrap" }}>
                Kigali / {clock} · UTC+2
              </span>
            </div>

            <div ref={chatBoxRef} data-chat="" style={{ height: "clamp(250px,34vh,400px)", overflow: "auto", padding: "14px 15px", display: "flex", flexDirection: "column", gap: 11 }}>
              {chat.map((m, i) => {
                const bot = m.role === "bot";
                return (
                  <div key={i} style={{ display: "flex", gap: 9, alignItems: "flex-end", justifyContent: bot ? "flex-start" : "flex-end" }}>
                    {bot && (
                      <span aria-hidden="true" style={{ width: 26, height: 26, borderRadius: "50%", background: "rgba(22,24,27,0.08)", color: "#5C5F63", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9.5, fontWeight: 600, flex: "0 0 auto" }}>
                        AM
                      </span>
                    )}
                    <div
                      style={{
                        maxWidth: "min(78%,460px)",
                        background: bot ? "rgba(22,24,27,0.05)" : "#16181B",
                        color: bot ? "#16181B" : "#F6F4EF",
                        border: `1px solid ${bot ? "rgba(22,24,27,0.1)" : "#16181B"}`,
                        borderRadius: bot ? "14px 14px 14px 4px" : "14px 14px 4px 14px",
                        padding: "10px 13px",
                        fontSize: 14,
                        lineHeight: 1.55,
                      }}
                    >
                      <span>{m.text}</span>
                      {m.live && (
                        <span data-caret="1" style={{ display: "inline-block", width: 6, height: 13, background: "#B4552F", marginLeft: 2, verticalAlign: -2 }} />
                      )}
                      {m.actions && <LinksRow />}
                    </div>
                    {!bot && (
                      <span aria-hidden="true" style={{ width: 26, height: 26, borderRadius: "50%", background: "rgba(22,24,27,0.08)", color: "#5C5F63", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 600, flex: "0 0 auto" }}>
                        you
                      </span>
                    )}
                  </div>
                );
              })}
              {typing && (
                <div style={{ display: "flex", gap: 9, alignItems: "flex-end" }}>
                  <span aria-hidden="true" style={{ width: 26, height: 26, borderRadius: "50%", background: "rgba(22,24,27,0.08)", color: "#5C5F63", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9.5, fontWeight: 600, flex: "0 0 auto" }}>
                    AM
                  </span>
                  <span aria-hidden="true" style={{ display: "flex", gap: 4, alignItems: "center", background: "rgba(22,24,27,0.05)", border: "1px solid rgba(22,24,27,0.1)", borderRadius: "14px 14px 14px 4px", padding: "12px 14px" }}>
                    <span data-dot="" style={{ width: 6, height: 6, borderRadius: "50%", background: "#9AA0A5", animationDelay: "0s" }} />
                    <span data-dot="" style={{ width: 6, height: 6, borderRadius: "50%", background: "#9AA0A5", animationDelay: ".16s" }} />
                    <span data-dot="" style={{ width: 6, height: 6, borderRadius: "50%", background: "#9AA0A5", animationDelay: ".32s" }} />
                  </span>
                </div>
              )}
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 7, padding: "0 15px 12px" }}>
              {quickReplies.map((q) => {
                const disabled = streaming || typing;
                return (
                  <button
                    key={q.label}
                    onClick={() => sendUser(q.label, q.answer, q.actions)}
                    disabled={disabled}
                    style={{
                      fontSize: 12.5,
                      padding: "8px 13px",
                      borderRadius: 99,
                      cursor: disabled ? "default" : "pointer",
                      background: "transparent",
                      color: disabled ? "#9AA0A5" : "#16181B",
                      border: `1px solid ${disabled ? "rgba(22,24,27,0.12)" : "rgba(22,24,27,0.25)"}`,
                      transition: "background .2s ease, border-color .2s ease",
                    }}
                  >
                    {q.label}
                  </button>
                );
              })}
            </div>

            <div style={{ borderTop: "1px solid rgba(22,24,27,0.12)", padding: "11px 15px" }}>
              <div style={{ display: "flex", gap: 9, alignItems: "center" }}>
                <input
                  type="text"
                  value={draft}
                  onChange={(e) => {
                    setDraft(e.target.value);
                    setChatError("");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      submitDraft();
                    }
                  }}
                  aria-label="Write a message to Ashgan"
                  placeholder="Or type a message…"
                  style={{
                    flex: "1 1 auto",
                    minWidth: 0,
                    background: "rgba(22,24,27,0.04)",
                    border: "1px solid rgba(22,24,27,0.14)",
                    borderRadius: 99,
                    padding: "11px 15px",
                    fontFamily: "inherit",
                    fontSize: 14,
                    color: "#16181B",
                    outline: "none",
                  }}
                />
                <button
                  onClick={submitDraft}
                  aria-label="Send message"
                  style={{ width: 40, height: 40, flex: "0 0 auto", borderRadius: "50%", border: 0, background: "#B4552F", color: "#FFFDF9", cursor: "pointer", fontSize: 15, lineHeight: 1 }}
                >
                  ↑
                </button>
              </div>
              {chatError && <div style={{ fontSize: 12, color: "#B4552F", marginTop: 8 }}>{chatError}</div>}
            </div>
          </div>

          <aside style={{ minWidth: 0, padding: "clamp(16px,2.2vw,26px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14 }}>
            <ParticleText />
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                border: `1px solid ${availability.bd}`,
                color: availability.fg,
                padding: "7px 13px",
                borderRadius: 99,
                fontFamily: "var(--font-mono), monospace",
                fontSize: 10,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                textAlign: "center",
              }}
            >
              <span aria-hidden="true" data-pulse={availability.pulse} style={{ width: 7, height: 7, borderRadius: "50%", background: availability.dot, flex: "0 0 auto" }} />
              <span>{availability.text}</span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
