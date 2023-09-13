import styled from "styled-components";
import { useRecentBookings } from "./useRecentBooking";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";
import Stats from "./Stats";
import { useCabin } from "../cabins/useCabin";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { isLoading, bookings, numDays } = useRecentBookings();
  const { isLoading: isStays, confirmStays } = useRecentStays();
  const { cabin, isLoading: isLoading3 } = useCabin();
  if (isLoading || isStays || isLoading3) return <Spinner></Spinner>;
  console.log(bookings, "khaled");
  console.log(confirmStays, "youcef");
  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmStays}
        numDays={numDays}
        cabinCount={cabin.length}
      ></Stats>
      <TodayActivity></TodayActivity>
      <DurationChart confirmedStays={confirmStays}></DurationChart>
      <SalesChart bookings={bookings} numDays={numDays}></SalesChart>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
