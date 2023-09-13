import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabin } from "./useCabin";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
  const { isLoading, cabin } = useCabin();
  const [searchParams] = useSearchParams();
  if (isLoading) return <Spinner> </Spinner>;
  //FILTER
  const filterValue = searchParams.get("discount") || "all";
  let filterCabin;
  if (filterValue === "all") filterCabin = cabin;
  if (filterValue === "no-discount")
    filterCabin = cabin.filter((cabin) => cabin.discount === 0);
  if (filterValue === "with-discount")
    filterCabin = cabin.filter((cabin) => cabin.discount > 0);
  //SORTBY

  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [filed, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filterCabin.sort(
    (a, b) => (a[filed] - b[filed]) * modifier
  );
  console.log(modifier);
  console.log(filed, direction);
  console.log(sortedCabins);
  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header role="row">
          <div> </div> <div> cabin </div> <div> capacity </div>{" "}
          <div> Price </div> <div> Discount </div> <div> </div>{" "}
        </Table.Header>{" "}
        <Table.Body
          data={sortedCabins}
          render={(cabin) => (
            <CabinRow cabin={cabin} key={cabin.id}>
              {" "}
            </CabinRow>
          )}
        />{" "}
      </Table>{" "}
    </Menus>
  );
}

export default CabinTable;
