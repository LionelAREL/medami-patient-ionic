import NotFound from './steps/NotFound'
import Box from './common/Box'
import { State, StepConfig, useQuestionnaireStore } from '../store'
import CheckboxQuestion from './steps/CheckboxQuestion'
import QuestionWrapper from './common/QuestionWrapper'
import QuestionImage from "./../assets/images/question.svg";
import NotFoundImage from "./../assets/images/404.svg"
import SuccessImage from "./../assets/images/success.svg"
import RadioQuestion from './steps/RadioQuestion'
import ThanksStep from './steps/ThanksStep'


type ChildProps = {
    state: State;
}

const Child = ({state}: ChildProps) => {
     const setState = useQuestionnaireStore.setState;
      switch (state.currStep?.__typename) {
    // case 'QuestionnaireWelcomeStep':
    //   return (
    //     <StartStep
    //       doctor={doctor!}
    //       step={currStep}
    //     />
    //   )
    //   break

    // case 'QuestionnaireInfoStep':
    //   return (
    //     <InfoStep
    //       doctor={doctor!}
    //       step={currStep}
    //       advance={advance}
    //       form={formKey}
    //     />
    //   )
    //   break

    // case 'QuestionnaireCondition':
    //   return (
    //     <ConditionalStep
    //       step={currStep}
    //       advance={advance}
    //     />
    //   )
    //   break

    // case 'QuestionnaireAppointmentDate':
    //   return <AppointmentDateStep advance={advance} />
    //   break


    // case 'QuestionnaireIdentity': {
    //   const identity = currStep
    //   return (
    //     <IdentityStep
    //       substep={0}
    //       step={identity}
    //       advance={advance}
    //       form={formKey}
    //       isThirdParty={isThirdParty}
    //       sessionId={sessionId}
    //       gql={gql}
    //       showToast={showToast}
    //       withAuthentication={!isThirdParty && (identity.withAuthentication ?? true)}
    //       switchToInscription={switchToInscription}
    //       setAuthentication={setAuthentication}
    //       patientId={authToken?.sub}
    //     />
    //   )
    //   break
    // }

    case 'QuestionnaireInterview':
      return null

    // case 'QuestionnaireMenu':
    //   return (
    //     <MenuStep
    //       step={currStep}
    //       advance={advance}
    //       form={formKey}
    //     />
    //   )
    //   break

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

    // case 'QuestionnaireThirdParty':
    //   return <ThirdPartyStep advance={advance} />
    //   break

    case 'RadioQuestion':
      { const stepConfig:StepConfig = {
          persist: true,
          fieldName: state.currStep.field ?? state.currStep.id,
          innerSteps: 1,
          isRequired: true,
          stepName: 'Radio Input',
        }
       setState({stepConfig})
      return <QuestionWrapper image={QuestionImage}>
        {(form) => (
          <RadioQuestion
            currStep={state.currStep}
            stepConfig={stepConfig}
            form={form}
          />
        )}
      </QuestionWrapper>
      break }

    // case 'RangeQuestion':
    //   return <RangeStep step={currStep} advance={advance} />
    //   break

    // case 'SelectQuestion':
    //   return <SelectStep step={currStep} advance={advance} />
    //   break

    case 'CheckboxQuestion':
      { const stepConfig:StepConfig = {
          persist: true,
          fieldName: state.currStep.field ?? state.currStep.id,
          innerSteps: 1,
          isRequired: false,
          stepName: 'Checkbox Input',
        }
       setState({stepConfig})
      return <QuestionWrapper image={QuestionImage}>
        {(form) => (
          <CheckboxQuestion
            currStep={state.currStep}
            stepConfig={stepConfig}
            form={form}
          />
        )}
      </QuestionWrapper>
      break }

    // case 'TextQuestion':
    //   return <TextInputStep step={currStep} advance={advance} />
    //   break

    // case 'DateQuestion':
    //   return <DateStep step={currStep} advance={advance} />
    //   break

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
    case 'NotFoundStep':
      return (
       <QuestionWrapper image={NotFoundImage}>
              {
                () =>  (<NotFound/>)
              }
            </QuestionWrapper>
      )
    case 'ThanksStep':
      return (
        <QuestionWrapper image={SuccessImage}>
              {
                () =>  (<ThanksStep/>)
              }
            </QuestionWrapper>
      )
    default:
      setState({stepConfig: {
        persist: true,
        fieldName: "test",
        innerSteps: 1,
        isRequired: false,
        stepName: "Not found"
      }})
      return (
            <QuestionWrapper>
              {
                () =>  (<Box>Data : {JSON.stringify(state.currStep)}</Box>)
              }
            </QuestionWrapper>)

  }
}

export default Child
