import { Form, FormInstance, Input, Radio } from "antd";
import { CurrStep, StepConfig, useQuestionnaireStore } from "../../../store";
import Label from "../../common/Label";
import { constant } from "../../../styles/constants";
import { IdentityField } from "../../../graphql/generated/graphql";
import { getFields, getInnerStep, IdentitySubStep } from "./IdentityHelpers";
import NavigationButton from "../../buttons/NavigationButton";
import TextStyle from "../../common/Text";

type IdentityStepProps = {
  form: FormInstance<unknown> | undefined;
  currStep: CurrStep;
  stepConfig: StepConfig | null;
  subStep: number;
  formValues: Record<string, unknown>;
};

const IdentityStep = ({
  currStep,
  stepConfig,
  form,
  subStep,
  formValues,
}: IdentityStepProps) => {
  const { advance } = useQuestionnaireStore();
  const setState = useQuestionnaireStore.setState;

  const fields = getFields(currStep, formValues);

  const innerStep = getInnerStep(subStep, stepConfig, currStep, formValues);

  switch (innerStep) {
    case IdentitySubStep.AuthenticationChoice:
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Label>Avez vous déjà répondu à un questionnaire MedAmi ?</Label>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Form.Item name={"isConnection"}></Form.Item>
            <NavigationButton
              style={{
                padding: constant.paddingExtraSmall,
                height: "auto",
                fontSize: 14,
              }}
              onClick={() => {
                setState((state) => ({
                  formValues: {
                    ...state.formValues,
                    isConnection: true,
                  },
                }));
                advance();
              }}
            >
              Oui, je suis déjà venu
            </NavigationButton>
            <TextStyle style={{ fontSize: 12 }}>ou</TextStyle>
            <NavigationButton
              variant="secondary"
              style={{
                padding: constant.paddingExtraSmall,
                height: "auto",
                fontSize: 14,
              }}
              onClick={() => {
                setState((state) => ({
                  formValues: {
                    ...state.formValues,
                    isConnection: false,
                  },
                }));
                advance();
              }}
            >
              Non, c'est ma première fois
            </NavigationButton>
          </div>
        </div>
      );
    case IdentitySubStep.FirstName:
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Label>Quel est votre prénom ?</Label>
          <Form.Item name={stepConfig?.fieldName}>
            <Input variant="underlined" placeholder={"Prénom"} />
          </Form.Item>
        </div>
      );
    case IdentitySubStep.LastName:
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Label>Quel est votre nom de famille ?</Label>
          <Form.Item name={stepConfig?.fieldName}>
            <Input variant="underlined" placeholder={"Nom de famille"} />
          </Form.Item>
        </div>
      );
    case IdentitySubStep.LastName:
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Label>Quel est votre nom de famille ?</Label>
          <Form.Item name={stepConfig?.fieldName}>
            <Input variant="underlined" placeholder={"Nom de famille"} />
          </Form.Item>
        </div>
      );
    default:
      return <div>{innerStep}</div>;
  }
};

export default IdentityStep;
