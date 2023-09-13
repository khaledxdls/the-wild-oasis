import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { updateSetting } from "../../services/apiSettings";

export function useEditSettings() {
  const queryclient = useQueryClient();
  const { isLoading: isEditing, mutate: editSettings } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success("Settings Edited");
      queryclient.invalidateQueries({ queryKey: ["settings"] });
    },
  });
  return { isEditing, editSettings };
}
