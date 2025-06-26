import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import ClientProvider from "@/providers/ClientProvider"; // import new wrapper

export const metadata: Metadata = {
  title: "HeroFAQ",
  description: "A simple FAQ management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientProvider>
          <Header />
          {children}
        </ClientProvider>
      </body>
    </html>
  );
}
