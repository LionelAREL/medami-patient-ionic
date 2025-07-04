import { Form, FormInstance, Input, Radio } from "antd";
import { CurrStep, StepConfig, useQuestionnaireStore } from "../../../store";
import Label from "../../common/Label";
import { constant } from "../../../styles/constants";
import { IdentityField } from "../../../graphql/generated/graphql";
import { getFields, getInnerStep, IdentitySubStep } from "./IdentityHelpers";
import NavigationButton from "../../buttons/NavigationButton";
import TextStyle from "../../common/Text";
import SelectDate from "../../form/SelectDate";
import GenderSelector from "../../form/GenderSelector";
import IdentityAuthForm from "./IdentityAuthForm";
import { useState } from "react";

type IdentityStepProps = {
  form: FormInstance<unknown> | undefined;
  currStep: CurrStep;
  stepConfig: StepConfig | null;
  subStep: number;
  formValues: Record<string, unknown>;
};

const IdentityStep = ({
  currStep,
  stepConfig,
  form,
  subStep,
  formValues,
}: IdentityStepProps) => {
  const { advance, openInnerStep, isThirdParty } = useQuestionnaireStore();
  const setState = useQuestionnaireStore.setState;
  const [isHoveredConnected, setIsHoveredConnected] = useState(false);
  const [isHoveredNotConnected, setIsHoveredNotConnected] = useState(false);

  const innerStep = getInnerStep(subStep, currStep, formValues);

  switch (innerStep) {
    case IdentitySubStep.AuthenticationChoice:
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          <Label style={{ fontSize: 16, fontWeight: 600 }}>
            Avez vous déjà répondu à un questionnaire MedAmi ?
          </Label>
          <Form.Item name={"isConnection"} style={{ padding: 0 }}></Form.Item>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <NavigationButton
              style={{
                padding: constant.paddingExtraSmall,
                height: "auto",
                fontSize: 14,
                opacity: isHoveredConnected ? 0.8 : 1,
              }}
              onMouseEnter={() => setIsHoveredConnected(true)}
              onMouseLeave={() => setIsHoveredConnected(false)}
              onClick={() => {
                setState((state) => ({
                  formValues: {
                    ...state.formValues,
                    isConnection: true,
                  },
                }));
                advance(true);
              }}
            >
              Oui, je suis déjà venu
            </NavigationButton>
            <TextStyle style={{ fontSize: 12 }}>ou</TextStyle>
            <NavigationButton
              variant="secondary"
              style={{
                padding: constant.paddingExtraSmall,
                height: "auto",
                fontSize: 14,
                opacity: isHoveredNotConnected ? 0.8 : 1,
              }}
              onMouseEnter={() => setIsHoveredNotConnected(true)}
              onMouseLeave={() => setIsHoveredNotConnected(false)}
              onClick={() => {
                setState((state) => ({
                  formValues: {
                    ...state.formValues,
                    isConnection: false,
                  },
                }));
                advance(true);
              }}
            >
              Non, c'est ma première fois
            </NavigationButton>
          </div>
        </div>
      );
    case IdentitySubStep.FirstName:
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Label>
            {isThirdParty
              ? "Quel est le prénom de la personne suivie ?"
              : "Quel est votre prénom ?"}
          </Label>
          <Form.Item name={stepConfig?.fieldName}>
            <Input
              variant="underlined"
              placeholder={"Prénom"}
              onPressEnter={() => advance()}
            />
          </Form.Item>
        </div>
      );
    case IdentitySubStep.LastName:
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Label>
            {isThirdParty
              ? "Quel est le nom de famille de la personne suivie ?"
              : "Quel est votre nom de famille ?"}
          </Label>
          <Form.Item name={stepConfig?.fieldName}>
            <Input
              variant="underlined"
              placeholder={"Nom de famille"}
              onPressEnter={() => advance()}
            />
          </Form.Item>
        </div>
      );
    case IdentitySubStep.Birthdate:
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Label>
            {isThirdParty
              ? "Quelle est la date de naissance de la personne suivie ?"
              : "Quelle est votre date de naissance ?"}
          </Label>
          <Form.Item name={stepConfig?.fieldName}>
            <SelectDate isAllYear={true} isDefaultDate={false} />
          </Form.Item>
        </div>
      );
    case IdentitySubStep.Gender:
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Label>{isThirdParty ? "La personne suivie est" : "Êtes vous"}</Label>
          <Form.Item name={stepConfig?.fieldName}>
            <GenderSelector />
          </Form.Item>
        </div>
      );
    case IdentitySubStep.Phone:
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Label>
            {isThirdParty
              ? "Quel est le numéro de téléphone de la personne suivie ?"
              : "Quel est votre numéro de téléphone ?"}
          </Label>
          <Form.Item
            name={stepConfig?.fieldName}
            rules={[
              {
                validator: (_, value) => {
                  if (!value) {
                    return Promise.resolve();
                  }
                  const regex = /^(?:07\d{8}|\+337\d{8})$/;
                  return regex.test(value)
                    ? Promise.resolve()
                    : Promise.reject(
                        new Error(
                          "Veuillez renseigner un numéro de téléphone valide (0612345678 ou +33612345678)"
                        )
                      );
                },
              },
            ]}
          >
            <Input
              variant="underlined"
              placeholder={"+33612345678 ou 0612345678"}
              onPressEnter={() => advance()}
            />
          </Form.Item>
        </div>
      );
    case IdentitySubStep.ContactEmail:
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Label>
            {isThirdParty
              ? "Quel est l’email de la personne suivie ?"
              : "Quel est votre email ?"}
          </Label>
          <Form.Item
            name={stepConfig?.fieldName}
            rules={[
              {
                type: "email",
                message: "Veuillez entrer un email valide",
              },
            ]}
          >
            <Input
              variant="underlined"
              placeholder={"johndoe@email.com"}
              onPressEnter={() => advance()}
            />
          </Form.Item>
        </div>
      );
    case IdentitySubStep.PostalCode:
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Label>
            {isThirdParty
              ? "Quelle est le code postale de la personne suivie ?"
              : "Quelle est votre code postale ?"}
          </Label>
          <Form.Item
            name={stepConfig?.fieldName}
            rules={[
              {
                pattern: /^[0-9]{5}$/,
                message: "Veuillez entrer un code postal valide (5 chiffres)",
              },
            ]}
          >
            <Input
              variant="underlined"
              placeholder={"31000"}
              onPressEnter={() => advance()}
            />
          </Form.Item>
        </div>
      );
    case IdentitySubStep.City:
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Label>
            {isThirdParty
              ? "Quelle est la ville de résidence de la personne suivie ?"
              : "Quelle est votre ville de résidence ?"}
          </Label>
          <Form.Item name={stepConfig?.fieldName}>
            <Input
              variant="underlined"
              placeholder={"Toulouse"}
              onPressEnter={() => advance()}
            />
          </Form.Item>
        </div>
      );
    case IdentitySubStep.AdditionalAddressInfo:
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Label>
            {isThirdParty
              ? "Quelle est l\'adresse complète de la personne suivie ?"
              : "Quelle est votre adresse complète ?"}
          </Label>
          <Form.Item name={stepConfig?.fieldName}>
            <Input
              variant="underlined"
              placeholder={
                "8 avenue Victor Hugo, Résidence Les Jardins, Apt 34"
              }
              onPressEnter={() => advance()}
            />
          </Form.Item>
        </div>
      );
    case IdentitySubStep.BirthName:
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Label>
            {isThirdParty
              ? "Quel est le nom de naissance de la personne suivie ?"
              : "Quel est votre nom de naissance ?"}
          </Label>
          <Form.Item name={stepConfig?.fieldName}>
            <Input
              variant="underlined"
              placeholder={"Nom de naissance"}
              onPressEnter={() => advance()}
            />
          </Form.Item>
        </div>
      );
    case IdentitySubStep.SignIn:
      return (
        <IdentityAuthForm
          label="Saisissez les identifiants renseignés lors de votre dernière visite"
          labelButton="Je n'ai pas / ne me rappelle pas de mes identifiants"
          onClickButton={() => {
            setState((state) => ({
              formValues: { ...state.formValues, isConnection: false },
            }));
            openInnerStep(2);
          }}
          fieldName={stepConfig!.fieldName}
        />
      );
    case IdentitySubStep.SignUp:
      return (
        <IdentityAuthForm
          label="Afin de gagner du temps la prochaine fois, saisissez un email et un mot de passe"
          labelButton="passer cette étape"
          onClickButton={() => {
            advance(true);
          }}
          fieldName={stepConfig!.fieldName}
        />
      );
    default:
      return <div>{innerStep}</div>;
  }
};

export default IdentityStep;
