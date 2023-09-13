import { useForm } from "react-hook-form";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

function CreateCabinForm({ cabinEdit = {}, onClose }) {
  const { id: editId, ...editValues } = cabinEdit;
  const isEdit = Boolean(editId);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEdit ? editValues : {},
  });
  const { errors } = formState;
  const { isLoading, addCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();
  const isWorking = isLoading || isEditing;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEdit)
      editCabin(
        { cabinData: { ...data, image }, id: editId },
        {
          onSuccess: (data) => {
            reset();
            onClose?.();
          },
        }
      );
    else
      addCabin(
        { ...data, image: image },
        {
          onSuccess: (data) => {
            reset();
            onClose?.();
          },
        }
      );
  }
  function onError(error) {
    console.log(error);
  }
  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onClose ? "modal" : "regular"}
    >
      <FormRow label="name" errors={errors?.name?.message}>
        <Input
          type="text"
          disabled={isWorking}
          id="name"
          {...register("name", { required: "this filed is required" })}
        />
      </FormRow>
      <FormRow label="maxCapacity" errors={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "this filed is required",
            min: { value: 1, message: "capacity low" },
          })}
        />
      </FormRow>
      <FormRow label="regularPrice" errors={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "this filed is required",
            min: { value: 1, message: "capacity low" },
          })}
        />
      </FormRow>
      <FormRow label="discount" errors={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isWorking}
          {...register("discount", {
            required: "this filed is required",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount should be less then Price",
          })}
        />
      </FormRow>
      <FormRow label="description" errors={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          disabled={isWorking}
          defaultValue=""
          {...register("description", {
            required: "this filed is required",
          })}
        />
      </FormRow>
      <FormRow label="image" errors={errors?.image?.message}>
        <FileInput
          id="image"
          type="file"
          disabled={isWorking}
          accept="image/*"
          {...register("image", {
            required: isEdit ? false : "this filed is required",
          })}
        />
      </FormRow>
      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={() => onClose?.()}>
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {" "}
          {!isEdit ? " Add cabin" : "Edit cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
