import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export function useCheckin() {
  const queryclient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkin, isLoading: ischeckin } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: (data) => {
      toast.success(`Booking # ${data.id} confirmed`);
      queryclient.invalidateQueries({ active: true });
      navigate("/");
    },
    onError: () => toast.error("filed"),
  });

  return { checkin, ischeckin };
}
