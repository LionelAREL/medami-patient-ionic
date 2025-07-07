import React, { useState } from "react";
import { Form, Input } from "antd";
import Label from "../../common/Label";
import { constant } from "../../../styles/constants";
import Password from "antd/es/input/Password";
import { useQuestionnaireStore } from "../../../store";

type IdentityAuthFormProps = {
  fieldName: string;
  label: string;
  labelButton: string;
  onClickButton: () => void;
};

const IdentityAuthForm = ({
  label,
  labelButton,
  fieldName,
  onClickButton,
}: IdentityAuthFormProps) => {
  const { advance } = useQuestionnaireStore();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <Label>{label}</Label>
      <Form.Item
        validateStatus="success"
        name={`${fieldName}Email`}
        rules={[
          {
            required: true,
            message: "",
          },
          {
            type: "email",
            message: "Veuillez entrer un email valide",
          },
        ]}
      >
        <Input
          variant="underlined"
          placeholder="Email"
          onPressEnter={() => advance()}
        />
      </Form.Item>
      <Form.Item
        validateStatus="success"
        name={`${fieldName}Password`}
        rules={[
          {
            required: true,
            message: "",
          },
          {
            type: "string",
            min: 8,
            message: "Le mot de passe doit comporter au moins 8 caractères.",
          },
        ]}
      >
        <Password
          variant="underlined"
          placeholder="Mot de passe"
          onPressEnter={() => advance()}
        />
      </Form.Item>
      <div
        onClick={onClickButton}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          cursor: "pointer",
          padding: "5px",
          borderRadius: "50px",
          fontSize: 14,
          alignSelf: "end",
          backgroundColor: isHovered ? constant.lightBackground : "transparent",
          transition: "background-color 0.2s ease",
        }}
      >
        {labelButton}
      </div>
    </div>
  );
};

export default IdentityAuthForm;
