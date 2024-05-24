import { comment } from "@/services/apiIdea";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useAddComment() {
  const queryClient = useQueryClient();

  const {
    mutate: addComment,
    isPending,
    error,
  } = useMutation({
    mutationFn: comment,
    onSuccess: () => {
      queryClient.invalidateQueries("ideas");
    },
  });
  return { addComment, isPending, error };
}
