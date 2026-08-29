export interface Cert {
  color: string;
  title: string;
  issuer: string;
  href: string;
}

export const certs: Cert[] = [
  {
    color: "#D85A30",
    title: "Using AI to Balance Bias in Job Descriptions",
    issuer: "EquiJob · Nov 2023",
    href: "https://verified.sertifier.com/en/verify/04226682041931/",
  },
  {
    color: "#1D9E75",
    title: "Full-Stack JavaScript Developer Nanodegree",
    issuer: "Udacity · Feb 2023",
    href: "https://www.udacity.com/certificate/XJFGNUKH",
  },
  {
    color: "#378ADD",
    title: "Applied Scrum for Agile Project Management",
    issuer: "edX · Sep 2022",
    href: "https://courses.edx.org/certificates/80b501cc7c344c8c856d40a30966d9a2",
  },
];
