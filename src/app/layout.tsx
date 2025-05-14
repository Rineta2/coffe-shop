import { metadata } from "@/base/meta/meta";

export { metadata };

import "./globals.css";

import { ThemeModeScript } from 'flowbite-react';

import Providers from "@/base/router/Provider";

import Pathname from "@/base/router/Pathname";

metadata.manifest = "/manifest.json";

import { playfairDisplay, poppins } from "@/base/fonts/Fonts";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <ThemeModeScript />
      </head>
      <body
        className={`${playfairDisplay.variable} ${poppins.variable} antialiased`}
      >
        <Providers>
          <Pathname>
            {children}
          </Pathname>
        </Providers>
      </body>
    </html>
  );
}