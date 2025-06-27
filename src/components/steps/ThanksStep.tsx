import React from "react";
import { constant } from "../../styles/constants";
import Title from "../common/Title";

const ThanksStep = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        ...constant.textInputStyle,
      }}
    >
      <Title type="h2" style={{ alignSelf: "center", marginBottom: 20 }}>
        Merci !
      </Title>
      <div>
        Le questionnaire prendra fin automatiquement dans quelques secondes
      </div>
    </div>
  );
};

export default ThanksStep;
