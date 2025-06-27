import { Form, FormInstance, Input, Select } from "antd";
import { CurrStep, StepConfig, useQuestionnaireStore } from "../../store";
import { GetStepQuery } from "../../graphql/generated/graphql";
import Label from "../common/Label";

type SelectQuestionProps = {
  form: FormInstance<unknown> | undefined;
  currStep: CurrStep;
  stepConfig: StepConfig | null;
};

const SelectQuestion = ({ stepConfig, currStep }: SelectQuestionProps) => {
  const { advance } = useQuestionnaireStore();
  const options = (
    currStep as Extract<CurrStep, { __typename: "SelectQuestion" }>
  ).choices.map((choice) => ({
    label: choice.label,
    value: choice.label,
  }));
  const hint = (currStep as Extract<CurrStep, { __typename: "SelectQuestion" }>)
    .hint;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <Label>{hint}</Label>
      <Form.Item name={stepConfig?.fieldName}>
        <Select
          variant="underlined"
          //   style={{ width: 120 }}
          onChange={() => advance()}
          options={options}
        />
      </Form.Item>
    </div>
  );
};

export default SelectQuestion;
