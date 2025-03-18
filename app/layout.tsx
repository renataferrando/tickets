"use client";

import "./globals.css";
import { Auth0 } from "@/app/helpers/auth0";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import TokenProvider from "./components/token-wrapper";
import { usePathname } from "next/navigation";
import localFont from "next/font/local";
import clsx from "clsx";

const neoSans = localFont({
  src: [
    {
      path: "./fonts/NeoSansProMedium.OTF",
      weight: "600",
      style: "semibold",
    },
    {
      path: "./fonts/NeoSansProRegular.OTF",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/NeoSansProBold.OTF",
      weight: "700",
      style: "extrabold",
    },
    {
      path: "./fonts/NeoSansProLight.OTF",
      weight: "200",
      style: "thin",
    },
  ],
});

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // Definir colores por página
  const bgColor = clsx(
    {
      "/events": "bg-sky-800",
      "/": "bg-hero-pattern",
    }[pathname] || "bg-gray-50"
  );

  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" />
      </head>
      <Provider store={store}>
        <body
          className={`${bgColor} duration-500 ${neoSans.className} overflow-hidden !overflow-hidden`}
        >
          <UserProvider>
            <Auth0>
              <TokenProvider>{children}</TokenProvider>
            </Auth0>
          </UserProvider>
        </body>
      </Provider>
    </html>
  );
}
export default RootLayout;
