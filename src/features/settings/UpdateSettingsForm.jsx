import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useEditSettings } from "./useEditSettings";
import { useSettings } from "./useSettings";

function UpdateSettingsForm() {
  const {
    data: {
      minBookingsLength,
      maxBookingsLength,
      maxGuestsPlace,
      breakfastPrice,
    } = {},
    isLoading,
  } = useSettings();

  const { isEditing, editSettings } = useEditSettings();
  // return <Spinner />;
  if (isLoading) return <Spinner />;

  function handleBlur(e, field) {
    const { value } = e.target;

    if (!value) return;
    editSettings({
      [field]: value,
    });
  }

  // This time we are using UNCONTROLLED fields, so we will NOT store state
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          defaultValue={minBookingsLength}
          onBlur={(e) => handleBlur(e, "minBookingsLength")}
          disabled={isEditing}
          id="min-nights"
        />
      </FormRow>{" "}
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          defaultValue={maxBookingsLength}
          onBlur={(e) => handleBlur(e, "maxBookingsLength")}
          disabled={isEditing}
          id="max-nights"
        />
      </FormRow>{" "}
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          defaultValue={maxGuestsPlace}
          onBlur={(e) => handleBlur(e, "maxGuestsPlace")}
          disabled={isEditing}
          id="max-guests"
        />
      </FormRow>{" "}
      <FormRow label="Breakfast price">
        <Input
          type="number"
          defaultValue={breakfastPrice}
          onBlur={(e) => handleBlur(e, "breakfastPrice")}
          disabled={isEditing}
          id="breakfast-price"
        />
      </FormRow>{" "}
    </Form>
  );
}

export default UpdateSettingsForm;
