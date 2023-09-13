import Button from "../../ui/Button";

import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";
function AddCabin() {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button>Add New Cabin</Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm></CreateCabinForm>
      </Modal.Window>
    </Modal>
  );
}

export default AddCabin;

// function AddCabin() {
//   const [isOpenModel, setisOpenModel] = useState(false);
//   return (
//     <div>
//       <Button onClick={() => setisOpenModel(!isOpenModel)}>
//         {" "}
//         Add new cabin{" "}
//       </Button>{" "}
//       {isOpenModel && (
//         <Modal onClose={() => setisOpenModel(false)}>
//           <CreateCabinForm
//             onClose={() => setisOpenModel(false)}
//           ></CreateCabinForm>{" "}
//         </Modal>
//       )}{" "}
//     </div>
//   );
// }

// export default AddCabin;
