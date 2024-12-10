"use client";
import { Auth0Provider } from "@auth0/auth0-react";
import Router from "next/router";

const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID;
const domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN;
const redirectUri = process.env.NEXT_PUBLIC_AUTH0_CALLBACK_URL;
const scope = process.env.NEXT_PUBLIC_AUTH0_API_SCOPE;
const audience = process.env.NEXT_PUBLIC_AUTH0_API_AUDIENCE;

console.log(clientId);

export const Auth0 = ({ children }) => {
  if (!(domain && clientId && redirectUri)) {
    console.log("this if");
    return null;
  }

   const onRedirectCallback = (appState) => {

    console.log("appState")
    const redirectTarget = '/';
    console.log('Redirecting to:', redirectTarget); // Debugging
    Router.replace(redirectTarget);
   };
  

  console.log(redirectUri);
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}

      onRedirectCallback={onRedirectCallback}
      authorizationParams={{
        redirect_uri: redirectUri,
        audience: audience,
        scope: scope

      }}
    >
      {children}
    </Auth0Provider>
  );
};
