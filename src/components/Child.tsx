import NotFound from "./steps/NotFound";
import Box from "./common/Box";
import { State, StepConfig, useQuestionnaireStore } from "../store";
import CheckboxQuestion from "./steps/CheckboxQuestion";
import QuestionWrapper from "./common/QuestionWrapper";
import QuestionImage from "./../assets/images/question.svg";
import NotFoundImage from "./../assets/images/404.svg";
import SuccessImage from "./../assets/images/success.svg";
import WelcomeImage from "./../assets/images/home_visual.svg";
import ThirdPartyImage from "./../assets/images/third_party.svg";
import AppointmentDateImage from "./../assets/images/appointment.svg";
import IdentityImage from "./../assets/images/identity.svg";
import RadioQuestion from "./steps/RadioQuestion";
import ThanksStep from "./steps/ThanksStep";
import TextQuestion from "./steps/TextQuestion";
import RangeQuestion from "./steps/RangeQuestion";
import SelectQuestion from "./steps/SelectQuestion";
import WelcomeStep from "./steps/WelcomeStep";
import ThirdPartyStep from "./steps/ThirdPartyStep";
import ConditionalStep from "./steps/ConditionalStep";
import InfoStep from "./steps/InfoStep";
import { getStepConfig } from "../utils/save/stepConfig";
import { useEffect } from "react";
import DoctorSelectorStep from "./steps/DoctorSelectorStep";
import AppointmentDateStep from "./steps/AppointmentDateStep";
import DateQuestion from "./steps/DateQuestion";
import MenuStep from "./steps/MenuStep";
import IdentityStep from "./steps/identity/IdentityStep";
import { getInnerStep } from "./steps/identity/IdentityHelpers";

type ChildProps = {
  state: State;
};

const Child = ({ state }: ChildProps) => {
  const stepConfig = getStepConfig(
    state.currSubStep ?? 1,
    state.currStep,
    state.formValues
  );
  const setState = useQuestionnaireStore.setState;

  useEffect(() => {
    setState({
      stepConfig: getStepConfig(
        state.currSubStep ?? 1,
        state.currStep,
        state.formValues
      ),
    });
  }, [state.currStep, state.currSubStep, state.formValues]);

  switch (state.currStep?.__typename) {
    case "QuestionnaireWelcomeStep": {
      return (
        <QuestionWrapper image={WelcomeImage} isExpandLogo={true}>
          {(form) => (
            <WelcomeStep
              currStep={state.currStep}
              stepConfig={stepConfig}
              form={form}
            />
          )}
        </QuestionWrapper>
      );
    }

    case "QuestionnaireInfoStep": {
      return <InfoStep currStep={state.currStep} stepConfig={stepConfig} />;
    }

    case "QuestionnaireCondition": {
      return (
        <QuestionWrapper image={QuestionImage}>
          {(form) => (
            <ConditionalStep
              currStep={state.currStep}
              stepConfig={stepConfig}
              form={form}
            />
          )}
        </QuestionWrapper>
      );
    }
    case "DoctorSelectionStep": {
      return (
        <DoctorSelectorStep currStep={state.currStep} stepConfig={stepConfig} />
      );
    }

    case "QuestionnaireAppointmentDate": {
      return (
        <QuestionWrapper image={AppointmentDateImage}>
          {(form) => (
            <AppointmentDateStep
              currStep={state.currStep}
              stepConfig={stepConfig}
              form={form}
            />
          )}
        </QuestionWrapper>
      );
    }

    case "QuestionnaireIdentity": {
      const subStep = state.currSubStep ?? 1;
      return (
        <QuestionWrapper image={IdentityImage}>
          {(form) => (
            <IdentityStep
              currStep={state.currStep}
              stepConfig={stepConfig}
              form={form}
              formValues={state.formValues}
              subStep={subStep}
            />
          )}
        </QuestionWrapper>
      );
    }

    case "QuestionnaireInterview":
      return null;

    case "QuestionnaireMenu":
      return <MenuStep currStep={state.currStep} stepConfig={stepConfig} />;

    // case 'QuestionnaireSelectMenu':
    //   return (
    //     <MenuSelectStep
    //       step={currStep}
    //       advance={advance}
    //       sessionId={sessionId}
    //       patientId={authToken?.sub}
    //       gql={gql}
    //     />
    //   )
    //   break

    // case 'QuestionnaireSurvey':
    //   return <SurveyStep />
    //   break

    case "QuestionnaireThirdParty": {
      return (
        <QuestionWrapper image={ThirdPartyImage}>
          {(form) => (
            <ThirdPartyStep
              currStep={state.currStep}
              stepConfig={stepConfig}
              form={form}
            />
          )}
        </QuestionWrapper>
      );
    }
    case "RadioQuestion": {
      return (
        <QuestionWrapper image={QuestionImage}>
          {(form) => (
            <RadioQuestion
              currStep={state.currStep}
              stepConfig={stepConfig}
              form={form}
            />
          )}
        </QuestionWrapper>
      );
    }

    case "RangeQuestion": {
      return (
        <QuestionWrapper image={QuestionImage}>
          {(form) => (
            <RangeQuestion
              currStep={state.currStep}
              stepConfig={stepConfig}
              form={form}
            />
          )}
        </QuestionWrapper>
      );
    }

    case "SelectQuestion": {
      return (
        <QuestionWrapper image={QuestionImage}>
          {(form) => (
            <SelectQuestion
              currStep={state.currStep}
              stepConfig={stepConfig}
              form={form}
            />
          )}
        </QuestionWrapper>
      );
    }

    case "CheckboxQuestion": {
      return (
        <QuestionWrapper image={QuestionImage}>
          {(form) => (
            <CheckboxQuestion
              currStep={state.currStep}
              stepConfig={stepConfig}
              form={form}
            />
          )}
        </QuestionWrapper>
      );
    }

    case "TextQuestion":
      return (
        <QuestionWrapper image={QuestionImage}>
          {(form) => (
            <TextQuestion
              currStep={state.currStep}
              stepConfig={stepConfig}
              form={form}
            />
          )}
        </QuestionWrapper>
      );

    case "DateQuestion":
      return (
        <QuestionWrapper image={QuestionImage}>
          {(form) => (
            <DateQuestion
              currStep={state.currStep}
              stepConfig={stepConfig}
              form={form}
            />
          )}
        </QuestionWrapper>
      );

    // case 'QuestionnaireAi':
    //   return (
    //     <AiStep
    //       step={currStep}
    //       advance={advance}
    //       substep={0}
    //       setSubstep={setSubstep}
    //       form={formKey}
    //     />
    //   )
    //   break
    case "NotFoundStep":
      return (
        <QuestionWrapper image={NotFoundImage}>
          {() => <NotFound />}
        </QuestionWrapper>
      );
    case "ThanksStep":
      return (
        <QuestionWrapper image={SuccessImage}>
          {() => <ThanksStep />}
        </QuestionWrapper>
      );
    default:
      return (
        <QuestionWrapper>
          {() => <Box>Data : {JSON.stringify(state.currStep)}</Box>}
        </QuestionWrapper>
      );
  }
};

export default Child;
