/* eslint-disable */
 // @ts-nocheck 


import { useAuth0 } from "@auth0/auth0-react";

export const useAuthHandler = () => {
  const { getAccessTokenSilently, loginWithRedirect } = useAuth0();

  const handleSilentAuthError = async () => {
    try {
      // Intenta renovar el token silenciosamente
      await getAccessTokenSilently();
    } catch (error) {
      // Maneja el error de consentimiento
      if (error.error === "consent_required") {
        console.log("Redirecting to login for consent...");
        await loginWithRedirect({
          prompt: "consent", // Forzar consentimiento explícito
        });
      }
    }
  };

  return { handleSilentAuthError };
};
