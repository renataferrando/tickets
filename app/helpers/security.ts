/* eslint-disable no-return-assign */
import { GetTokenSilentlyOptions } from "@auth0/auth0-react";

let getAccessTokenSilently: (
  options?: GetTokenSilentlyOptions | undefined
) => Promise<string>;

export const getToken = {
  getAccessTokenSilently: () => getAccessTokenSilently,
  setAccessTokenSilently: (
    func: (options?: GetTokenSilentlyOptions | undefined) => Promise<string>
  ) => (getAccessTokenSilently = func)
};
