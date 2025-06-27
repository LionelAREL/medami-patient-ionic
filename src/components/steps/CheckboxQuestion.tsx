import { CurrStep, StepConfig } from "../../store";
import { Checkbox, Form, FormInstance, GetProp } from "antd";
import { GetStepQuery } from "../../graphql/generated/graphql";
import { constant } from "../../styles/constants";
import Label from "../common/Label";

type CheckboxQuestionProps = {
  form: FormInstance<unknown> | undefined;
  currStep: CurrStep;
  stepConfig: StepConfig | null;
};

const CheckboxQuestion = ({
  form,
  currStep,
  stepConfig,
}: CheckboxQuestionProps) => {
  const onChange: GetProp<typeof Checkbox.Group, "onChange"> = (
    checkedValues
  ) => {
    form?.setFieldValue(stepConfig?.fieldName, checkedValues);
  };

  const options = (
    currStep as Extract<CurrStep, { __typename: "CheckboxQuestion" }>
  ).choices.map((choice) => ({
    label: choice.label,
    value: choice.label,
  }));

  const hint = (
    currStep as Extract<CurrStep, { __typename: "CheckboxQuestion" }>
  ).hint;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <Label>{hint}</Label>
      <Form.Item
        name={stepConfig?.fieldName}
        style={{ paddingLeft: 10 }}
        valuePropName="checked"
      >
        <Checkbox.Group
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 15,
            ...constant.textInputStyle,
          }}
          onChange={onChange}
          options={options}
        />
      </Form.Item>
    </div>
  );
};

export default CheckboxQuestion;
