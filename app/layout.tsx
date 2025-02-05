"use client";

import "./globals.css";
import { Auth0 } from "@/app/helpers/auth0";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import localFont from "next/font/local";
import gsap from "gsap";
const NeoSansPro = localFont({
  src: [
    { path: "../app/fonts/NeoSansProMedium.otf", weight: "500" },
    { path: "../app/fonts/NeoSansProLight.otf", weight: "100" },
    { path: "../app/fonts/NeoSansProRegular.otf", weight: "400" },
  ],
  variable: "--font-neo-sans",
});

const ProtoMono = localFont({
  src: [
    { path: "../app/fonts/ProtoMono-Light.woff", weight: "200" },
    { path: "../app/fonts/ProtoMono-Regular.woff", weight: "400" },
  ],
  variable: "--font-proto-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

gsap.config({
  nullTargetWarn: false,
});

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.cdnfonts.com/css/neo-sans-pro"
          rel="stylesheet"
        />
      </head>
      <Provider store={store}>
        <body className={`${NeoSansPro.variable} overflow-hidden`}>
          <UserProvider>
            <Auth0> {children}</Auth0>
          </UserProvider>
        </body>
      </Provider>
    </html>
  );
}
export default RootLayout;
