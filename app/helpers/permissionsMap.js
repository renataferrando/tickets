import { ADMIN, USER } from "../variables/roles"

export const SCOPES = {
  onlyAdmin: "only-admin",
  onlyUser: "only-user",
};

export const PERMISSIONS = {
  [USER]: [SCOPES.onlyUser],
  [ADMIN]: [SCOPES.onlyAdmin],
};
