import { updateUserDetail } from "@/services/apiUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const {
    mutate: updateUser,
    isPending,
    error,
  } = useMutation({
    mutationFn: updateUserDetail,
    onSuccess: () => {
      queryClient.invalidateQueries("user");
    },
  });

  return { updateUser, isPending, error };
}
