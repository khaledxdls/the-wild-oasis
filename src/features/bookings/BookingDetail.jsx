import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useBookingOnce } from "./useBookingOnce";
import { useNavigate } from "react-router-dom";
import { useCheckOut } from "../check-in-out/useCheckOut";
import Modal from "../../ui/Modal";
import { HiTrash } from "react-icons/hi2";
import ConfirmDelete from "../../ui/ConfirmDelete";

import { useDeletBooking } from "./useDeleteBooking";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const navigate = useNavigate();
  const moveBack = useMoveBack();
  const { deleteBookings, isDeliting } = useDeletBooking();
  const { booking, isLoading } = useBookingOnce();
  const { checkout, ischeckout } = useCheckOut();
  if (isLoading) return <Spinner> </Spinner>;
  if (!booking) return <Empty resource="booking"> </Empty>;
  const { status, id } = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1"> Booking# {id} </Heading>{" "}
          <Tag type={statusToTagName[status]}> {status.replace("-", " ")} </Tag>{" "}
        </HeadingGroup>{" "}
        <ButtonText onClick={moveBack}> & larr; Back </ButtonText>{" "}
      </Row>{" "}
      <BookingDataBox booking={booking} />{" "}
      <ButtonGroup>
        {" "}
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${id}`)}> Check in </Button>
        )}{" "}
        {status === "checked-in" && (
          <Button disabled={ischeckout} onClick={() => checkout(booking.id)}>
            Check Out{" "}
          </Button>
        )}{" "}
        <Modal>
          <Modal.Open opens="delete">
            <Button
              variations="danger"
              icon={<HiTrash> </HiTrash>}
              disabled={isDeliting}
            >
              Delete{" "}
            </Button>{" "}
          </Modal.Open>{" "}
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="booking"
              onConfirm={() => {
                deleteBookings(booking.id);
                navigate("/bookings");
              }}
            ></ConfirmDelete>{" "}
          </Modal.Window>{" "}
        </Modal>{" "}
        <Button onClick={moveBack}> Back </Button>{" "}
      </ButtonGroup>{" "}
    </>
  );
}

export default BookingDetail;
