import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat";
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  const numBookings = bookings.length;
  const sales = bookings.reduce((acc, curr) => acc + curr.totalPrice, 0);

  const checkins = confirmedStays.length;
  const occupation =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * cabinCount);
  return (
    <>
      <Stat
        title="bookings"
        color="blue"
        icon={<HiOutlineBriefcase></HiOutlineBriefcase>}
        value={numBookings}
      ></Stat>
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes></HiOutlineBanknotes>}
        value={formatCurrency(sales)}
      ></Stat>
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays></HiOutlineCalendarDays>}
        value={checkins}
      ></Stat>
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar></HiOutlineChartBar>}
        value={Math.round(occupation * 100) + "%"}
      ></Stat>
    </>
  );
}

export default Stats;
