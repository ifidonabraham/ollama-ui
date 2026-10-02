import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ollama UI",
  description: "Local AI chat interface for Ollama models",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" style={{ height: "100%" }}>
      <body style={{ height: "100%", margin: 0 }}>{children}</body>
    </html>
  );
}
