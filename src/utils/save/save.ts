import client from "../../graphql/client";
import {
  AnswerMutation,
  DateFormatType,
} from "../../graphql/generated/graphql";
import { CurrStep, State } from "../../store";
import { Answer } from "../../graphql/queries/interview.graphql";
import dayjs from "dayjs";

export const commonSave = async (state: State) => {
  if (!state.stepConfig?.persist) {
    return;
  }

  const values = state.formValues[state.stepConfig.fieldName];

  if (!values) {
    return;
  }
  const answer = formatAnswer(values, state.currStep);

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
  }
};

const formatAnswer = (values: unknown, currStep: CurrStep): string[] => {
  if (Array.isArray(values)) {
    return values;
  }
  if (dayjs.isDayjs(values)) {
    const dateType =
      (currStep as Extract<CurrStep, { __typename: "DateQuestion" }>)
        .dateType ?? DateFormatType.DateOnly;
    switch (dateType) {
      case DateFormatType.DateOnly:
        return [values.format("YYYY-MM-DD 00:00:00.000")];
      case DateFormatType.DateAndHour:
        return [values.format("YYYY-MM-DD HH:mm:ss.SSS")];
      case DateFormatType.HourOnly:
        return [values.format("0001-01-01 HH:mm:ss.000")];
    }
  }
  return [String(values)];
};
