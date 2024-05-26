import { useAuth } from "@/context/userContext";
import { getBookMarks } from "@/services/apiIdea";
import { useQuery } from "@tanstack/react-query";

export function useGetBookMarks() {
  const { userName } = useAuth();

  const {
    data: bookmarks,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookmarks"],
    queryFn: () => getBookMarks({ userName }),
  });
  return { bookmarks, error, isLoading };
}
