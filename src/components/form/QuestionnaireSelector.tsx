import { CurrStep, useQuestionnaireStore } from "../../store";
import Input from "antd/es/input/Input";
import { constant } from "../../styles/constants";
import Box from "../common/Box";
import { useState } from "react";

type QuestionnaireSelectorProps = {
  value?: Extract<
    CurrStep,
    { __typename: "QuestionnaireSelectMenu" }
  >["entries"];
  onChange?: (
    val: Extract<CurrStep, { __typename: "QuestionnaireSelectMenu" }>["entries"]
  ) => void;
  entries: Extract<
    CurrStep,
    { __typename: "QuestionnaireSelectMenu" }
  >["entries"];
  placeholder: string | null | undefined;
};
const QuestionnaireSelector = ({
  value,
  onChange,
  entries,
  placeholder,
}: QuestionnaireSelectorProps) => {
  const { advance } = useQuestionnaireStore();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [search, setSearch] = useState<string>("");
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "0",
        maxHeight: "calc(100vh - 250px)",
        width: "90vw",
        maxWidth: "400px",
      }}
    >
      <div style={{ padding: constant.paddingMedium }}>
        <Input
          onChange={(event) => setSearch(event.target.value)}
          value={search}
          variant="underlined"
          placeholder={placeholder ?? "Recherchez vos affections par mot clef"}
        />
      </div>
      <div style={{ overflowY: "auto" }}>
        {entries
          .filter((entry) =>
            entry.keywords
              ?.toLocaleLowerCase()
              ?.includes(search.toLocaleLowerCase())
          )
          .map((entry, index) => {
            const { label } = entry;
            const isSelected = !!value?.find((entry) => entry.label === label);
            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  borderTop: `solid ${constant.listSeparator} 1px`,
                  padding: constant.paddingSmall,
                  cursor: "pointer",
                  backgroundColor: isSelected
                    ? constant.primaryColor
                    : hoveredIndex === index
                      ? constant.background
                      : "transparent",
                  color: isSelected ? constant.white : constant.primaryColor,
                }}
                onClick={() => {
                  if (!isSelected) {
                    onChange?.([...(value ?? []), entry]);
                  } else {
                    onChange?.(
                      value?.filter((entry) => entry.label !== label) ?? []
                    );
                  }
                }}
              >
                {label}
              </div>
            );
          })}
      </div>
    </Box>
  );
};

export default QuestionnaireSelector;
