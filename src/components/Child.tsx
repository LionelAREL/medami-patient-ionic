import React from 'react'
import NotFound from './steps/NotFound'
import Box from './common/Box'
import { State, useQuestionnaireStore } from '../store'

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

    // case 'QuestionnaireDocument':
    //   return <DocumentStep />
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

    // case 'QuestionnaireRouter':
    //   return <RouterStep />
    //   break

    // case 'RadioQuestion':
    //   return <RadioStep step={currStep} advance={advance} />
    //   break

    // case 'RangeQuestion':
    //   return <RangeStep step={currStep} advance={advance} />
    //   break

    // case 'SelectQuestion':
    //   return <SelectStep step={currStep} advance={advance} />
    //   break

    // case 'CheckboxQuestion':
    //   return <CheckboxStep step={currStep} advance={advance} />
    //   break

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
        <NotFound/>
      )
      break
    default:
      setState({stepConfig: {
        persist: true,
        fieldName: "test",
        innerSteps: 1,
        isRequired: false,
      }})
      return <Box>Data : {JSON.stringify(state.currStep)}</Box>
  }
}

export default Child
