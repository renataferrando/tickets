import React, { ReactNode } from "react";
import { PERMISSIONS } from "./permissionsMap";
import useGetRole from "../hooks/useGetRole";

type HasPermissionArgs = {
  permissions: string[];
  scopes: string[];
};

type Role = "User" | "Admin"

const hasPermission = ({ permissions, scopes }: HasPermissionArgs): boolean => {
  const scopesMap: Record<string, boolean> = {};
  scopes.forEach((scope) => {
    scopesMap[scope] = true;
  });

  return permissions.some((permission) => scopesMap[permission]);
};

type PermissionsCheckProps = {
  children: ReactNode;
  scopes?: string[];
};

export default function PermissionsCheck({ children, scopes = [] }: PermissionsCheckProps): JSX.Element {
  const role = useGetRole();
  const permissions = PERMISSIONS[role as Role] || [];

  const permissionGranted = hasPermission({ permissions, scopes });

  if (!permissionGranted) return <></>;

  return <>{children}</>;
}
