import {
  Create,
  NumberInput,
  ReferenceInput,
  SimpleForm,
  TextInput,
  required,
} from "react-admin";

const requiredValidation = [required()];

export const LessonCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="title" validate={requiredValidation} label="Title" />
        <ReferenceInput source="unitId" reference="units" />
        <NumberInput source="order" validate={required()} label="Order" />
      </SimpleForm>
    </Create>
  );
};
