import {
  BooleanField,
  Datagrid,
  List,
  NumberField,
  ReferenceField,
  TextField,
} from "react-admin";

export const ChallengeOptionsList = () => {
  return (
    <List>
      <Datagrid rowClick="edit">
        <NumberField source="id" />
        <TextField source="text" />
        <BooleanField source="correct" />
        <NumberField source="challengeId" label="Challenge ID" />
        <ReferenceField source="challengeId" reference="challenges">
          <TextField source="question" />
        </ReferenceField>
        <TextField source="imageSrc" />
        <TextField source="audioSrc" />
        <TextField source="videoSrc" />
        <NumberField source="order" />
      </Datagrid>
    </List>
  );
};
