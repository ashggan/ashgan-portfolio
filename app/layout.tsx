import type { Metadata, Viewport } from "next";
import { Manrope, IBM_Plex_Mono, Newsreader } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ashgan Mustafa — Senior Full-Stack Engineer",
  description:
    "I build, ship, and keep systems running — this one included. Ashgan Mustafa, senior full-stack engineer in Kigali, Rwanda.",
};

export const viewport: Viewport = {
  themeColor: "#0F1214",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${plexMono.variable} ${newsreader.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if('scrollRestoration' in history){history.scrollRestoration='manual';}window.scrollTo(0,0);}catch(e){}`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
