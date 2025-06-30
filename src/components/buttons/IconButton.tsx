import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { constant } from "../../styles/constants";

type IconbuttonProps = React.PropsWithChildren<{
  icon: IconDefinition;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  selected: boolean;
}>;

const IconButton = ({ icon, onClick, selected, children }: IconbuttonProps) => {
  const [hover, setHover] = useState(false);

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
      <FontAwesomeIcon icon={icon} size="2xl" color={color} />
      <div
        style={{
          color,
          fontSize: hover ? 14 : 12,
          transition: "font-size 0.2s ease",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default IconButton;
