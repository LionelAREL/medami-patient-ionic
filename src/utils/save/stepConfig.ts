import {
  getIdentityIsRequired,
  getInnerStep,
  getInnerSteps,
  IdentitySubStep,
  IdentitySubStepLabel,
} from "../../components/steps/identity/IdentityHelpers";
import {
  addPatient,
  signInPatient,
  signUpPatient,
} from "./../../graphql/queries/patient.graphql";
import client from "../../graphql/client";
import { CurrStep, State, StepConfig } from "../../store";
import { commonSave } from "./save";
import { Answer } from "./../../graphql/queries/interview.graphql";

export const getStepConfig = (
  subStep: number,
  currStep: State["currStep"],
  formValues: Record<string, unknown>
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
    case "QuestionnaireAi":
      return {
        persist: true,
        fieldName: currStep.id,
        innerSteps: currStep.maxQuestions ?? 5,
        isRequired: true,
        stepName: "Ai",
      };
    case "QuestionnaireSelectMenu":
      return {
        persist: false,
        fieldName: currStep.id,
        innerSteps: 1,
        isRequired: true,
        stepName: "Menu Select",
        save: async (state) => {
          if (
            (
              state.currStep as Extract<
                CurrStep,
                { __typename: "QuestionnaireSelectMenu" }
              >
            ).field
          ) {
            client.mutate({
              mutation: Answer,
              variables: {
                session: state.sessionId,
                question: state.currStep?.id,
                order: state.nextInterviews.length,
                field: (
                  state.currStep as Extract<
                    CurrStep,
                    { __typename: "QuestionnaireSelectMenu" }
                  >
                ).field,
                values: (
                  state.formValues[currStep.id] as Extract<
                    CurrStep,
                    { __typename: "QuestionnaireSelectMenu" }
                  >["entries"]
                ).map((entrie) => entrie.label),
              },
            });
          }
          commonSave(state);
        },
      };
    case "QuestionnaireIdentity":
      const innerSteps = getInnerSteps(currStep, formValues);
      const innerStep = getInnerStep(subStep, currStep, formValues);
      return {
        persist: true,
        fieldName: innerStep,
        innerSteps,
        isRequired: getIdentityIsRequired(innerStep),
        stepName: IdentitySubStepLabel[innerStep],
        save: async (state) => {
          const { formValues, currStep, currSubStep, form, stepConfig } = state;
          const withAuthentication = (
            currStep as Extract<
              CurrStep,
              { __typename: "QuestionnaireIdentity" }
            >
          ).withAuthentication;
          const fields = (
            currStep as Extract<
              CurrStep,
              { __typename: "QuestionnaireIdentity" }
            >
          ).fields;
          if (
            (withAuthentication &&
              !formValues.isConnection &&
              currSubStep == innerSteps - 1) ||
            (!withAuthentication && currSubStep == fields?.length)
          ) {
            const identityVariables = fields?.reduce<
              Partial<Record<IdentitySubStep, any>>
            >((acc, field, i) => {
              const innerStepId = i + (withAuthentication ? 2 : 1);
              const innerStep = getInnerStep(innerStepId, currStep, formValues);
              const key = innerStep;
              const value = formValues[key];

              acc[key] =
                innerStep === IdentitySubStep.Gender ? String(value) : value;
              return acc;
            }, {});
            const { errors: addPatientErrors } = await client.mutate({
              mutation: addPatient,
              variables: {
                ...identityVariables,
                session: state.sessionId,
              },
            });
            if (addPatientErrors) {
              console.log("errors patient");
            }
          }

          if (
            getInnerStep(currSubStep ?? 1, currStep, formValues) ==
            IdentitySubStep.SignIn
          ) {
            const { errors: signInErrors } = await client.mutate({
              mutation: signInPatient,
              variables: {
                email: form?.getFieldValue(`${stepConfig!.fieldName}Email`),
                password: form?.getFieldValue(
                  `${stepConfig!.fieldName}Password`
                ),
              },
            });
            if (signInErrors) {
              console.log("errors signIn patient");
            }
          }

          if (
            getInnerStep(currSubStep ?? 1, currStep, formValues) ==
            IdentitySubStep.SignUp
          ) {
            const { errors: signUpErrors } = await client.mutate({
              mutation: signUpPatient,
              variables: {
                email: form?.getFieldValue(`${stepConfig!.fieldName}Email`),
                password: form?.getFieldValue(
                  `${stepConfig!.fieldName}Password`
                ),
              },
            });
            if (signUpErrors) {
              console.log("errors signUp patient");
            }
          }

          commonSave(state);
        },
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
