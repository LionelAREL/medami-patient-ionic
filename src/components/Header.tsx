import fullLogo from "@/assets/images/logo.png";
import icon from "@/assets/images/icon.png";
import flag from "@/assets/images/flag_fr.png";
import ResponsiveImage from "./common/ResponsiveImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareXmark, faWarning } from "@fortawesome/free-solid-svg-icons";
import { constant } from "../styles/constants";
import { Display, useFitsIn } from "../utils/hooks/useFitsIn";
import { useQuestionnaireStore } from "../store";
import { Flex } from "antd";
import TextStyle from "./common/Text";
import { SubscriptionPlan } from "../graphql/generated/graphql";
import { motion } from "motion/react";

const Header = () => {
  const {
    reset,
    visitedSteps,
    hasDoctorSelectionScreen,
    institution,
    currStep,
  } = useQuestionnaireStore();
  const isShortLogo = useFitsIn(Display.TINY_MOBILE);
  const isMobile = useFitsIn(Display.MOBILE);
  const isTablet = useFitsIn(Display.TABLET);
  const isFirstStep = visitedSteps.length === 0;

  return (
    <>
      {institution?.subscriptionPlan === SubscriptionPlan.Demo && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: constant.white,
            boxShadow: constant.defaultShadow.css,
            gap: 10,
            paddingTop: 5,
            paddingBottom: 5,
          }}
        >
          <FontAwesomeIcon
            icon={faWarning}
            color={constant.warning}
            size="xl"
          />
          <TextStyle style={{ fontWeight: 700 }}>
            Vous êtes actuellement sur une version de démonstration.
          </TextStyle>
          <FontAwesomeIcon
            icon={faWarning}
            color={constant.warning}
            size="xl"
          />
        </div>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingInline: "20px",
          paddingTop: "20px",
        }}
      >
        <div></div>
        {isShortLogo ? (
          <ResponsiveImage
            src={icon}
            height={40}
            style={{ display: "block", position: "absolute" }}
          />
        ) : (
          <motion.img
            src={fullLogo}
            alt="logo"
            initial={{ x: 0, y: 0, height: 40 }}
            animate={
              currStep?.__typename === "QuestionnaireWelcomeStep" && !isMobile
                ? { x: "-50%", left: "50%", y: !isTablet ? 100 : 0, height: 80 }
                : { x: 0, y: 0, height: 40 }
            }
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{
              position: "absolute",
            }}
          />
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "20px",
            alignItems: "center",
          }}
        >
          {(hasDoctorSelectionScreen || !isFirstStep) && (
            <FontAwesomeIcon
              style={{ cursor: "pointer", height: isMobile ? 40 : 48 }}
              icon={faSquareXmark}
              color={constant.secondaryColor}
              onClick={() => reset()}
            />
          )}
          <ResponsiveImage height={isMobile ? 40 : 48} src={flag} />
        </div>
      </div>
    </>
  );
};

export default Header;
