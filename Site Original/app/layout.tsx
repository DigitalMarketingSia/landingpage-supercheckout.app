import type { Metadata } from "next";
import { Outfit, Montserrat } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Super Checkout .app | Performance Imbatível",
  description: "Plataforma de checkout de alta performance com gestão completa de vendas digitais",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${outfit.variable} ${montserrat.variable} font-sans`} style={{ fontFamily: 'var(--font-outfit)' }}>
        <div className="bg-gradient-noise" />
        {children}
      </body>
    </html>
  );
}
