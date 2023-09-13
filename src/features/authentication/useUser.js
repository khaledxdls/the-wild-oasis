import { useQuery } from "@tanstack/react-query";
import { getCurrUser } from "../../services/apiAuth";

export function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrUser,
  });
  console.log(user, "hhhhhhhhhhhhhhhhhzaeezazeazaezeazeaz");
  return { isLoading, user, isAuth: user?.role === "authenticated" };
}
