import { Edit, NumberInput, SimpleForm, TextInput, required } from "react-admin";

const requiredValidation = [required()];

export const VideoResourceEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <NumberInput source="id" validate={requiredValidation} label="Id" disabled />
        <TextInput source="title" validate={requiredValidation} label="Title" fullWidth />
        <TextInput source="description" label="Description" fullWidth />
        <TextInput source="thumbnailSrc" validate={requiredValidation} label="Thumbnail URL" fullWidth />
        <TextInput source="youtubeUrl" validate={requiredValidation} label="YouTube URL" fullWidth />
        <TextInput source="category" label="Category" />
        <NumberInput source="order" validate={requiredValidation} label="Order" />
      </SimpleForm>
    </Edit>
  );
};
