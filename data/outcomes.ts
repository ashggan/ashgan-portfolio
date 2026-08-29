export type TokenKind = "kw" | "key" | "str" | "num" | "com" | "pun" | "txt" | "head";

export interface Token {
  k: TokenKind;
  v: string;
}

export const EDITOR_COLORS: Record<TokenKind, string> = {
  kw: "#C084FC",
  key: "#7DB4F5",
  str: "#5FCFC0",
  num: "#E8B26A",
  com: "#7C8288",
  pun: "#A8AEB4",
  txt: "#E8E6E1",
  head: "#E8E6E1",
};

const ITALIC: TokenKind[] = ["com"];

const k = (v: string): Token => ({ k: "kw", v });
const key = (v: string): Token => ({ k: "key", v });
const s = (v: string): Token => ({ k: "str", v });
const n = (v: string): Token => ({ k: "num", v });
const pu = (v: string): Token => ({ k: "pun", v });
const t = (v: string): Token => ({ k: "txt", v });
const cm = (v: string): Token => ({ k: "com", v });
const head = (v: string): Token => ({ k: "head", v });

export interface OutcomeFile {
  name: string;
  accent: string;
  cmd: string;
  out: string;
  lines: Token[][];
}

export const outcomeFiles: OutcomeFile[] = [
  {
    name: "award.md",
    accent: "#E8B26A",
    cmd: "cat award.md --reach",
    out: "42,000+ conversations across 172 countries",
    lines: [
      [head("# UN Global AI for Good — Impact Award 2025")],
      [],
      [key("platform"), pu(": "), t("Sophia · Spring ACT")],
      [
        key("conversations"),
        pu(": "),
        n("42,000+"),
        t("   "),
        key("countries"),
        pu(": "),
        n("172"),
        t("   "),
        key("languages"),
        pu(": "),
        n("25+"),
      ],
      [key("verdict"), pu(": "), t("recognised, in production")],
    ],
  },
  {
    name: "maintainer.ts",
    accent: "#7DB4F5",
    cmd: "git shortlog -sn | head -1",
    out: "35% of an 1,800-commit codebase",
    lines: [
      [k("export "), k("const "), t("maintainer "), pu("= {")],
      [pu("  "), key("role"), pu(": "), s('"top contributor"'), pu(",")],
      [pu("  "), key("commitsOwned"), pu(": "), n("1_800"), pu(",")],
      [pu("  "), key("ownership"), pu(": "), n("0.35"), t(" "), cm("/* ~35% of all commits */"), pu(",")],
      [pu("  "), key("now"), pu(": "), s('"review + merge PRs"')],
      [pu("}")],
    ],
  },
  {
    name: "encryption.ts",
    accent: "#5FCFC0",
    cmd: "openssl status --client-side",
    out: "documents encrypted browser-side",
    lines: [
      [k("export "), k("const "), t("encryption "), pu("= {")],
      [pu("  "), key("scope"), pu(": "), s('"client-side, in production"'), pu(",")],
      [pu("  "), key("flows"), pu(": ["), s('"encryption"'), pu(", "), s('"image-based auth"'), pu("],")],
      [pu("  "), key("guarantee"), pu(": "), s('"encrypted before it leaves the browser"'), pu(",")],
      [pu("  "), key("project"), pu(": "), s('"Spring ACT"')],
      [pu("}")],
    ],
  },
  {
    name: "techLead.ts",
    accent: "#C084FC",
    cmd: "npm run team --status",
    out: "cross-functional team, ideation → deployment",
    lines: [
      [k("export "), k("const "), t("techLead "), pu("= {")],
      [pu("  "), key("team"), pu(": "), s('"cross-functional"'), pu(",")],
      [pu("  "), key("product"), pu(": "), s('"international e-wallet"'), pu(",")],
      [pu("  "), key("owns"), pu(": ["), s('"mobile"'), pu(", "), s('"backend"'), pu(", "), s('"architecture"'), pu("],")],
      [pu("  "), key("cadence"), pu(": "), s('"agile, Jira"'), t(" "), cm("/* sprints + backlog */"), pu(",")],
      [pu("  "), key("lifecycle"), pu(": "), s('"ideation → deployment"')],
      [pu("}")],
    ],
  },
  {
    name: "performance.ts",
    accent: "#4BC08A",
    cmd: "lighthouse ./andariya --compare",
    out: "89% faster after optimisation pass",
    lines: [
      [k("export "), k("const "), t("performance "), pu("= {")],
      [pu("  "), key("gain"), pu(": "), n("0.89"), t(" "), cm("/* 89% improvement */"), pu(",")],
      [
        pu("  "),
        key("levers"),
        pu(": ["),
        s('"image optimisation"'),
        pu(", "),
        s('"caching"'),
        pu(", "),
        s('"query tuning"'),
        pu("],"),
      ],
      [
        pu("  "),
        key("alsoShipped"),
        pu(": ["),
        s('"legacy migration"'),
        pu(", "),
        s('"search"'),
        pu(", "),
        s('"redesign"'),
        pu("],"),
      ],
      [pu("  "), key("platform"), pu(": "), s('"Andariya, Arabic + English"')],
      [pu("}")],
    ],
  },
  {
    name: "delivery.ts",
    accent: "#E05C4B",
    cmd: "gh workflow list --state active",
    out: "tests + pipelines built from zero",
    lines: [
      [k("export "), k("const "), t("delivery "), pu("= {")],
      [pu("  "), key("testing"), pu(": "), s('"suite built from scratch"'), pu(",")],
      [
        pu("  "),
        key("pipelines"),
        pu(": ["),
        s('"GitHub Actions"'),
        pu(", "),
        s('"Azure prod"'),
        pu(", "),
        s('"Azure staging"'),
        pu("],"),
      ],
      [pu("  "), key("payments"), pu(": "), s('"Stripe embedded checkout, solo"'), pu(",")],
      [pu("  "), key("mlApi"), pu(": "), s('"custom inference API on Google Cloud"'), t(" "), cm("// EquiJob")],
      [pu("}")],
    ],
  },
];

export function tokenStyle(kind: TokenKind) {
  return { color: EDITOR_COLORS[kind], fontStyle: ITALIC.includes(kind) ? ("italic" as const) : ("normal" as const) };
}
