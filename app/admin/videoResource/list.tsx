import { Datagrid, List, NumberField, TextField, ImageField } from "react-admin";

export const VideoResourceList = () => {
  return (
    <List>
      <Datagrid rowClick="edit">
        <NumberField source="id" />
        <TextField source="title" />
        <TextField source="category" />
        <ImageField source="thumbnailSrc" title="title" sx={{ "& img": { maxHeight: "80px", maxWidth: "120px", objectFit: "cover" } }} />
        <TextField source="youtubeUrl" />
        <NumberField source="order" />
      </Datagrid>
    </List>
  );
};
