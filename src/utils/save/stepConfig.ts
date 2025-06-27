import {
  getInnerStep,
  getInnerSteps,
  IdentitySubStepLabel,
} from "../../components/steps/identity/IdentityHelpers";
import { State, StepConfig } from "../../store";

export const getStepConfig = (
  subStep: number,
  currStep: State["currStep"],
  stepConfig: StepConfig | null,
  form: Record<string, unknown>
): StepConfig | null => {
  if (!currStep) return null;

  switch (currStep.__typename) {
    case "DoctorSelectionStep":
      return {
        persist: false,
        fieldName: "",
        innerSteps: 1,
        isRequired: false,
        stepName: "Doctor",
      };
    case "QuestionnaireWelcomeStep":
      return {
        persist: false,
        fieldName: "",
        innerSteps: 1,
        isRequired: false,
        stepName: "Welcome",
      };

    case "QuestionnaireInfoStep":
      return {
        persist: false,
        fieldName: "email",
        innerSteps: 1,
        isRequired: false,
        stepName: "Info",
      };

    case "QuestionnaireCondition":
      return {
        persist: true,
        fieldName: currStep.id,
        innerSteps: 1,
        isRequired: true,
        stepName: "Conditional",
      };

    case "RadioQuestion":
      return {
        persist: true,
        fieldName: currStep.field ?? currStep.id,
        innerSteps: 1,
        isRequired: true,
        stepName: "Radio Input",
      };

    case "RangeQuestion":
      return {
        persist: true,
        fieldName: currStep.field ?? currStep.id,
        innerSteps: 1,
        isRequired: true,
        stepName: "Range Input",
      };

    case "SelectQuestion":
      return {
        persist: true,
        fieldName: currStep.field ?? currStep.id,
        innerSteps: 1,
        isRequired: true,
        stepName: "Select Input",
      };

    case "CheckboxQuestion":
      return {
        persist: true,
        fieldName: currStep.field ?? currStep.id,
        innerSteps: 1,
        isRequired: false,
        stepName: "Checkbox Input",
      };

    case "TextQuestion":
      return {
        persist: true,
        fieldName: currStep.field ?? currStep.id,
        innerSteps: 1,
        isRequired: false,
        stepName: "Text Input",
      };

    case "QuestionnaireThirdParty":
      return {
        persist: true,
        fieldName: "thirdParty",
        innerSteps: 1,
        isRequired: true,
        stepName: "Thirdparty",
      };
    case "QuestionnaireAppointmentDate":
      return {
        persist: true,
        fieldName: "appointmentDate",
        innerSteps: 1,
        isRequired: false,
        stepName: "Date",
      };
    case "DateQuestion":
      return {
        persist: true,
        fieldName: currStep.field ?? currStep.id,
        innerSteps: 1,
        isRequired: true,
        stepName: "Date Input",
      };
    case "QuestionnaireMenu":
      return {
        persist: true,
        fieldName: currStep.id,
        innerSteps: 1,
        isRequired: true,
        stepName: "Menu",
      };
    case "QuestionnaireIdentity":
      const innerSteps = getInnerSteps(currStep, form);
      const innerStep = getInnerStep(subStep, stepConfig, currStep, form);
      console.log({
        persist: true,
        fieldName: innerStep,
        innerSteps,
        isRequired: false,
        stepName: IdentitySubStepLabel[innerStep],
      });
      return {
        persist: true,
        fieldName: innerStep,
        innerSteps,
        isRequired: false,
        stepName: IdentitySubStepLabel[innerStep],
      };

    default:
      return {
        persist: true,
        fieldName: "test",
        innerSteps: 1,
        isRequired: false,
        stepName: "Not found",
      };
  }
};
