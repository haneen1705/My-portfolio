import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { PawTrail } from "@/components/paw-trail";
import "./globals.css";

const newake = localFont({
  src: "../../public/fonts/NewakeFont-Demo.otf",
  variable: "--font-display",
  display: "swap",
});
const inter = localFont({
  src: [
    { path: "../../public/fonts/Inter-300.ttf", weight: "300" },
    { path: "../../public/fonts/Inter-400.ttf", weight: "400" },
    { path: "../../public/fonts/Inter-500.ttf", weight: "500" },
    { path: "../../public/fonts/Inter-600.ttf", weight: "600" },
  ],
  variable: "--font-body",
  display: "swap",
});
export const metadata: Metadata = {
  title: "Haneen Al-Metwally — Product Designer",
  description:
    "A little chaos. A lot of intention. The creative world of product designer Haneen Al-Metwally.",
};
export const viewport: Viewport = { themeColor: "#191918" };
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${newake.variable} ${inter.variable}`}>
      <body>
        {children}
        <PawTrail />
      </body>
    </html>
  );
}
