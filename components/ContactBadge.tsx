"use client";

import { useEffect, useRef, useState } from "react";
import { useHover } from "@/hooks/useHover";
import { CV_URL } from "@/lib/cv";
import CvPreview from "@/components/CvPreview";

const rowBase: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
  padding: "13px 16px",
  color: "#F1EFEA",
  fontFamily: "var(--font-mono), monospace",
  fontSize: 10,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  background: "transparent",
  border: 0,
  width: "100%",
  textAlign: "left",
  cursor: "pointer",
  transition: "background .18s ease",
};

function MenuAnchorRow({
  href,
  download,
  target,
  rel,
  onClick,
  glyph,
  divider,
  children,
}: {
  href: string;
  download?: string;
  target?: string;
  rel?: string;
  onClick: () => void;
  glyph: string;
  divider: boolean;
  children: React.ReactNode;
}) {
  const [hover, handlers] = useHover();
  return (
    <a
      role="menuitem"
      href={href}
      download={download}
      target={target}
      rel={rel}
      onClick={onClick}
      {...handlers}
      style={{
        ...rowBase,
        background: hover ? "#26292D" : "transparent",
        borderTop: divider ? "1px solid rgba(241,239,234,0.1)" : "none",
      }}
    >
      <span>{children}</span>
      <span aria-hidden="true" style={{ opacity: 0.5 }}>
        {glyph}
      </span>
    </a>
  );
}

function MenuButtonRow({
  onClick,
  glyph,
  divider,
  children,
  itemRef,
}: {
  onClick: () => void;
  glyph: string;
  divider: boolean;
  children: React.ReactNode;
  itemRef: React.Ref<HTMLButtonElement>;
}) {
  const [hover, handlers] = useHover();
  return (
    <button
      ref={itemRef}
      role="menuitem"
      onClick={onClick}
      {...handlers}
      style={{
        ...rowBase,
        background: hover ? "#26292D" : "transparent",
        borderTop: divider ? "1px solid rgba(241,239,234,0.1)" : "none",
      }}
    >
      <span>{children}</span>
      <span aria-hidden="true" style={{ opacity: 0.5 }}>
        {glyph}
      </span>
    </button>
  );
}

export default function ContactBadge() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [pillHover, pillHandlers] = useHover();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLButtonElement>(null);
  const previewItemRef = useRef<HTMLButtonElement>(null);
  const restoreFocusToPreviewItem = useRef(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [menuOpen]);

  const openPreview = () => {
    setMenuOpen(false);
    // Touch capability alone also flags touchscreen laptops, where PDF iframes render
    // fine — pair it with a narrow viewport so only actual phones/small tablets (where
    // iframe'd PDFs are known to render blank) get redirected to a new tab instead.
    const hasTouch = typeof window !== "undefined" && (navigator.maxTouchPoints > 0 || "ontouchstart" in window);
    const isMobileViewport = typeof window !== "undefined" && window.innerWidth < 768;
    if (hasTouch && isMobileViewport) {
      window.open(CV_URL, "_blank", "noopener");
      return;
    }
    setPreviewOpen(true);
  };

  const closePreview = () => {
    setPreviewOpen(false);
    restoreFocusToPreviewItem.current = true;
    setMenuOpen(true);
  };

  // Opening the preview closes the menu, so the "Preview CV" item's DOM node is gone
  // by the time the preview closes. Re-open the menu as part of restoring focus to it,
  // rather than focusing an unmounted ref (which silently no-ops).
  useEffect(() => {
    if (menuOpen && restoreFocusToPreviewItem.current) {
      restoreFocusToPreviewItem.current = false;
      previewItemRef.current?.focus();
    }
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen && !previewOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (previewOpen) {
        closePreview();
      } else if (menuOpen) {
        setMenuOpen(false);
        pillRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen, previewOpen]);

  return (
    <>
      <div
        ref={wrapperRef}
        style={{
          position: "fixed",
          right: "clamp(14px,2.4vw,28px)",
          bottom: "clamp(16px,2.6vw,30px)",
          zIndex: 150,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 9,
        }}
      >
        {menuOpen && (
          <div role="menu" aria-label="Contact options" data-menu-in="" style={{ minWidth: 190, background: "#16181B", borderRadius: 12, overflow: "hidden" }}>
            <MenuAnchorRow href="#s-08" onClick={() => setMenuOpen(false)} glyph="↓" divider={false}>
              Get in touch
            </MenuAnchorRow>
            <MenuButtonRow onClick={openPreview} glyph="⤢" divider itemRef={previewItemRef}>
              Preview CV
            </MenuButtonRow>
            <MenuAnchorRow href={CV_URL} download="Ashgan_Mustafa_CV.pdf" onClick={() => setMenuOpen(false)} glyph="↧" divider>
              Download CV
            </MenuAnchorRow>
          </div>
        )}

        <button
          ref={pillRef}
          aria-haspopup="true"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          {...pillHandlers}
          data-badge-breathe="1"
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            background: pillHover ? "#16181B" : "#D85A30",
            color: "#FFFDF9",
            padding: "16px 24px",
            borderRadius: 99,
            border: 0,
            fontFamily: "var(--font-mono), monospace",
            fontSize: 11.5,
            fontWeight: 500,
            letterSpacing: "0.13em",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "background .25s ease",
          }}
        >
          {[0, 0.6, 1.2].map((delay) => (
            <span
              key={delay}
              aria-hidden="true"
              data-badge-ring="1"
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 99,
                border: "1.5px solid #D85A30",
                animationDelay: `${delay}s`,
                pointerEvents: "none",
              }}
            />
          ))}
          <span style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: 10 }}>
            <span aria-hidden="true" data-pulse="1" style={{ width: 8, height: 8, borderRadius: "50%", background: "#6BD69F" }} />
            <span>Contact · CV</span>
            <span
              aria-hidden="true"
              style={{ opacity: 0.6, transform: menuOpen ? "rotate(180deg)" : "none", transition: "transform .22s ease" }}
            >
              ⌄
            </span>
          </span>
        </button>
      </div>

      <CvPreview open={previewOpen} onClose={closePreview} />
    </>
  );
}
