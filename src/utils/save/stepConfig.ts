import { State, StepConfig } from "../../store";

export const getStepConfig = (
  currStep: State["currStep"]
): StepConfig | null => {
  if (!currStep) return null;

  switch (currStep.__typename) {
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
