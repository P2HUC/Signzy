import { Create, SimpleForm, TextInput, required } from "react-admin";

const requiredValidation = [required()];

export const CourseCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="title" validate={requiredValidation} label="Title" />
        <TextInput source="imageSrc" validate={requiredValidation} label="Image" />
      </SimpleForm>
    </Create>
  );
};
