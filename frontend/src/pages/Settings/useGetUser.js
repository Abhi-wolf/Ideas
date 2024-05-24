import { useAuth } from "@/context/userContext";
import { getUserDetails } from "@/services/apiUser";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export function useGetUser() {
  //   const { userId } = useAuth();
  const { id } = useParams();

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUserDetails({ id }),
  });

  return { user, isLoading, error };
}
