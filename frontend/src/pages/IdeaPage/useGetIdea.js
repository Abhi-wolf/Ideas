import { getIdea } from "@/services/apiIdea";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export function useGetIdea() {
  const { id } = useParams();

  const {
    data: idea,
    isPending,
    error,
  } = useQuery({
    queryKey: ["idea", id],
    queryFn: () => getIdea({ id }),
  });
  return { idea, error, isPending };
}
