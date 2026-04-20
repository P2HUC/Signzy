import {
  Create,
  NumberInput,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextInput,
  required,
} from "react-admin";

const choices = [
  { id: "SELECT", name: "SELECT" },
  { id: "ASSIST", name: "ASSIST" },
  { id: "VIDEO", name: "VIDEO" },
];

const requiredValidation = [required()];

export const ChallengeCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="question" validate={requiredValidation} label="Question" />
        <SelectInput
          source="type"
          validate={requiredValidation}
          choices={choices}
        />
        <ReferenceInput source="lessonId" reference="lessons" />
        <NumberInput source="order" validate={required()} label="Order" />
        <TextInput source="videoSrc" label="Video URL" />
      </SimpleForm>
    </Create>
  );
};
