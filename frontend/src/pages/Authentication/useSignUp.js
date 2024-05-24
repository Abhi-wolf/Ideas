import { signUp as signUpApi } from "@/services/apiAuth";
import { useMutation } from "@tanstack/react-query";

export function useSignUp() {
  const {
    mutate: signUp,
    isPending,
    error,
  } = useMutation({
    mutationFn: signUpApi,
  });
  return { signUp, isPending, error };
}
