import { Create, NumberInput, SimpleForm, TextInput, required } from "react-admin";

const requiredValidation = [required()];

export const VideoResourceCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="title" validate={requiredValidation} label="Title" fullWidth />
        <TextInput source="description" label="Description" fullWidth />
        <TextInput source="thumbnailSrc" validate={requiredValidation} label="Thumbnail URL" fullWidth />
        <TextInput source="youtubeUrl" validate={requiredValidation} label="YouTube URL" fullWidth />
        <TextInput source="category" label="Category" defaultValue="general" />
        <NumberInput source="order" validate={requiredValidation} label="Order" />
      </SimpleForm>
    </Create>
  );
};
