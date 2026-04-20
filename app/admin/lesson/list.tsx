import {
  Datagrid,
  List,
  NumberField,
  ReferenceField,
  TextField,
} from "react-admin";

export const LessonList = () => {
  return (
    <List>
      <Datagrid rowClick="edit">
        <NumberField source="id" />
        <TextField source="title" />
        <NumberField source="unitId" label="Unit ID" />
        <ReferenceField source="unitId" reference="units" />
        <NumberField source="order" />
      </Datagrid>
    </List>
  );
};
