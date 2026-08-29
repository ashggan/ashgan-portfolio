export interface Deployment {
  title: string;
  accent: string;
  live: boolean;
  year: string;
  href: string;
  urlLabel: string;
  desc: string;
  tags: string[];
  filters: string[];
}

export const deployments: Deployment[] = [
  {
    title: "Anonymous AI support",
    accent: "#8B5FBF",
    live: true,
    year: "2025—now",
    href: "https://sophia.chat/secure-chat",
    urlLabel: "sophia.chat/secure-chat",
    desc: "Chat interface built from scratch — streaming responses, privacy-first UI, plus a live provider migration and Stripe donations.",
    tags: ["Product", "Interface", "AI"],
    filters: ["live", "ai"],
  },
  {
    title: "Encrypted storage",
    accent: "#1F8A7A",
    live: true,
    year: "2023—now",
    href: "https://sophia.chat/digital-safe",
    urlLabel: "sophia.chat/digital-safe",
    desc: "Evidence storage encrypted client-side before it reaches the server. Top contributor, maintainer, and lead on the 2026 UI rebuild.",
    tags: ["Security", "Frontend", "Maintainer"],
    filters: ["live", "security", "frontend"],
  },
  {
    title: "Bilingual publishing",
    accent: "#B4832F",
    live: true,
    year: "2024",
    href: "https://andariya.com/",
    urlLabel: "andariya.com",
    desc: "Strapi CMS integration across Arabic and English with an 89% performance improvement and a redesigned reading experience.",
    tags: ["CMS", "Performance"],
    filters: ["live"],
  },
  {
    title: "Open-source AI hiring",
    accent: "#C1553B",
    live: true,
    year: "2023",
    href: "https://omdena-equijob.netlify.app/",
    urlLabel: "omdena-equijob.netlify.app",
    desc: "Fair-hiring platform with a custom machine-learning REST API deployed on Google Cloud.",
    tags: ["AI", "API", "Open source"],
    filters: ["live", "ai"],
  },
  {
    title: "E-learning platform",
    accent: "#2F6BA8",
    live: true,
    year: "2024",
    href: "https://nit3allam.com/",
    urlLabel: "nit3allam.com",
    desc: "Responsive front end for an Odoo-based course platform, integrated with the Odoo backend across devices.",
    tags: ["Frontend", "Odoo"],
    filters: ["live", "frontend"],
  },
  {
    title: "Client operations",
    accent: "#6B7075",
    live: false,
    year: "2020—23",
    href: "",
    urlLabel: "maxnet · support portal",
    desc: "Complaint-handling portal with case tracking, built for a telecoms operator's support team.",
    tags: ["Laravel", "Internal tools"],
    filters: ["internal"],
  },
];
