/* eslint-disable */
 // @ts-nocheck 

import axios from "axios";

export async function getServerSideAccessToken() {

  const clientSecret = process.env.AUTH0_CLIENT_SECRET; // Machine-to-Machine app's client secret
  const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID;
  const domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN;
  const audience = process.env.NEXT_PUBLIC_AUTH0_API_AUDIENCE;

  try {
    const response = await axios.post(`https://${domain}/oauth/token`, {
      client_id: clientId,
      client_secret: clientSecret,
      audience: audience,
      grant_type: "client_credentials",
    });

    return response.data.access_token; // The access token
  } catch (error) {
    console.error(
      "Error fetching Auth0 access token:",
      error.response?.data || error.message
    );
    throw new Error("Failed to fetch Auth0 access token");
  }
}
