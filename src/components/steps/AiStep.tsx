import { Form, FormInstance } from "antd";
import { CurrStep, StepConfig, useQuestionnaireStore } from "../../store";
import Label from "../common/Label";
import SelectDate from "../form/SelectDate";
import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GetAiResponse } from "./../../graphql/queries/ai.graphql";
import {
  AiResponseType,
  DateFormatType,
  GetAiResponseQuery,
} from "../../graphql/generated/graphql";
import ConditionalStep from "./ConditionalStep";
import TextQuestion from "./TextQuestion";
import DateQuestion from "./DateQuestion";
import RadioQuestion from "./RadioQuestion";

type AiStepProps = {
  form: FormInstance<unknown> | undefined;
  currStep: CurrStep;
  stepConfig: StepConfig | null;
  subStep: number;
};

const AiStep = ({ stepConfig, currStep, subStep, form }: AiStepProps) => {
  const setState = useQuestionnaireStore.setState;
  const { advance } = useQuestionnaireStore();
  const { id, maxQuestions } = currStep as Extract<
    CurrStep,
    { __typename: "QuestionnaireAi" }
  >;

  const { loading, data } = useQuery<GetAiResponseQuery>(GetAiResponse, {
    variables: {
      questionnaireId: id,
      questionIndex: subStep,
    },
  });

  const hint = data?.aiResponse?.hint;
  const placeholder = data?.aiResponse?.placeholder;
  const fieldName = data?.aiResponse?.name ?? "";
  const choices = data?.aiResponse?.choices;

  useEffect(() => {
    const fieldName = data?.aiResponse?.name ?? "";
    if (fieldName) {
      setState((state) => ({
        stepConfig: {
          ...(state.stepConfig as StepConfig),
          fieldName,
        },
      }));
    }

    if (data?.aiResponse?.type === AiResponseType.Finished) {
      console.log("finished");
      setState({ currSubStep: maxQuestions ?? 5 });
      advance(true);
    }
  }, [data]);

  if (loading) {
    return <div>loading</div>;
  }

  switch (data?.aiResponse?.type) {
    case AiResponseType.Boolean:
      return (
        <ConditionalStep
          currStep={{ hint, __typename: "QuestionnaireCondition" } as CurrStep}
          stepConfig={{ fieldName } as StepConfig}
          form={form}
        />
      );
    case AiResponseType.Text:
      return (
        <TextQuestion
          currStep={
            { hint, __typename: "TextQuestion", placeholder } as CurrStep
          }
          stepConfig={{ fieldName } as StepConfig}
          form={form}
        />
      );
    case AiResponseType.Date:
      return (
        <DateQuestion
          currStep={
            {
              __typename: "DateQuestion",
              hint,
              dateType: DateFormatType.DateOnly,
            } as CurrStep
          }
          stepConfig={{ fieldName } as StepConfig}
          form={form}
        />
      );
    case AiResponseType.SingleChoice:
      return (
        <RadioQuestion
          currStep={
            {
              __typename: "RadioQuestion",
              hint,
              choices: choices?.map((choice) => ({
                label: choice,
                medicalLabel: choice,
                __typename: "QuestionItem",
              })),
            } as CurrStep
          }
          stepConfig={{ fieldName } as StepConfig}
          form={form}
        />
      );
    case AiResponseType.MultipleChoices:
      return (
        <RadioQuestion
          currStep={
            {
              __typename: "CheckboxQuestion",
              hint,
              choices: choices?.map((choice) => ({
                label: choice,
                medicalLabel: choice,
                __typename: "QuestionItem",
              })),
            } as CurrStep
          }
          stepConfig={{ fieldName } as StepConfig}
          form={form}
        />
      );
    case AiResponseType.Finished:
      return <div></div>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {JSON.stringify(data)}
    </div>
  );
};

export default AiStep;
