import { getIdeas } from "@/services/apiIdea";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import io from "socket.io-client";
const socketUrl = import.meta.env.VITE_SOCKET_URL;

const socket = io(socketUrl);
export function useGetIdeas() {
  const queryClient = useQueryClient();
  const {
    data: Ideas,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["ideas"],
    queryFn: getIdeas,
  });

  // LIKE EVENT
  useEffect(() => {
    socket.on("likeUpdate", (data) => {
      const previousData = queryClient.getQueryData(["ideas"]);

      if (!previousData) {
        console.log("Previous data not found or not an array.");
        return;
      }

      const updatedData = previousData.map((idea) =>
        idea._id === data.ideaId ? { ...idea, likes: data.likes } : idea
      );

      queryClient.setQueryData(["ideas"], updatedData);
    });

    // Clean up the socket listener on unmount
    return () => {
      socket.off("likeUpdate");
    };
  }, [queryClient]);

  // VISIT EVENT
  useEffect(() => {
    socket.on("visitUpdate", (data) => {
      const previousData = queryClient.getQueryData(["ideas"]);

      if (!previousData) {
        console.log("Previous data not found or not an array.");
        return;
      }

      const updatedData = previousData.map((idea) =>
        idea._id === data.id ? { ...idea, views: data?.idea?.views } : idea
      );

      queryClient.setQueryData(["ideas"], updatedData);
    });

    return () => {
      socket.off("visitUpdate");
    };
  }, [queryClient]);

  // COMMENT EVENT
  useEffect(() => {
    socket.on("newComment", (data) => {
      const previousData = queryClient.getQueryData(["ideas"]);

      if (!previousData) {
        console.log("Previous data not found");
        return;
      }

      const updatedData = previousData.map((idea) =>
        idea._id === data.ideaId ? { ...idea, comments: data.comments } : idea
      );
      queryClient.setQueryData(["ideas"], updatedData);
    });

    return () => {
      socket.off("newComment");
    };
  }, [queryClient]);

  return { Ideas, error, isLoading };
}
