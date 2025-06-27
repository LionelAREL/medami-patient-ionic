import { Form, FormInstance } from "antd";
import { CurrStep, StepConfig } from "../../store";
import Label from "../common/Label";
import AppointmentDate from "../form/AppointmentDate";

type AppointmentDateStepProps = {
  form: FormInstance<unknown> | undefined;
  currStep: CurrStep;
  stepConfig: StepConfig | null;
};

const AppointmentDateStep = ({ stepConfig }: AppointmentDateStepProps) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <Label>Quelle est la date de votre rendez-vous ?</Label>
      <Form.Item name={stepConfig?.fieldName}>
        <AppointmentDate />
      </Form.Item>
    </div>
  );
};

export default AppointmentDateStep;
