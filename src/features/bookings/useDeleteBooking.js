import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDeletBooking() {
  const queryclient = useQueryClient();
  const { mutate: deleteBookings, isLoading: isDeliting } = useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      toast.success("bookings Deleted");
      queryclient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { deleteBookings, isDeliting };
}
