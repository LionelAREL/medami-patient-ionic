import { DatePicker, Form, FormInstance, TimePicker } from "antd";
import { CurrStep, StepConfig, useQuestionnaireStore } from "../../store";
import Label from "../common/Label";
import { DateFormatType } from "../../graphql/generated/graphql";

type DateQuestionProps = {
  form: FormInstance<unknown> | undefined;
  currStep: CurrStep;
  stepConfig: StepConfig | null;
};

const DateQuestion = ({ currStep, stepConfig }: DateQuestionProps) => {
  const hint = (currStep as Extract<CurrStep, { __typename: "DateQuestion" }>)
    .hint;
  const dateType =
    (currStep as Extract<CurrStep, { __typename: "DateQuestion" }>).dateType ??
    DateFormatType.DateOnly;
  const { advance } = useQuestionnaireStore();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
      }}
    >
      <Label>{hint}</Label>
      <Form.Item name={stepConfig?.fieldName}>
        {dateType === DateFormatType.DateOnly && (
          <DatePicker
            variant="underlined"
            format="DD/MM/YYYY"
            placeholder="01/02/03"
            onChange={() => {
              advance();
            }}
            style={{ backgroundColor: "transparent" }}
            needConfirm={false}
          />
        )}
        {dateType === DateFormatType.DateAndHour && (
          <DatePicker
            variant="underlined"
            format="DD/MM/YYYY HH:mm:ss"
            placeholder="01/02/03 04:05:06"
            showTime
            onChange={() => {
              advance();
            }}
            needConfirm={false}
            style={{ backgroundColor: "transparent" }}
          />
        )}
        {dateType === DateFormatType.HourOnly && (
          <TimePicker
            needConfirm={false}
            onChange={() => {
              advance();
            }}
            placeholder="01:02:03"
            variant="underlined"
            style={{ backgroundColor: "transparent" }}
          />
        )}
      </Form.Item>
    </div>
  );
};

export default DateQuestion;
