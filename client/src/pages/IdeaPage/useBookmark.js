import { bookMarkIdea as bookMarkIdeaApi } from "@/services/apiIdea";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useBookmark() {
  const queryClient = useQueryClient();

  const {
    mutate: bookMarkIdea,
    isPending,
    error,
  } = useMutation({
    mutationFn: bookMarkIdeaApi,
    onSuccess: () => {
      queryClient.invalidateQueries("bookmarks");
    },
  });
  return { bookMarkIdea, isPending, error };
}
