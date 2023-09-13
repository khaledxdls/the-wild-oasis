import Button from "../../ui/Button";
import { useCheckOut } from "./useCheckOut";

function CheckoutButton({ bookingId }) {
  const { ischeckout, checkout } = useCheckOut();
  return (
    <Button
      variations="primary"
      sizes="small"
      onClick={() => checkout(bookingId)}
      disabled={ischeckout}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
