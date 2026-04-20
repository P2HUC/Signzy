import {
  Datagrid,
  List,
  NumberField,
  ReferenceField,
  SelectField,
  TextField,
} from "react-admin";

const choices = [
  { id: "SELECT", name: "SELECT" },
  { id: "ASSIST", name: "ASSIST" },
  { id: "VIDEO", name: "VIDEO" },
];

export const ChallengeList = () => {
  return (
    <List>
      <Datagrid rowClick="edit">
        <NumberField source="id" />
        <TextField source="question" />
        <SelectField source="type" choices={choices} />
        <NumberField source="lessonId" label="Lesson ID" />
        <ReferenceField source="lessonId" reference="lessons">
          <TextField source="title" />
        </ReferenceField>
        <NumberField source="order" />
        <TextField source="videoSrc" />
      </Datagrid>
    </List>
  );
};
