import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RAV AI",
  description:
    "Plataforma inteligente para elaboração de Registros de Avaliação Formativa (RAV) — copiloto pedagógico do professor.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
