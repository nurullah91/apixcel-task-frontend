import "@/src/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { fontSans } from "../config/fonts";

import { Providers } from "./providers";

import { Navbar } from "@/src/components/navbar";

export const metadata: Metadata = {
  title: {
    default: "APIXcel",
    template: "APIXcel",
  },
  description:
    "APIXcel project is for manage and discover e-commerce product with login signup, reset, and forget password functionality",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen">
            <Navbar />
            <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
