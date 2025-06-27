import { Form, FormInstance, Input, Rate } from "antd";
import { CurrStep, StepConfig, useQuestionnaireStore } from "../../store";
import Range from "../common/Range";
import { GetStepQuery } from "../../graphql/generated/graphql";
import Label from "../common/Label";

type RangeQuestionProps = {
  form: FormInstance<unknown> | undefined;
  currStep: CurrStep;
  stepConfig: StepConfig | null;
};

const RangeQuestion = ({ stepConfig, currStep }: RangeQuestionProps) => {
  const { advance } = useQuestionnaireStore();

  const max =
    (currStep as Extract<CurrStep, { __typename: "RangeQuestion" }>).max ?? 10;

  const min =
    (currStep as Extract<CurrStep, { __typename: "RangeQuestion" }>).min ?? 0;
  const hint = (currStep as Extract<CurrStep, { __typename: "RangeQuestion" }>)
    .hint;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <Label style={{ alignSelf: "center" }}>{hint}</Label>
      <Form.Item name={stepConfig?.fieldName}>
        <Range
          min={min}
          max={max}
          onChange={(val) => {
            advance();
          }}
        />
      </Form.Item>
    </div>
  );
};

export default RangeQuestion;
