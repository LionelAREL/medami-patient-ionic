import React, { useEffect } from "react";
import ResponsiveImage from "./ResponsiveImage";
import Box from "./Box";
import useStepImageWidth from "../../utils/hooks/useStepImageWidth";
import { Form, FormInstance } from "antd";
import { useForm } from "antd/es/form/Form";
import { useQuestionnaireStore } from "../../store";
import { Display, useFitsIn } from "../../utils/hooks/useFitsIn";

type QuestionWrapperProps = {
  image?: string;
  children: (form: FormInstance) => React.ReactNode;
  bottomChildren?: (form: FormInstance) => React.ReactNode;
  isExpandLogo?: boolean;
};

const QuestionWrapper = ({
  image,
  children,
  isExpandLogo = false,
}: QuestionWrapperProps) => {
  const { formValues, setFormValues, setForm } = useQuestionnaireStore();
  const isMobile = useFitsIn(Display.MOBILE);
  const width = useStepImageWidth();

  const [form] = useForm();

  useEffect(() => {
    form.setFieldsValue(formValues);
  }, []);
  useEffect(() => {
    setForm(form);
  }, [form]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isExpandLogo ? (isMobile ? "column" : "row") : "column",
        alignItems: "center",
      }}
    >
      {image && (
        <ResponsiveImage
          src={image}
          width={!isMobile && isExpandLogo ? 400 : width}
        />
      )}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Box
          style={{
            width: "90vw",
            maxWidth: "400px",
            overflowY: "auto",
          }}
        >
          <Form
            form={form}
            onValuesChange={(values) => {
              // console.log("onValuesChange", values);
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
