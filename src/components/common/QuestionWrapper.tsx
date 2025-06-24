import React, { useEffect } from "react";
import ResponsiveImage from "./ResponsiveImage";
import Box from "./Box";
import useStepImageWidth from "../../utils/hooks/useStepImageWidth";
import { Form, FormInstance } from "antd";
import { useForm } from "antd/es/form/Form";
import { useQuestionnaireStore } from "../../store";

type QuestionWrapperProps = {
  image?: string;
  children: (form: FormInstance) => React.ReactNode;
};

const QuestionWrapper = ({ image, children }: QuestionWrapperProps) => {
  const { formValues, setFormValues } = useQuestionnaireStore();
  const width = useStepImageWidth();

  const [form] = useForm();

  useEffect(() => {
    form.setFieldsValue(formValues);
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {image && <ResponsiveImage src={image} width={width} />}
        <Box style={{ width: "90vw", maxWidth: "400px" }}>
          <Form
            form={form}
            onValuesChange={(values) => {
              console.log("onValuesChange", values);
              setFormValues(values);
            }}
          >
            {children(form)}
          </Form>
        </Box>
      </div>
    </div>
  );
};

export default QuestionWrapper;
