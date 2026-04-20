import {
  Edit,
  NumberInput,
  ReferenceInput,
  SimpleForm,
  TextInput,
  required,
} from "react-admin";

const requiredValidation = [required()];

export const LessonEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <NumberInput source="id" validate={requiredValidation} label="Id" />
        <TextInput source="title" validate={requiredValidation} label="Title" />
        <ReferenceInput source="unitId" reference="units" />
        <NumberInput source="order" validate={required()} label="Order" />
      </SimpleForm>
    </Edit>
  );
};
