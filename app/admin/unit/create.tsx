import {
  Create,
  NumberInput,
  ReferenceInput,
  SimpleForm,
  TextInput,
  required,
} from "react-admin";

const requiredValidation = [required()];

export const UnitCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="title" validate={requiredValidation} label="Title" />
        <TextInput
          source="description"
          validate={requiredValidation}
          label="Description"
        />
        <ReferenceInput source="courseId" reference="courses" />
        <NumberInput source="order" validate={required()} label="Order" />
      </SimpleForm>
    </Create>
  );
};
