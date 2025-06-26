import { Form, FormInstance, Input } from "antd";
import { CurrStep, StepConfig, useQuestionnaireStore } from "../../store";
import { constant } from "../../styles/constants";
import ThirdPartySelector from "../form/ThirdPartySelector";
import Label from "../common/Label";

type ThirdPartyStepProps = {
  form: FormInstance<unknown> | undefined;
  currStep: CurrStep;
  stepConfig: StepConfig | null;
};

const ThirdPartyStep = ({ stepConfig }: ThirdPartyStepProps) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        fontWeight: 600,
        fontSize: 16,
        color: constant.primaryColor,
        gap: 20,
      }}
    >
      <Label>Remplissez vous ce questionnaire pour</Label>
      <Form.Item name={stepConfig?.fieldName}>
        <ThirdPartySelector />
      </Form.Item>
    </div>
  );
};

export default ThirdPartyStep;
