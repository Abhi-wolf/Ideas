import { logout as logoutApi } from "@/services/apiAuth";
import { useMutation } from "@tanstack/react-query";

export function useLogout() {
  const {
    mutate: logout,
    isPending,
    error,
  } = useMutation({
    mutationFn: logoutApi,
  });
  return { logout, isPending, error };
}
