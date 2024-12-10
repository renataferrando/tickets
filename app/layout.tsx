"use client";

import localFont from "next/font/local";

import "./globals.css"
import { Auth0 } from "@/helpers/auth0";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { useAuth0 } from "@auth0/auth0-react";
import { getToken } from "@/helpers/security";

const NeoSansPro = localFont({
  src: [
    { path: "../app/fonts/NeoSansProMedium.otf", weight: "500" },
    { path: "../app/fonts/NeoSansProLight.otf", weight: "100" },
    { path: "../app/fonts/NeoSansProRegular.otf", weight: "400" },
  ],
  variable: "--font-neo-sans",
});
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <Provider store={store}>
        <body
          className={`${NeoSansPro.className} h-[100vh] overflow-hidden m-[0_auto] lg:max-w-[90rem]`}
        >
          <main>
            <UserProvider>
              <Auth0> {children}</Auth0>
            </UserProvider>
          </main>
        </body>
      </Provider>
    </html>
  );
}
export default RootLayout;
