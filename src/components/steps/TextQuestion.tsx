import { Form, FormInstance, Input } from "antd";
import { CurrStep, StepConfig, useQuestionnaireStore } from "../../store";
import { GetStepQuery } from "../../graphql/generated/graphql";
import Label from "../common/Label";

type TextQuestionProps = {
  form: FormInstance<unknown> | undefined;
  currStep: CurrStep;
  stepConfig: StepConfig | null;
};

const TextQuestion = ({ stepConfig, currStep }: TextQuestionProps) => {
  const { advance } = useQuestionnaireStore();
  const hint = (currStep as Extract<CurrStep, { __typename: "TextQuestion" }>)
    .hint;
  const placeholder = (
    currStep as Extract<CurrStep, { __typename: "TextQuestion" }>
  ).placeholder;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <Label>{hint}</Label>
      <Form.Item name={stepConfig?.fieldName}>
        <Input
          variant="underlined"
          placeholder={placeholder ?? ""}
          onPressEnter={() => advance()}
        />
      </Form.Item>
    </div>
  );
};

export default TextQuestion;
