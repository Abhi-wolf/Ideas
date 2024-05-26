import { comment } from "@/services/apiIdea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { io } from "socket.io-client";
const socketUrl = import.meta.env.VITE_SOCKET_URL;

const socket = io(socketUrl);

export function useAddComment() {
  const queryClient = useQueryClient();

  const {
    mutate: addComment,
    isPending,
    error,
  } = useMutation({
    mutationFn: comment,
  });

  useEffect(() => {
    socket.on("newComment", (data) => {
      const prev = queryClient.getQueryData(["idea", data?.ideaId]);

      if (prev) {
        const newData = { ...prev, comments: data?.comments };
        queryClient.setQueryData(["idea", data?.ideaId], newData);
      }
    });

    return () => {
      socket.off("newComment");
    };
  }, [queryClient]);

  return { addComment, isPending, error };
}
