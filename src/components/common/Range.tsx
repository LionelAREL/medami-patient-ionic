import { useState } from "react";
import { constant } from "../../styles/constants";
import TextStyle from "./Text";

type RangeProps = {
  onChange: (val: number) => void;
  min?: number;
  max?: number;
};

export default function Range({ onChange, min = 5, max = 11 }: RangeProps) {
  const [hover, setHover] = useState<number | null>(null);
  const [value, setValue] = useState<number | null>(null);

  // génère [5,6,7,8,9,10,11]
  const items = Array.from({ length: max - min + 1 }, (_, i) => min + i);

  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      {items.map((num) => {
        const active =
          hover !== null ? num <= hover : value != null ? num <= value : false;
        return (
          <TextStyle
            key={num}
            onClick={() => onChange(num)}
            onMouseEnter={() => setHover(num)}
            onMouseLeave={() => setHover(null)}
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              transition: "all 0.2s ease",
              fontSize: 14,
              fontWeight: 600,

              backgroundColor: active ? constant.secondaryColor : "#e3e3e3",
            }}
          >
            {num}
          </TextStyle>
        );
      })}
    </div>
  );
}
