import { Form, FormInstance, Input } from "antd";
import { CurrStep, StepConfig, useQuestionnaireStore } from "../../store";
import { GetStepQuery } from "../../graphql/generated/graphql";
import { constant } from "../../styles/constants";

type WelcomeStepProps = {
  form: FormInstance<unknown> | undefined;
  currStep: CurrStep;
  stepConfig: StepConfig | null;
};

const WelcomeStep = ({ currStep }: WelcomeStepProps) => {
  const { doctor } = useQuestionnaireStore();
  const text = (
    currStep as Extract<CurrStep, { __typename: "QuestionnaireWelcomeStep" }>
  ).text
    ?.replace("{{firstName}}", doctor!.firstName)
    .replace("{{lastName}}", doctor!.lastName);
  return <div style={{ ...constant.textInputStyle }}>{text}</div>;
};

export default WelcomeStep;
