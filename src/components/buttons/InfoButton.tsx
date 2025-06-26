import React from "react";
import { constant } from "../../styles/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

type InfoButtonProps = React.ComponentProps<"div">;

const InfoButton = (props: InfoButtonProps) => {
  return (
    <div
      style={{
        backgroundColor: constant.primaryColor,
        borderRadius: constant.boxRadius,
        padding: "5px 15px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        ...props.style,
        cursor: "pointer",
      }}
      {...props}
    >
      <FontAwesomeIcon icon={faPaperPlane} color={constant.white} />
      <div style={{ color: constant.white }}>Recevoir par email</div>
    </div>
  );
};

export default InfoButton;
