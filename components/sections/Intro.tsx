"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { pipeStages } from "@/data/pipeline";
import { useHover } from "@/hooks/useHover";

interface DeployState {
  step: number;
  done: number;
  running: boolean;
  logs: { text: string; color: string }[];
}

const INITIAL: DeployState = { step: -1, done: -1, running: false, logs: [] };

function CtaLink({
  href,
  target,
  rel,
  download,
  children,
  base,
  hoverStyle,
}: {
  href: string;
  target?: string;
  rel?: string;
  download?: string;
  children: React.ReactNode;
  base: React.CSSProperties;
  hoverStyle: React.CSSProperties;
}) {
  const [hover, handlers] = useHover();
  return (
    <a href={href} target={target} rel={rel} download={download} {...handlers} style={{ ...base, ...(hover ? hoverStyle : {}) }}>
      {children}
    </a>
  );
}

export default function Intro() {
  const [deploy, setDeploy] = useState<DeployState>(INITIAL);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const [redeployHover, redeployHandlers] = useHover();

  const runPipeline = useCallback(() => {
    if (deploy.running) return;
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setDeploy({ step: -1, done: -1, running: true, logs: [] });

    let t = 300;
    pipeStages.forEach((sg, i) => {
      timers.current.push(
        setTimeout(() => {
          setDeploy((s) => ({ ...s, step: i }));
        }, t),
      );
      t += 700;
      timers.current.push(
        setTimeout(() => {
          setDeploy((s) => ({
            ...s,
            step: -1,
            done: i,
            logs: s.logs.concat([{ text: sg.log, color: sg.green ? "#6BD69F" : "rgba(241,239,234,0.6)" }]),
          }));
        }, t),
      );
      t += 500;
    });
    timers.current.push(
      setTimeout(() => {
        setDeploy((s) => ({ ...s, running: false }));
      }, t),
    );
  }, [deploy.running]);

  useEffect(() => {
    const id = setTimeout(() => runPipeline(), 400);
    return () => {
      clearTimeout(id);
      timers.current.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pipeStatus =
    deploy.done >= pipeStages.length - 1 ? "● operational" : deploy.running ? "running" : "queued";
  const pipeStatusColor =
    deploy.done >= pipeStages.length - 1 ? "#6BD69F" : deploy.running ? "#E8845C" : "rgba(241,239,234,0.45)";

  return (
    <section
      id="s-01"
      data-sec="01"
      data-bg="#0F1214"
      data-fg="#F1EFEA"
      data-bar-bg="rgba(15,18,20,0.9)"
      style={{
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        color: "#F1EFEA",
        padding: "clamp(56px,8vh,96px) clamp(18px,4vw,44px) clamp(56px,8vh,96px) clamp(100px,13vw,180px)",
      }}
    >
      <div data-fit="" style={{ maxWidth: 1240, margin: "0 auto", width: "100%" }}>
        <span
          style={{
            position: "absolute",
            width: 1,
            height: 1,
            overflow: "hidden",
            clip: "rect(0 0 0 0)",
            whiteSpace: "nowrap",
          }}
        >
          Ashgan Mustafa, senior full-stack engineer in Kigali, Rwanda. Nine years building, shipping and
          maintaining production systems across telecoms, fintech, publishing and NGOs. Open to senior and lead
          roles, remote on UTC+2.
        </span>

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            border: "1px solid rgba(107,214,159,0.4)",
            color: "#6BD69F",
            padding: "6px 12px",
            borderRadius: 99,
            fontFamily: "var(--font-mono), monospace",
            fontSize: 10.5,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          <span aria-hidden="true" data-pulse="1" style={{ width: 7, height: 7, borderRadius: "50%", background: "#6BD69F" }} />
          Open to senior roles · Remote · UTC+2
        </div>

        <h1
          style={{
            margin: "clamp(14px,2vw,22px) 0 12px",
            fontFamily: "var(--font-serif), Georgia, serif",
            fontWeight: 400,
            fontSize: "clamp(36px,6vw,78px)",
            lineHeight: 1.02,
            letterSpacing: "-0.025em",
          }}
        >
          Hello — I&rsquo;m <span style={{ color: "#E8845C" }}>Ashgan</span>.
        </h1>
        <p
          style={{
            margin: 0,
            fontSize: "clamp(16px,1.6vw,21px)",
            color: "rgba(241,239,234,0.7)",
            maxWidth: "56ch",
          }}
        >
          I <strong style={{ fontWeight: 600, color: "#F1EFEA" }}>build</strong>,{" "}
          <strong style={{ fontWeight: 600, color: "#F1EFEA" }}>ship</strong>, and keep systems running — this one
          included.
        </p>

        <div
          data-noreveal=""
          style={{
            marginTop: "clamp(16px,2.4vw,28px)",
            border: "1px solid rgba(241,239,234,0.16)",
            borderRadius: 12,
            background: "#171B1E",
            overflow: "hidden",
            maxWidth: 860,
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 14px",
              borderBottom: "1px solid rgba(241,239,234,0.14)",
              fontFamily: "var(--font-mono), monospace",
              fontSize: 11,
              letterSpacing: "0.05em",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 9, minWidth: 0, color: "rgba(241,239,234,0.55)" }}>
              <span aria-hidden="true" style={{ color: "#E8845C" }}>
                ⑂
              </span>
              <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                deploy · ashggan@senior-full-stack
              </span>
            </span>
            <span style={{ color: pipeStatusColor, whiteSpace: "nowrap" }}>{pipeStatus}</span>
          </div>

          <div style={{ display: "flex", alignItems: "flex-start", padding: "clamp(14px,2vw,22px) clamp(10px,1.6vw,18px) clamp(10px,1.6vw,16px)" }}>
            {pipeStages.map((sg, i) => {
              const isDone = deploy.done >= i;
              const isActive = deploy.step === i;
              const ring = isDone ? "#6BD69F" : isActive ? "#E8845C" : "rgba(241,239,234,0.3)";
              const caption = isDone ? sg.doneCap : isActive ? "running" : "queued";
              const capColor = isDone ? "#6BD69F" : isActive ? "#E8845C" : "rgba(241,239,234,0.4)";
              const hasLink = i < pipeStages.length - 1;
              return (
                <div key={sg.label} style={{ display: "flex", alignItems: "flex-start", flex: hasLink ? "1 1 auto" : "0 0 auto", minWidth: 0 }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 7, width: "clamp(58px,9vw,86px)", flex: "0 0 auto" }}>
                    <span
                      aria-hidden="true"
                      style={{
                        position: "relative",
                        width: "clamp(34px,5vw,44px)",
                        height: "clamp(34px,5vw,44px)",
                        borderRadius: "50%",
                        border: `1.5px solid ${ring}`,
                        color: ring,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 15,
                        transition: "border-color .3s ease, color .3s ease",
                      }}
                    >
                      {sg.glyph}
                      <span
                        data-spin={isActive ? "1" : "0"}
                        style={{
                          position: "absolute",
                          inset: -4,
                          borderRadius: "50%",
                          border: "1.5px solid transparent",
                          borderTopColor: ring,
                          opacity: isActive ? 1 : 0,
                        }}
                      />
                    </span>
                    <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "-0.01em", color: "#F1EFEA" }}>{sg.label}</span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono), monospace",
                        fontSize: 9,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: capColor,
                      }}
                    >
                      {caption}
                    </span>
                  </div>
                  {hasLink && (
                    <span
                      aria-hidden="true"
                      style={{
                        flex: "1 1 auto",
                        minWidth: 12,
                        height: 2,
                        marginTop: "clamp(17px,2.5vw,22px)",
                        background: "rgba(241,239,234,0.14)",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: "#6BD69F",
                          transform: `scaleX(${deploy.done >= i ? 1 : 0})`,
                          transformOrigin: "left center",
                          transition: "transform .5s linear",
                        }}
                      />
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          <div
            role="status"
            aria-live="polite"
            style={{
              borderTop: "1px solid rgba(241,239,234,0.14)",
              background: "#0F1214",
              padding: "12px 15px",
              minHeight: 96,
              display: "flex",
              flexDirection: "column",
              gap: 5,
              fontFamily: "var(--font-mono), monospace",
              fontSize: 11.5,
              lineHeight: 1.5,
            }}
          >
            {deploy.logs.map((lg, i) => (
              <span key={i} data-logline="" style={{ color: lg.color }}>
                {lg.text}
              </span>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 9, marginTop: "clamp(16px,2.4vw,26px)" }}>
          <CtaLink
            href="mailto:ashganwiki@gmail.com"
            base={{ background: "#E8845C", color: "#0F1214", padding: "13px 20px", borderRadius: 6, fontWeight: 600, fontSize: 14 }}
            hoverStyle={{ background: "#F1EFEA" }}
          >
            Get in touch
          </CtaLink>
          <CtaLink
            href="/Ashgan-Mustafa-CV.pdf"
            download="Ashgan-Mustafa-CV.pdf"
            base={{ border: "1px solid rgba(241,239,234,0.28)", padding: "13px 20px", borderRadius: 6, fontWeight: 600, fontSize: 14, color: "#F1EFEA" }}
            hoverStyle={{ borderColor: "#F1EFEA" }}
          >
            Download CV
          </CtaLink>
          <CtaLink
            href="https://github.com/ashggan"
            target="_blank"
            rel="noopener"
            base={{ border: "1px solid rgba(241,239,234,0.28)", padding: "13px 20px", borderRadius: 6, fontWeight: 600, fontSize: 14, color: "#F1EFEA" }}
            hoverStyle={{ borderColor: "#F1EFEA" }}
          >
            GitHub
          </CtaLink>
          <CtaLink
            href="https://www.linkedin.com/in/ashgan-mustafa/"
            target="_blank"
            rel="noopener"
            base={{ border: "1px solid rgba(241,239,234,0.28)", padding: "13px 20px", borderRadius: 6, fontWeight: 600, fontSize: 14, color: "#F1EFEA" }}
            hoverStyle={{ borderColor: "#F1EFEA" }}
          >
            LinkedIn
          </CtaLink>
          <button
            onClick={runPipeline}
            disabled={deploy.running}
            aria-label="Replay the deploy pipeline animation"
            {...redeployHandlers}
            style={{
              border: "1px solid rgba(241,239,234,0.28)",
              background: "transparent",
              padding: "13px 20px",
              borderRadius: 6,
              fontFamily: "var(--font-mono), monospace",
              fontSize: 11,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: deploy.running ? "rgba(241,239,234,0.45)" : "#F1EFEA",
              cursor: deploy.running ? "default" : "pointer",
              borderColor: redeployHover && !deploy.running ? "#F1EFEA" : "rgba(241,239,234,0.28)",
            }}
          >
            ↻ Redeploy
          </button>
        </div>
      </div>
    </section>
  );
}
