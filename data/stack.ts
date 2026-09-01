export interface StackItem {
  name: string;
  sub?: string;
}

export interface StackGroup {
  name: string;
  color: string;
  glyph: string;
  items: (string | StackItem)[];
}

export const stack: StackGroup[] = [
  { name: "Languages", color: "#378ADD", glyph: "{}", items: ["TypeScript", "JavaScript", "PHP", "Python", "SQL"] },
  {
    name: "Frontend",
    color: "#7F77DD",
    glyph: "▤",
    items: ["React", "Next.js", "Vue.js", "Nuxt.js", "Tailwind CSS", "Bootstrap", "HTML", "CSS"],
  },
  {
    name: "Backend",
    color: "#1D9E75",
    glyph: "▥",
    items: ["Node.js", "Express.js", "Laravel", "Strapi CMS", "Payload CMS", "REST APIs", "GraphQL"],
  },
  { name: "Databases", color: "#BA7517", glyph: "▣", items: ["PostgreSQL", "MySQL", "Supabase", "Prisma ORM"] },
  {
    name: "Cloud & DevOps",
    color: "#D85A30",
    glyph: "☁",
    items: [
      { name: "Microsoft Azure", sub: "Web Apps · Blob Storage · Key Vault" },
      "Google Cloud",
      "Docker",
      "Netlify",
      "GitHub Actions",
      "Git",
    ],
  },
  {
    name: "Security & integrations",
    color: "#D4537E",
    glyph: "⌸",
    items: ["Client-side encryption", "JWT", "Stripe Embedded Checkout", "Conversational AI"],
  },
  { name: "Testing", color: "#639922", glyph: "◍", items: ["Vitest", "Jest", "Cypress", "Jasmine"] },
  { name: "Tools", color: "#888780", glyph: "⚙", items: ["Postman", "Jira", "ClickUp", "Figma", "Adobe XD"] },
];

export const stackTotal = stack.reduce((sum, g) => sum + g.items.length, 0);
