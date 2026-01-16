import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["200", "400", "600", "800"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "500", "700"],
});

export const metadata: Metadata = {
  title: "Super Checkout .app | Performance Imbatível",
  description: "Plataforma de checkout de alta performance com gestão completa de vendas digitais",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${plusJakarta.variable} ${spaceGrotesk.variable} font-sans`} style={{ fontFamily: 'var(--font-plus-jakarta)' }}>
        <div className="bg-gradient-noise" />
        {children}
      </body>
    </html>
  );
}
