import { CurrStep, StepConfig, useQuestionnaireStore } from "../../store";
import { Form, FormInstance, Radio } from "antd";
import { GetStepQuery } from "../../graphql/generated/graphql";
import Label from "../common/Label";

type RadioQuestionProps = {
  form: FormInstance<unknown> | undefined;
  currStep: CurrStep;
  stepConfig: StepConfig | null;
};

const RadioQuestion = ({ currStep, stepConfig }: RadioQuestionProps) => {
  const { advance } = useQuestionnaireStore();
  const options = (
    currStep as Extract<CurrStep, { __typename: "RadioQuestion" }>
  ).choices.map((choice) => ({
    label: choice.label,
    value: choice.label,
  }));
  const hint = (currStep as Extract<CurrStep, { __typename: "RadioQuestion" }>)
    .hint;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <Label>{hint}</Label>
      <Form.Item name={stepConfig?.fieldName} style={{ paddingLeft: 10 }}>
        <Radio.Group
          onChange={() => advance()}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 15,
          }}
          options={options}
        />
      </Form.Item>
    </div>
  );
};

export default RadioQuestion;
