import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";

export function useCheckOut() {
  const queryclient = useQueryClient();

  const { mutate: checkout, isLoading: ischeckout } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`Booking # ${data.id} checkout`);
      queryclient.invalidateQueries({ active: true });
    },
    onError: () => toast.error("filed"),
  });

  return { checkout, ischeckout };
}
