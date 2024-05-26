import { addIdea as addIdeaApi } from "@/services/apiIdea";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useAddIdea() {
  const queryClient = useQueryClient();

  const {
    mutate: addIdea,
    isPending,
    error,
  } = useMutation({
    mutationFn: addIdeaApi,
    onSuccess: () => {
      queryClient.invalidateQueries("ideas");
    },
  });
  return { addIdea, isPending, error };
}
