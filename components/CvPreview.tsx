"use client";

import { useEffect } from "react";
import { useHover } from "@/hooks/useHover";
import { CV_URL } from "@/lib/cv";

function HeaderLink({
  href,
  target,
  rel,
  download,
  children,
  variant,
}: {
  href: string;
  target?: string;
  rel?: string;
  download?: string;
  children: React.ReactNode;
  variant: "solid" | "outline";
}) {
  const [hover, handlers] = useHover();
  const base: React.CSSProperties = {
    fontFamily: "var(--font-mono), monospace",
    fontSize: 9.5,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    borderRadius: 6,
    padding: "8px 12px",
    whiteSpace: "nowrap",
    transition: "background .2s ease, border-color .2s ease, color .2s ease",
  };
  const solid: React.CSSProperties = {
    background: hover ? "#16181B" : "#B4552F",
    color: "#FFFDF9",
    border: "1px solid transparent",
  };
  const outline: React.CSSProperties = {
    background: "transparent",
    color: "#16181B",
    border: `1px solid ${hover ? "#16181B" : "rgba(22,24,27,0.2)"}`,
  };
  return (
    <a href={href} target={target} rel={rel} download={download} {...handlers} style={{ ...base, ...(variant === "solid" ? solid : outline) }}>
      {children}
    </a>
  );
}

function CloseButton({ onClose }: { onClose: () => void }) {
  const [hover, handlers] = useHover();
  return (
    <button
      onClick={onClose}
      aria-label="Close CV preview"
      {...handlers}
      style={{
        width: 32,
        height: 32,
        flex: "0 0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "transparent",
        color: "#16181B",
        border: `1px solid ${hover ? "#16181B" : "rgba(22,24,27,0.2)"}`,
        borderRadius: 6,
        fontSize: 13,
        cursor: "pointer",
        transition: "border-color .2s ease",
      }}
    >
      ✕
    </button>
  );
}

export default function CvPreview({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Curriculum vitae preview"
      onClick={onClose}
      data-overlay-in=""
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "rgba(15,18,20,0.82)",
        padding: "clamp(14px,3vw,40px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(920px,100%)",
          height: "min(88vh,100%)",
          background: "#F6F4EF",
          borderRadius: 14,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            padding: "14px 18px",
            borderBottom: "1px solid rgba(22,24,27,0.1)",
          }}
        >
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#16181B", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              Ashgan Mustafa — CV
            </div>
            <div
              style={{
                marginTop: 2,
                fontFamily: "var(--font-mono), monospace",
                fontSize: 9.5,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#5C5F63",
              }}
            >
              PDF · senior full-stack engineer
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flex: "0 0 auto" }}>
            <HeaderLink href={CV_URL} download="Ashgan_Mustafa_CV.pdf" variant="solid">
              Download
            </HeaderLink>
            <HeaderLink href={CV_URL} target="_blank" rel="noopener" variant="outline">
              New tab
            </HeaderLink>
            <CloseButton onClose={onClose} />
          </div>
        </header>

        <div style={{ flex: 1, minHeight: 0, background: "#E8E5DE" }}>
          <iframe src={`${CV_URL}#view=FitH`} title="Ashgan Mustafa CV" style={{ width: "100%", height: "100%", border: 0, display: "block" }} />
        </div>
      </div>
    </div>
  );
}
