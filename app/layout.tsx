import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import ClientProvider from "@/providers/ClientProvider"; // import new wrapper
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import Auth from "@/components/auth/Auth";

Amplify.configure(outputs);

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
        <Auth>
          <ClientProvider>
            <Header />
            {children}
          </ClientProvider>
        </Auth>
      </body>
    </html>
  );
}
