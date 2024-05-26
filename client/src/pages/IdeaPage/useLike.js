import { likeIdea as likeIdeaApi } from "@/services/apiIdea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import io from "socket.io-client";
const socketUrl = import.meta.env.VITE_SOCKET_URL;

const socket = io(socketUrl);

export function useLike() {
  const queryClient = useQueryClient();

  const {
    mutate: likeIdea,
    isPending,
    error,
  } = useMutation({
    mutationFn: likeIdeaApi,
  });

  // LIKE EVENT
  // useEffect(() => {
  //   socket.on("likeUpdate", (data) => {
  //     const prev = queryClient.getQueryData(["idea", data?.ideaId]);

  //     if (prev) {
  //       const newData = { ...prev, likes: data.likes };
  //       queryClient.setQueryData(["idea", data?.ideaId], newData);
  //     }
  //   });

  //   // Clean up the socket listener on unmount
  //   return () => {
  //     socket.off("likeUpdate");
  //   };
  // }, [queryClient]);

  return { likeIdea, isPending, error };
}
