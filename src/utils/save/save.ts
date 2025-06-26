import client from "../../graphql/client";
import { AnswerMutation } from "../../graphql/generated/graphql";
import { State } from "../../store";
import { Answer } from "../../graphql/queries/interview.graphql";

export const commonSave = async (state: State) => {
  console.log(state);
  if (!state.stepConfig?.persist) {
    return;
  }

  // récupérer les values du form grace au fieldName
  console.log("Voici le form au save: ", state.formValues);
  console.log(
    "Voici la value à save: ",
    state.formValues[state.stepConfig.fieldName]
  );

  const values = state.formValues[state.stepConfig.fieldName];

  if (!values) {
    return;
  }
  const answer = Array.isArray(values) ? values : [String(values)];

  const { errors: answerErrors } = await client.mutate<AnswerMutation>({
    mutation: Answer,
    variables: {
      values: answer,
      session: state.sessionId,
      field: state.stepConfig.fieldName,
      order: state.visitedSteps.length,
      question: state.currStep!.id,
    },
  });

  if (answerErrors?.length !== 0) {
    // throw "An error occured saving response"
  }
};
