"use client";

import { ReactNode, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { getToken } from "@/app/helpers/security";

interface Props {
  children: ReactNode;
}

const TokenProvider = ({ children }: Props) => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  getToken.setAccessTokenSilently(getAccessTokenSilently);

  useEffect(() => {
    if (isAuthenticated) {
      getToken.setAccessTokenSilently(getAccessTokenSilently);
    }
  }, [getAccessTokenSilently, isAuthenticated]);

  return <>{children}</>;
};

export default TokenProvider;
