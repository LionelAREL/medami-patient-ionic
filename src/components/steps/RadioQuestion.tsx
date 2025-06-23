import { CurrStep, StepConfig, useQuestionnaireStore } from '../../store';
import { Form, FormInstance, Radio } from 'antd';
import { GetStepQuery } from '../../graphql/generated/graphql';

type RadioQuestionProps = {
  form: FormInstance<unknown> | undefined,
  currStep: CurrStep,
  stepConfig: StepConfig | null
}

const RadioQuestion = ({currStep, stepConfig} : RadioQuestionProps) => {
  const { advance } = useQuestionnaireStore()
  const options = (currStep as Extract<GetStepQuery["questionnaireSteps"][number], { __typename: "RadioQuestion" }>).choices.map((choice) => ({
    label: choice.label,
    value: choice.label
  }))
  return (
    <Form.Item name={stepConfig?.fieldName}>
        <Radio.Group onChange={() => advance()} style={{display: "flex", flexDirection: "column"}} options={options} />
    </Form.Item>
  )
}

export default RadioQuestion
