import { login as loginApi } from "@/services/apiAuth";
import { useMutation } from "@tanstack/react-query";

export function useLogin() {
  const {
    mutate: login,
    isPending,
    error,
  } = useMutation({
    mutationFn: loginApi,
  });
  return { login, isPending, error };
}
