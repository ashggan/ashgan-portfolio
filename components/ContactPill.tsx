"use client";

import { useState } from "react";

export default function ContactPill() {
  const [hover, setHover] = useState(false);

  return (
    <a
      href="#s-08"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "fixed",
        right: "clamp(14px,2.4vw,28px)",
        bottom: "clamp(16px,2.6vw,30px)",
        zIndex: 150,
        display: "flex",
        alignItems: "center",
        gap: 9,
        background: hover ? "#16181B" : "#B4552F",
        color: "#FFFDF9",
        padding: "13px 19px",
        borderRadius: 99,
        fontFamily: "var(--font-mono), monospace",
        fontSize: 10.5,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        transition: "background .25s ease, transform .25s ease",
        transform: hover ? "translateY(-2px)" : "none",
      }}
    >
      <span aria-hidden="true" data-pulse="1" style={{ width: 7, height: 7, borderRadius: "50%", background: "#6BD69F" }} />
      <span>Contact me</span>
    </a>
  );
}
