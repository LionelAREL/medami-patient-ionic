import React, { useEffect, useState } from "react";
import TextStyle from "../common/Text";
import NavigationButton from "../buttons/NavigationButton";
import { useQuestionnaireStore } from "../../store";
import { constant } from "../../styles/constants";

const NetworkErrorStep = () => {
  const [count, setCount] = useState(60);
  const { reset } = useQuestionnaireStore();

  useEffect(() => {
    if (count === 0) {
      reset();
      setCount(60);
      return;
    }

    const timer = setTimeout(() => setCount(count - 1), 1000);
    return () => clearTimeout(timer);
  }, [count]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <TextStyle>
        Une erreur est survenue lors de la synchronisation avec le serveur.
      </TextStyle>
      <TextStyle style={{ fontWeight: 700 }}>
        Veuillez vérifier votre connexion internet.
      </TextStyle>
      <TextStyle>Nouvelle tentative dans {count} secondes.</TextStyle>
      <NavigationButton
        variant="secondary"
        style={{
          fontSize: 15,
          alignSelf: "center",
        }}
        onClick={() => reset()}
      >
        Réessayer maintenant
      </NavigationButton>
    </div>
  );
};

export default NetworkErrorStep;
