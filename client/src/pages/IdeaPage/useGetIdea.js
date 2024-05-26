import { getIdea } from "@/services/apiIdea";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import io from "socket.io-client";
const socketUrl = import.meta.env.VITE_SOCKET_URL;

const socket = io(socketUrl);

export function useGetIdea() {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const {
    data: idea,
    isPending,
    error,
  } = useQuery({
    queryKey: ["idea", id],
    queryFn: () => getIdea({ id }),
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

      const prev = queryClient.getQueryData(["idea", data?.ideaId]);

      if (prev) {
        const newData = { ...prev, likes: data.likes };
        queryClient.setQueryData(["idea", data?.ideaId], newData);
      }

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

      const prev = queryClient.getQueryData(["idea", data?.id]);

      if (prev) {
        const newData = { ...prev, views: data?.idea?.views };
        queryClient.setQueryData(["idea", data?.id], newData);
      }

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

      const prev = queryClient.getQueryData(["idea", data?.ideaId]);

      if (prev) {
        const newData = { ...prev, comments: data?.comments };
        queryClient.setQueryData(["idea", data?.ideaId], newData);
      }

      queryClient.setQueryData(["ideas"], updatedData);
    });

    return () => {
      socket.off("newComment");
    };
  }, [queryClient]);

  return { idea, error, isPending };
}
