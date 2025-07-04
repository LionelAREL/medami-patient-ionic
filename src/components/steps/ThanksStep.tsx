import { constant } from "../../styles/constants";
import Title from "../common/Title";
import { useQuestionnaireStore } from "../../store";

const ThanksStep = () => {
  const { isThirdParty, firstName } = useQuestionnaireStore();
  const message = `Merci ${!isThirdParty ? (firstName ?? "!") : "!"}`;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        ...constant.textInputStyle,
      }}
    >
      <Title type="h2" style={{ alignSelf: "center", marginBottom: 20 }}>
        {message}
      </Title>
      <div>
        Le questionnaire prendra fin automatiquement dans quelques secondes
      </div>
    </div>
  );
};

export default ThanksStep;
