import {
  faMars,
  faVenus,
  faVenusMars,
} from "@fortawesome/free-solid-svg-icons";
import { useQuestionnaireStore } from "../../store";
import IconButton from "../buttons/IconButton";

type GenderSelectorProps = {
  value?: string;
  onChange?: (val: string) => void;
};

const GenderSelector = ({ value, onChange }: GenderSelectorProps) => {
  const { advance } = useQuestionnaireStore();
  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <IconButton
        icon={faMars}
        onClick={() => {
          onChange?.("male");
          advance();
        }}
        selected={value === "male"}
      >
        Un homme
      </IconButton>
      <IconButton
        icon={faVenus}
        onClick={() => {
          onChange?.("female");
          advance();
        }}
        selected={value === "female"}
      >
        Une femme
      </IconButton>
      <IconButton
        icon={faVenusMars}
        onClick={() => {
          onChange?.("other");
          advance();
        }}
        selected={value === "other"}
      >
        Autre
      </IconButton>
    </div>
  );
};

export default GenderSelector;
