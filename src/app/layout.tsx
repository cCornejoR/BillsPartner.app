import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientWrapper from "./ClientWrapper";
import MobileWrapper from "@/components/MobileWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CoupleFinance - Gestión de Gastos en Pareja",
  description: "Una hermosa aplicación para gestionar gastos, planes de compras y objetivos financieros en pareja",
  viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className={inter.className}>
        <MobileWrapper>
          <div className="min-h-screen bg-gradient-secondary">
            <ClientWrapper />
          </div>
        </MobileWrapper>
      </body>
    </html>
  );
}
