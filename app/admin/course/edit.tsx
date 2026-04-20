import {
  Edit,
  NumberInput,
  SimpleForm,
  TextInput,
  required,
} from "react-admin";

const requiredValidation = [required()];

export const CourseEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <NumberInput source="id" validate={requiredValidation} label="Id" />
        <TextInput source="title" validate={requiredValidation} label="Title" />
        <TextInput source="imageSrc" validate={requiredValidation} label="Image" />
      </SimpleForm>
    </Edit>
  );
};
