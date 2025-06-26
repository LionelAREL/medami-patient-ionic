import { CurrStep, StepConfig, useQuestionnaireStore } from "../../store";
import { Form, FormInstance, Radio } from "antd";
import { GetStepQuery } from "../../graphql/generated/graphql";
import Label from "../common/Label";
import { constant } from "../../styles/constants";

type ConditionalStepProps = {
  form: FormInstance<unknown> | undefined;
  currStep: CurrStep;
  stepConfig: StepConfig | null;
};

const ConditionalStep = ({ currStep, stepConfig }: ConditionalStepProps) => {
  const { advance } = useQuestionnaireStore();
  const hint = (
    currStep as Extract<
      GetStepQuery["questionnaireSteps"][number],
      { __typename: "QuestionnaireCondition" }
    >
  ).hint;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <Label>{hint}</Label>
      <Form.Item name={stepConfig?.fieldName}>
        <Radio.Group
          className="custom-radio"
          buttonStyle="solid"
          onChange={() => advance()}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 60,
            ...constant.textInputStyle,
          }}
          options={[
            { label: "Oui", value: "Yes" },
            { label: "Non", value: "No" },
          ]}
        />
      </Form.Item>
    </div>
  );
};

export default ConditionalStep;
