import { getIdeas } from "@/services/apiIdea";
import { useQuery } from "@tanstack/react-query";

export function useGetIdeas() {
  const {
    data: Ideas,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["ideas"],
    queryFn: getIdeas,
  });
  return { Ideas, error, isLoading };
}
