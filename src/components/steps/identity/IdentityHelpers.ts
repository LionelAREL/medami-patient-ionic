import { FormInstance } from "antd";
import { IdentityField } from "../../../graphql/generated/graphql";
import { CurrStep, StepConfig } from "../../../store";

export enum IdentitySubStep {
  AuthenticationChoice = "authenticationChoice",
  SignIn = "signIn",
  SignUp = "signUp",
  FirstName = "firstName",
  LastName = "lastName",
  BirthName = "birthName",
  Gender = "gender",
  Birthdate = "birthdate",
  ContactEmail = "contactEmail",
  PostalCode = "postalCode",
  City = "city",
  AdditionalAddressInfo = "additionalAddressInfo",
  Phone = "phone",
}

export const identityFieldToSubStep: Record<IdentityField, IdentitySubStep> = {
  [IdentityField.FirstName]: IdentitySubStep.FirstName,
  [IdentityField.LastName]: IdentitySubStep.LastName,
  [IdentityField.Birthdate]: IdentitySubStep.Birthdate,
  [IdentityField.Gender]: IdentitySubStep.Gender,
  [IdentityField.Phone]: IdentitySubStep.Phone,
  [IdentityField.PostalCode]: IdentitySubStep.PostalCode,
  [IdentityField.City]: IdentitySubStep.City,
  [IdentityField.AdditionalAddressInfo]: IdentitySubStep.AdditionalAddressInfo,
  [IdentityField.ContactEmail]: IdentitySubStep.ContactEmail,
  [IdentityField.BirthName]: IdentitySubStep.BirthName,
};

export const IdentitySubStepLabel: Record<IdentitySubStep, string> = {
  [IdentitySubStep.AuthenticationChoice]: "Identity - AuthenticationChoice",
  [IdentitySubStep.SignIn]: "Identity - SignIn",
  [IdentitySubStep.SignUp]: "Identity - SignUp",
  [IdentitySubStep.FirstName]: "Identity - FirstName",
  [IdentitySubStep.LastName]: "Identity - LastName",
  [IdentitySubStep.BirthName]: "Identity - BirthName",
  [IdentitySubStep.Gender]: "Identity - Gender",
  [IdentitySubStep.Birthdate]: "Identity - Birthdate",
  [IdentitySubStep.ContactEmail]: "Identity - ContactEmail",
  [IdentitySubStep.PostalCode]: "Identity - PostalCode",
  [IdentitySubStep.City]: "Identity - City",
  [IdentitySubStep.AdditionalAddressInfo]: "Identity - AdditionalAddressInfo",
  [IdentitySubStep.Phone]: "Identity - Phone",
};

export const getFields = (
  currStep: CurrStep,
  form: Record<string, unknown>
) => {
  const fields =
    (currStep as Extract<CurrStep, { __typename: "QuestionnaireIdentity" }>)
      .fields ??
    Object.values(IdentityField).filter(
      (field) => field !== IdentityField.BirthName
    );

  const gender = form["gender"];

  if (gender !== "female") {
    return fields;
  }

  const genderIndex = fields.findIndex(
    (field) => field === IdentityField.Gender
  );

  if (genderIndex !== -1) {
    fields.splice(genderIndex, 0, IdentityField.BirthName);
  }

  return fields;
};

export const getInnerStep = (
  subStep: number,
  stepConfig: StepConfig | null,
  currStep: CurrStep,
  form: Record<string, unknown>
): IdentitySubStep => {
  const withAuthentication =
    (currStep as Extract<CurrStep, { __typename: "QuestionnaireIdentity" }>)
      .withAuthentication ?? true;

  const fields = getFields(currStep, form);
  const isConnection = !!form["isConnection"];
  console.log("isConnection");
  console.log(isConnection);

  if (!withAuthentication) {
    return identityFieldToSubStep[fields[subStep - 1]];
  }

  if (subStep == 1) {
    return IdentitySubStep.AuthenticationChoice;
  }

  if (isConnection) {
    return IdentitySubStep.SignIn;
  } else {
    if (subStep == stepConfig?.innerSteps) {
      return IdentitySubStep.SignUp;
    } else {
      return identityFieldToSubStep[fields[subStep - 2]];
    }
  }
};

export const getInnerSteps = (
  currStep: CurrStep,
  form: Record<string, unknown>
) => {
  const withAuthentication =
    (currStep as Extract<CurrStep, { __typename: "QuestionnaireIdentity" }>)
      .withAuthentication ?? true;

  const fields = getFields(currStep, form);

  const isConnection = !!form["isConnection"];
  if (withAuthentication) {
    if (isConnection) {
      return 2;
    } else {
      return fields.length + 2;
    }
  } else {
    return fields.length;
  }
};
