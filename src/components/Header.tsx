import fullLogo from "@/assets/images/logo.png";
import icon from "@/assets/images/icon.png";
import flag from "@/assets/images/flag_fr.png";
import ResponsiveImage from "./common/ResponsiveImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareXmark } from "@fortawesome/free-solid-svg-icons";
import { constant } from "../styles/constants";
import { Display, useFitsIn } from "../utils/hooks/useFitsIn";
import { useQuestionnaireStore } from "../store";

const Header = () => {
  const { reset, visitedSteps, hasDoctorSelectionScreen } =
    useQuestionnaireStore();
  const isShortLogo = useFitsIn(Display.TINY_MOBILE);
  const isFirstStep = visitedSteps.length === 0;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingInline: "10px",
        paddingTop: "10px",
      }}
    >
      {isShortLogo ? (
        <ResponsiveImage src={icon} width={50} />
      ) : (
        <ResponsiveImage src={fullLogo} width={250} />
      )}
      <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
        {hasDoctorSelectionScreen ||
          (!isFirstStep && (
            <FontAwesomeIcon
              style={{ cursor: "pointer" }}
              size="3x"
              icon={faSquareXmark}
              color={constant.secondaryColor}
              onClick={() => reset()}
            />
          ))}
        <ResponsiveImage src={flag} />
      </div>
    </div>
  );
};

export default Header;
