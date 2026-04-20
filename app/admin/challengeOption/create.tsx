import {
  BooleanInput,
  Create,
  NumberInput,
  ReferenceInput,
  SimpleForm,
  TextInput,
  required,
} from "react-admin";

const requiredValidation = [required()];

export const ChallengeOptionCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="text" validate={requiredValidation} label="Text" />
        <BooleanInput source="correct" label="Correct option" />
        <ReferenceInput source="challengeId" reference="challenges" />
        <TextInput source="imageSrc" label="Image URL" />
        <TextInput source="audioSrc" label="Audio URL" />
        <TextInput source="videoSrc" label="Video URL" />
        <NumberInput source="order" validate={requiredValidation} label="Order" />
      </SimpleForm>
    </Create>
  );
};
