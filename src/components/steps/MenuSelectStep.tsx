import { Form } from "antd";
import { CurrStep, StepConfig, useQuestionnaireStore } from "../../store";
import QuestionnaireSelector from "../form/QuestionnaireSelector";
import { constant } from "../../styles/constants";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";

type MenuSelectStepProps = {
  currStep: CurrStep;
  stepConfig: StepConfig | null;
};

const MenuSelectStep = ({ currStep, stepConfig }: MenuSelectStepProps) => {
  const setState = useQuestionnaireStore.setState;
  const { formValues, setFormValues, setForm, advance } =
    useQuestionnaireStore();

  const entries = (
    currStep as Extract<CurrStep, { __typename: "QuestionnaireSelectMenu" }>
  ).entries;

  const placeholder = (
    currStep as Extract<CurrStep, { __typename: "QuestionnaireSelectMenu" }>
  ).placeholder;

  const [form] = useForm();

  useEffect(() => {
    form.setFieldsValue(formValues);
  }, []);
  useEffect(() => {
    setForm(form);
  }, [form]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Form
        form={form}
        onValuesChange={(values) => {
          setFormValues(values);
        }}
      >
        <Form.Item
          name={stepConfig?.fieldName}
          style={{
            paddingLeft: 10,
          }}
        >
          <QuestionnaireSelector entries={entries} placeholder={placeholder} />
        </Form.Item>
      </Form>
    </div>
  );
};

export default MenuSelectStep;
