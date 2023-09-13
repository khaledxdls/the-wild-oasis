import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";

import { useBookingOnce } from "../bookings/useBookingOnce";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { isLoading: isSettings, data } = useSettings();
  const { checkin, ischeckin } = useCheckin();
  const moveBack = useMoveBack();
  const { isLoading, booking } = useBookingOnce();
  useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking]);
  if (isLoading || isSettings) return <Spinner> </Spinner>;
  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfastPrice = data.breakfastPrice * numGuests * numNights;
  function handleCheckin() {
    if (!confirmPaid) return;
    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  }
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1"> Check in booking# {bookingId} </Heading>{" "}
        <ButtonText onClick={moveBack}> &larr; Back </ButtonText>{" "}
      </Row>{" "}
      <BookingDataBox booking={booking} />{" "}
      <Box>
        {" "}
        <Checkbox
          checked={confirmPaid}
          disabled={confirmPaid || ischeckin}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
        >
          I confim that {guests.fullName} has paid the total amount{" "}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : formatCurrency(totalPrice + optionalBreakfastPrice)}
        </Checkbox>
      </Box>
      {hasBreakfast && (
        <Box>
          <Checkbox
            id="breakfast"
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((breakfast) => !breakfast);
              setConfirmPaid(false);
            }}
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}
          </Checkbox>
        </Box>
      )}
      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || ischeckin}>
          {" "}
          Check in booking# {bookingId}{" "}
        </Button>{" "}
        <Button variation="secondary" onClick={moveBack}>
          Back{" "}
        </Button>{" "}
      </ButtonGroup>{" "}
    </>
  );
}

export default CheckinBooking;
