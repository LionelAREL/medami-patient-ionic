import { faUser, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { useQuestionnaireStore } from "../../store";
import IconButton from "../buttons/IconButton";

type ThirdPartySelectorProps = {
  value?: string;
  onChange?: (val: string) => void;
};

const ThirdPartySelector = ({ value, onChange }: ThirdPartySelectorProps) => {
  const { advance } = useQuestionnaireStore();
  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <IconButton
        icon={faUser}
        onClick={() => {
          onChange?.("me");
          advance();
        }}
        selected={value === "me"}
      >
        Moi
      </IconButton>
      <IconButton
        icon={faUserGroup}
        onClick={() => {
          onChange?.("other");
          advance();
        }}
        selected={value === "other"}
      >
        Quelqu’un d’autre
      </IconButton>
    </div>
  );
};

export default ThirdPartySelector;
