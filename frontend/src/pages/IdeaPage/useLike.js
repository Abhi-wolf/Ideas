import { likeIdea as likeIdeaApi } from "@/services/apiIdea";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useLike() {
  const queryClient = useQueryClient();

  const {
    mutate: likeIdea,
    isPending,
    error,
  } = useMutation({
    mutationFn: likeIdeaApi,
    onSuccess: () => {
      queryClient.invalidateQueries("ideas");
    },
  });
  return { likeIdea, isPending, error };
}
