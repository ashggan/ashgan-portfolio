export interface NavItem {
  id: string;
  label: string;
  href: string;
  accent: string;
}

export const navItems: NavItem[] = [
  { id: "01", label: "Home", href: "#s-01", accent: "#378ADD" },
  { id: "02", label: "Experience", href: "#s-02", accent: "#7F77DD" },
  { id: "03", label: "Selected work", href: "#s-03", accent: "#1D9E75" },
  { id: "04", label: "Skills", href: "#s-04", accent: "#D4537E" },
  { id: "05", label: "Achievements", href: "#s-05", accent: "#BA7517" },
  { id: "06", label: "Education", href: "#s-06", accent: "#639922" },
  { id: "07", label: "Who am I", href: "#s-07", accent: "#D85A30" },
  { id: "08", label: "Contact", href: "#s-08", accent: "#0E8F7E" },
];
