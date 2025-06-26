import { useQuestionnaireStore } from "../../store";
import ThirdPartyButton from "../buttons/ThirdPartyButton";

type ThirdPartySelectorProps = {
  value?: string;
  onChange?: (val: string) => void;
};

const ThirdPartySelector = ({ value, onChange }: ThirdPartySelectorProps) => {
  const { advance } = useQuestionnaireStore();
  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <ThirdPartyButton
        variant="me"
        onClick={() => {
          onChange?.("me");
          advance();
        }}
        selected={value === "me"}
      />
      <ThirdPartyButton
        variant="other"
        onClick={() => {
          onChange?.("other");
          advance();
        }}
        selected={value === "other"}
      />
    </div>
  );
};

export default ThirdPartySelector;
