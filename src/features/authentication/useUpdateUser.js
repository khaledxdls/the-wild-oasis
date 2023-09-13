import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryclient = useQueryClient();
  const { isLoading: isUpdating, mutate: updateuser } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: () => {
      toast.success("User Edited");
      queryclient.invalidateQueries({ queryKey: ["user"] });
    },
  });
  return { isUpdating, updateuser };
}
