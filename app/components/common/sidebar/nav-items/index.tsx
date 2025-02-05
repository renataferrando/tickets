import PermissionsCheck from "@/app/helpers/permissionCheck";
import { SCOPES } from "@/app/helpers/permissionsMap";
import Link from "next/link";
import { Box } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";

const NavItems = () => {
  const { logout } = useAuth0();
  return (
    <div className="flex flex-col h-[70%] w-full pl-20 justify-center gap-8">
      <Box className="flex items-center gap-4 cursor-pointer">
        <span className="text-xs font-semibold">01.</span>

        <p className="text-4xl">My account</p>
      </Box>

      <Box className="flex items-center gap-2 cursor-pointer">
        <span className="text-xs font-semibold">02.</span>
        <p className="text-4xl">Orders</p>
      </Box>
      <PermissionsCheck scopes={[SCOPES.onlyAdmin]}>
        <Box className="flex items-center gap-2 cursor-pointer">
          <span className="text-xs font-semibold">03.</span>
          <Link href="/my-events" className="text-4xl">
            My events
          </Link>
        </Box>
      </PermissionsCheck>
      <Box
        className="flex items-center gap-2 cursor-pointer"
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
      >
        <span className="text-xs font-semibold">00.</span>
        <p className="text-4xl">Log out</p>
      </Box>
    </div>
  );
};

export default NavItems;
