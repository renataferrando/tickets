import { useGetProfileQuery } from "@/services/userService";

const useGetRole = () => {
  const { data: user } = useGetProfileQuery(null);
  const role = user?.user.role;
  return role || "";
};

export default useGetRole;
