import { useState } from "react";
import Box from "../common/Box";
import { constant } from "../../styles/constants";
import TextStyle from "../common/Text";
import { faSquareCaretRight } from "@fortawesome/free-solid-svg-icons";
import FontAwesomeIconDynamic from "../common/fontAwesome";
import { getCodePoint } from "../../utils/fontAwesome";

export type Choice = {
  icon?: number;
  description?: string;
  name: string;
  key: string;
};

type ListChoiceProps = {
  choices: Array<Choice>;
  onPick: (choice: Choice) => void;
};

const ListChoice = ({ choices, onPick }: ListChoiceProps) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 0,
        overflow: "hidden",
        width: "80%",
        maxWidth: 450,
      }}
    >
      {choices.map((choice, index) => {
        const key = choice.key;
        const isHovered = hoveredId === key;
        const icon = choice.icon ?? getCodePoint(faSquareCaretRight);
        return (
          <div
            key={key}
            onMouseEnter={() => setHoveredId(key)}
            onMouseLeave={() => setHoveredId(null)}
            style={{
              borderBottom:
                index !== choices.length - 1
                  ? `2px solid ${constant.lightBackground}`
                  : undefined,
              padding: constant.paddingSmall,
              backgroundColor: isHovered
                ? constant.secondaryLightColor
                : constant.transparent,
              transition: "background-color 0.2s ease",
              cursor: "pointer",
            }}
            onClick={() => onPick(choice)}
          >
            <div
              style={{
                display: "flex",
                alignItems: "start",
                gap: constant.paddingMedium,
              }}
            >
              <FontAwesomeIconDynamic
                code={icon}
                style={{
                  marginTop: 5,
                  width: 24,
                  fontSize: 24,
                  color: isHovered ? constant.white : constant.secondaryColor,
                }}
              />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <TextStyle
                  style={{
                    fontWeight: 600,
                    fontSize: 22,
                    color: isHovered ? constant.white : constant.primaryColor,
                  }}
                >
                  {choice.name}
                </TextStyle>
                <TextStyle
                  style={{
                    fontSize: 12,
                    color: isHovered ? constant.white : constant.primaryColor,
                  }}
                >
                  {choice.description}
                </TextStyle>
              </div>
            </div>
          </div>
        );
      })}
    </Box>
  );
};

export default ListChoice;
