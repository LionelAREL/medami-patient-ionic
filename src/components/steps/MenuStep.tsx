import { CurrStep, StepConfig, useQuestionnaireStore } from "../../store";
import Title from "../common/Title";
import ListChoice, { Choice } from "../form/ListChoice";

type MenuStepProps = {
  currStep: CurrStep;
  stepConfig: StepConfig | null;
};

const MenuStep = ({ currStep, stepConfig }: MenuStepProps) => {
  const setState = useQuestionnaireStore.setState;
  const { advance } = useQuestionnaireStore();

  const choices: Choice[] = (
    currStep as Extract<CurrStep, { __typename: "QuestionnaireMenu" }>
  ).choices.map((choice, index) => {
    const name = choice.label;
    const description = choice.description;
    const icon = choice.icon;
    const key = index;
    return {
      name,
      description: description ?? "",
      key: key.toString(),
      icon,
    };
  });

  const title = (
    currStep as Extract<CurrStep, { __typename: "QuestionnaireMenu" }>
  ).name;
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
        {title}
      </Title>
      <ListChoice
        choices={choices}
        onPick={(choice) => {
          setState((state) => ({
            formValues: {
              ...state.formValues,
              [stepConfig!.fieldName]: choice.name,
            },
          }));
          advance();
        }}
      />
    </div>
  );
};

export default MenuStep;
