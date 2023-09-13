import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateCabin() {
  const queryclient = useQueryClient();
  const { isLoading, mutate: addCabin } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("Cabin added");
      queryclient.invalidateQueries({ queryKey: ["cabin"] });
    },
  });

  return { isLoading, addCabin };
}
