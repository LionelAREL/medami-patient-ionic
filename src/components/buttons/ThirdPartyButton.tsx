import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { constant } from "../../styles/constants";

type ThirdPartyButtonProps = {
  variant?: "me" | "other";
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  selected: boolean;
};

const ThirdPartyButton = ({
  variant = "me",
  onClick,
  selected,
}: ThirdPartyButtonProps) => {
  const [hover, setHover] = useState(false);

  const isMe = variant === "me";
  const color =
    selected || hover ? constant.primaryColor : constant.secondaryColor;

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
        cursor: "pointer",
      }}
    >
      <FontAwesomeIcon
        icon={isMe ? faUser : faUserGroup}
        size="2xl"
        color={color}
      />
      <div
        style={{
          color,
          fontSize: hover ? 14 : 12,
          transition: "font-size 0.2s ease",
        }}
      >
        {isMe ? "Moi" : "Quelqu’un d’autre"}
      </div>
    </div>
  );
};

export default ThirdPartyButton;
