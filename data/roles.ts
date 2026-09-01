export interface Role {
  accent: string;
  tag: string;
  personal?: boolean;
  start: [number, number, number?];
  end?: [number, number];
  current?: boolean;
  period: string;
  org: string;
  place: string;
  title: string;
  context: string;
  chip?: string;
  prose?: string;
  points: string[];
  stack: string[];
}

export const roles: Role[] = [
  {
    accent: "#9B8FE8",
    tag: "Senior engineer",
    start: [2025, 2],
    current: true,
    period: "Mar 2025 — present",
    org: "Spring ACT",
    place: "Switzerland-based NGO · Remote",
    title: "Senior Full-Stack Engineer",
    context: "Sophia — anonymous AI support platform",
    points: [
      "Built the full chat interface from scratch: streaming rendering, prompts, error handling and privacy-focused UI.",
      "Integrated a production conversational-AI chatbot and led the migration from the previous Ada integration.",
      "Delivered an end-to-end Stripe embedded-checkout donations feature independently.",
      "Migrated analytics from GA4 to privacy-first Plausible.",
      "Recognised with the UN Global AI for Good Impact Award 2025 — 42,000+ conversations, 172 countries, 25+ languages.",
    ],
    stack: ["Next.js", "React", "Payload CMS", "PostgreSQL", "Azure"],
  },
  {
    accent: "#1D9E75",
    tag: "System engineer",
    start: [2025, 3],
    end: [2025, 11],
    period: "Apr 2025 — Dec 2025",
    org: "BSS Connects",
    place: "Telecom BSS/OSS software company",
    title: "System Engineer",
    context: "Internal operations and administration dashboard",
    points: [
      "Built an internal operations and administration dashboard from the ground up with React, centralizing day-to-day operational controls in a single interface.",
      "Developed the full stack end to end — React frontend through backend APIs — and containerized the application with Docker for consistent, reproducible deployments.",
      "Deployed via Netlify and owned the feature end to end, from requirements through production.",
    ],
    stack: ["React", "REST APIs", "Docker", "Netlify"],
  },
  {
    accent: "#D9A03F",
    tag: "Tech lead",
    start: [2024, 10],
    end: [2025, 2],
    period: "Nov 2024 — Mar 2025",
    org: "Sunut Digital",
    place: "Kigali, Rwanda",
    title: "Tech Lead",
    context: "E-wallet platform for international monetary transactions",
    points: [
      "Led development of an e-wallet platform addressing Sudan's economic constraints.",
      "Managed agile delivery through Jira.",
      "Liaison between mobile, backend and architecture teams.",
      "Owned the lifecycle from ideation to deployment, accessibility-first.",
    ],
    stack: ["Team leadership", "Agile / Jira", "Payments", "Accessibility"],
  },
  {
    accent: "#E0709B",
    tag: "Full-stack",
    start: [2024, 2],
    end: [2024, 9],
    period: "Mar 2024 — Oct 2024",
    org: "Andariya Magazine",
    place: "East African bilingual platform",
    title: "Full-Stack Developer",
    context: "Publishing platform, Arabic and English",
    points: [
      "Integrated Strapi CMS to improve content workflows.",
      "Achieved an 89% performance improvement via image optimisation, caching and query tuning.",
      "Delivered a redesign, improved search, and migrated the legacy codebase.",
      "Front-end work on Nit3allam, an Odoo-based e-learning platform.",
    ],
    stack: ["Strapi CMS", "Next.js", "Performance", "Odoo"],
  },
  {
    accent: "#6FA8E8",
    tag: "Full-stack / lead",
    start: [2023, 8],
    end: [2023, 11],
    period: "Sep 2023 — Dec 2023",
    org: "Omdena",
    place: "EquiJob open-source AI project",
    title: "Full-Stack Developer / Tech Lead",
    context: "Fair-hiring AI platform",
    points: [
      "Led development of EquiJob using React.",
      "Built and deployed a custom ML REST API on Google Cloud.",
      "Collaborated with data scientists and designers, and ran usability testing.",
    ],
    stack: ["React", "Python", "Google Cloud", "ML API"],
  },
  {
    accent: "#D85A30",
    tag: "2023 · a personal chapter",
    personal: true,
    start: [2023, 3, 15],
    end: [2023, 7],
    period: "From 15 April 2023",
    org: "Rising from the ashes",
    place: "Sudan · personal",
    title: "Rising from the ashes",
    context: "Displaced from Khartoum — and back",
    chip: "Personal",
    prose:
      "On 15 April 2023, the war reached us. We took only what we could carry and left — our home, our belongings, a lifetime of memories — not knowing whether we'd ever return. My family and I moved to another city in Sudan and rebuilt ourselves there, through a lot of struggle. On 1 December 2024, I left the country altogether for Kigali, and started over once more. Twice now I've rebuilt from almost nothing — and each time I've come back steadier, and clearer about why I build.",
    points: [],
    stack: [],
  },
  {
    accent: "#7FC46A",
    tag: "Freelance",
    start: [2020, 0],
    end: [2023, 2],
    period: "Jan 2020 — Mar 2023",
    org: "Maxnet · SECS · Mashatta",
    place: "Khartoum, Sudan · Freelance",
    title: "Full-Stack Developer",
    context: "Contract work across telecoms, NGO and publishing",
    points: [
      "Built a client-complaint support portal with case tracking for Maxnet.",
      "Website and CMS for the environmental NGO SECS.",
      "Built Mashatta, a blogging platform for Sudanese feminist writers and activists.",
    ],
    stack: ["Laravel", "PHP", "MySQL", "Vue.js"],
  },
  {
    accent: "#A6A9A2",
    tag: "Frontend",
    start: [2019, 4],
    end: [2019, 11],
    period: "May 2019 — Dec 2019",
    org: "Tenchologya Co.",
    place: "Khartoum, Sudan",
    title: "Frontend Developer",
    context: "Digital services studio",
    points: [
      "Built and deployed a real-estate mobile application.",
      "Developed an admin dashboard for data management and analytics.",
      "Provided technical support including server configuration, minimising downtime.",
    ],
    stack: ["JavaScript", "Dashboards", "Mobile"],
  },
];
