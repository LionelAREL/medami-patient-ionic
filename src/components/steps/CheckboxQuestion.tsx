import { CurrStep, StepConfig } from "../../store";
import { Checkbox, Form, FormInstance, GetProp } from "antd";
import { GetStepQuery } from "../../graphql/generated/graphql";

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
    checkedValues,
  ) => {
    form?.setFieldValue(stepConfig?.fieldName, checkedValues);
  };

  const options = (
    currStep as Extract<
      GetStepQuery["questionnaireSteps"][number],
      { __typename: "CheckboxQuestion" }
    >
  ).choices.map((choice) => ({
    label: choice.label,
    value: choice.label,
  }));
  return (
    <Form.Item name={stepConfig?.fieldName} valuePropName="checked">
      <Checkbox.Group
        style={{ display: "flex", flexDirection: "column" }}
        onChange={onChange}
        options={options}
      />
    </Form.Item>
  );
};

export default CheckboxQuestion;
