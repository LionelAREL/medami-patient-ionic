import React, { useState, useEffect } from "react";
import NavigationButton from "./buttons/NavigationButton";
import { Display, useFitsIn } from "../utils/hooks/useFitsIn";
import { useQuestionnaireStore } from "../store";

const Footer = () => {
  const isFull = useFitsIn(Display.TABLET);
  const { currStep, advance, back, stepConfig } = useQuestionnaireStore();
  const canAdvanceAsync = useQuestionnaireStore((s) => s.canAdvance);
  const formValues = useQuestionnaireStore((s) => s.formValues);
  const isLoading = useQuestionnaireStore((s) => s.isLoading);

  const [canAdvance, setCanAdvance] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const ok = await canAdvanceAsync();
        if (active) setCanAdvance(ok);
      } catch {
        if (active) setCanAdvance(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [currStep, formValues, isLoading, canAdvanceAsync, stepConfig]);

  if (currStep?.__typename === "NotFoundStep") return null;
  if (currStep?.__typename === "DoctorSelectionStep") return null;

  const baseStyle = {
    display: "flex",
    flexDirection: "row" as const,
    justifyContent: "center" as const,
    position: "absolute" as const,
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: isFull ? 0 : "60px",
  };
  if (currStep?.__typename === "QuestionnaireWelcomeStep") {
    return (
      <div style={baseStyle}>
        <NavigationButton
          variant="primary"
          isFull={isFull}
          onClick={() => advance()}
        >
          Démarrer
        </NavigationButton>
      </div>
    );
  }
  if (currStep?.__typename === "ThanksStep") {
    return (
      <div style={baseStyle}>
        <NavigationButton
          variant="primary"
          isFull={isFull}
          onClick={() => advance()}
        >
          Terminer
        </NavigationButton>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingBottom: isFull ? 0 : "60px",
      }}
    >
      <NavigationButton
        variant="secondary"
        isFull={isFull}
        onClick={() => back()}
      >
        Retour
      </NavigationButton>
      <NavigationButton
        isFull={isFull}
        disabled={!canAdvance}
        onClick={() => advance()}
      >
        Suivant
      </NavigationButton>
    </div>
  );
};

export default Footer;
