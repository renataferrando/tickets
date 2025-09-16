"use client";

import "./globals.css";
import "lenis/dist/lenis.css";
import { Auth0 } from "@/app/helpers/auth0";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import TokenProvider from "./components/token-wrapper";
import { usePathname } from "next/navigation";
import localFont from "next/font/local";

const neoSans = localFont({
  src: [
    {
      path: "./fonts/NeoSansProMedium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/NeoSansProRegular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/NeoSansProBold.woff",
      weight: "700",
      style: "extrabold",
    },
    {
      path: "./fonts/NeoSansProLight.woff",
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
  const bgColor = (() => {
    if (pathname === "/" || pathname === "/events") return "bg-hero-pattern";
    if (pathname.startsWith("/events/category/")) return "bg-hero-pattern";
    return "bg-gray-50";
  })();

  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" />
      </head>
      <Provider store={store}>
        <body
          className={`${bgColor} text-white duration-500 ${neoSans.className} overflow-hidden !overflow-hidden`}
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
