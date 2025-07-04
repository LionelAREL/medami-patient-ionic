import { faUserDoctor } from "@fortawesome/free-solid-svg-icons";
import { CurrStep, StepConfig, useQuestionnaireStore } from "../../store";
import Title from "../common/Title";
import ListChoice, { Choice } from "../form/ListChoice";
import { getCodePoint } from "../../utils/fontAwesome";

type DoctorSelectorStepProps = {
  currStep: CurrStep;
  stepConfig: StepConfig | null;
};

const DoctorSelectorStep = ({ currStep }: DoctorSelectorStepProps) => {
  const setState = useQuestionnaireStore.setState;
  const doctors = (
    currStep as Extract<CurrStep, { __typename: "DoctorSelectionStep" }>
  ).doctors;
  const onPickDoctor = (
    currStep as Extract<CurrStep, { __typename: "DoctorSelectionStep" }>
  ).onPickDoctor;
  const choices: Choice[] = doctors.map((doctor, index) => {
    const fullName = `${doctor.firstName} ${doctor.lastName}`;
    const speciality = doctor.speciality?.name ?? "";
    const key = doctor.id ?? String(index);

    return {
      name: fullName,
      description: speciality,
      icon: getCodePoint(faUserDoctor),
      key,
    };
  });
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 40,
        width: "90vw",
      }}
    >
      <Title
        style={{
          flex: 1,
        }}
        type="h1"
      >
        Veuillez sélectionner votre praticien pour démarrer
      </Title>
      <ListChoice
        choices={choices}
        onPick={(choice) => {
          const doctor = doctors.find((doctor) => doctor.id === choice.key);
          setState({
            doctor,
          });
          onPickDoctor(doctor!);
        }}
      />
    </div>
  );
};

export default DoctorSelectorStep;
