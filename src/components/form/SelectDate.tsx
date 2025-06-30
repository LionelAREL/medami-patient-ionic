import { Select } from "antd";
import React, { useEffect, useState } from "react";
import { formatDateTime } from "../../utils/date";
import { useQuestionnaireStore } from "../../store";

const months: string[] = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

const currentYear = new Date().getFullYear();

const years: number[] = [currentYear - 1, currentYear, currentYear + 1];

type AppointmentDateProps = {
  value?: string;
  onChange?: (val: string) => void;
  isDefaultDate?: boolean;
  isAllYear?: boolean;
};

const SelectDate = ({
  onChange,
  isDefaultDate = true,
  isAllYear = false,
  value,
}: AppointmentDateProps) => {
  const { advance } = useQuestionnaireStore();
  const today = new Date();
  const defaultDay = today.getDate();
  const defaultMonth = today.getMonth();
  const defaultYear = today.getFullYear();

  const tryAdvance = (d?: number, m?: number, y?: number) => {
    if (d != null && m != null && y != null) {
      const formatted = formatDateTime(new Date(y, m, d));
      onChange?.(formatted);
      advance();
    }
  };

  const [day, setDay] = useState<number | undefined>(() => {
    if (value) return new Date(value).getDate();
    return isDefaultDate ? defaultDay : undefined;
  });
  const [month, setMonth] = useState<number | undefined>(() => {
    if (value) return new Date(value).getMonth();
    return isDefaultDate ? defaultMonth : undefined;
  });
  const [year, setYear] = useState<number | undefined>(() => {
    if (value) return new Date(value).getFullYear();
    return isDefaultDate ? defaultYear : undefined;
  });

  useEffect(() => {
    if (value) {
      const d = new Date(value);
      setDay(d.getDate());
      setMonth(d.getMonth());
      setYear(d.getFullYear());
    }
  }, [value]);

  useEffect(() => {
    if (
      typeof day === "number" &&
      typeof month === "number" &&
      typeof year === "number"
    ) {
      const formatted = formatDateTime(new Date(year, month, day));
      onChange?.(formatted);
    }
  }, [day, month, year]);

  return (
    <div style={{ display: "flex" }}>
      <Select
        variant="underlined"
        placeholder="Jour"
        value={day}
        onChange={(value) => {
          setDay(value);
          tryAdvance(value, month, year);
        }}
        options={Array.from({ length: 31 }, (_, i) => i + 1).map((day) => ({
          label: day,
          value: day,
        }))}
      />
      <Select
        variant="underlined"
        value={month}
        onChange={(value) => {
          setMonth(value);
          tryAdvance(day, value, year);
        }}
        options={months.map((month, index) => ({
          label: month,
          value: index,
        }))}
        placeholder="Mois"
      />
      <Select
        placeholder="Année"
        variant="underlined"
        value={year}
        onChange={(value) => {
          setYear(value);
          tryAdvance(day, month, value);
        }}
        options={
          isAllYear
            ? Array.from({ length: 150 }, (_, i) => currentYear - i + 1).map(
                (day) => ({
                  label: day,
                  value: day,
                })
              )
            : years.map((year) => ({
                label: year,
                value: year,
              }))
        }
      />
    </div>
  );
};

export default SelectDate;
