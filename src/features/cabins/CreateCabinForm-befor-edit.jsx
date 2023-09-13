import styled from "styled-components";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";

import {
  useIsMutating,
  useMutation,
  useQueries,
  useQueryClient,
} from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import FormRow from "../../ui/FormRow";

function CreateCabinForm() {
  const queryclient = useQueryClient();
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;
  const { isLoading, mutate } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("Cabin Deleted");
      queryclient.invalidateQueries({ queryKey: ["cabin"] });
      reset();
    },
  });

  function onSubmit(data) {
    const newCabin = {
      name: data.name,
      maxCapacity: data.maxCapacity,
      regularPrice: data.regularPrice,
      discount: data.discount,
      description: data.description,
      image: data.image[0],
    };
    mutate(newCabin);
  }
  function onError(error) {
    console.log(error);
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="name" errors={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "this filed is required" })}
        />
      </FormRow>
      <FormRow label="maxCapacity" errors={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
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
          accept="image/*"
          {...register("image")}
        />
      </FormRow>
      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isLoading}> Add cabin </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
