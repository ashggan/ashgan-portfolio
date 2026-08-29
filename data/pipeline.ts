export interface PipeStage {
  label: string;
  glyph: string;
  log: string;
  green: boolean;
  doneCap: string;
}

export const pipeStages: PipeStage[] = [
  { label: "Build", glyph: "⚒", log: "> building ashggan@9.0 — nine years of commits", green: false, doneCap: "done" },
  { label: "Test", glyph: "⚗", log: "> tests passed · encryption · payments · real-time chat", green: true, doneCap: "done" },
  { label: "Ship", glyph: "➤", log: "> shipping to telecoms, fintech, publishing & NGOs", green: false, doneCap: "done" },
  { label: "Live", glyph: "◉", log: "> ● live from Kigali — open to senior & lead roles", green: true, doneCap: "live" },
];
