import { Select } from "antd";
import React, { useEffect, useState } from "react";
import { formatDateTime } from "../../utils/date";

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
};

const AppointmentDate = ({ onChange }: AppointmentDateProps) => {
  const today = new Date();
  const defaultDay = today.getDate();
  const defaultMonth = today.getMonth();
  const defaultYear = today.getFullYear();

  const [day, setDay] = useState<number>(defaultDay);
  const [month, setMonth] = useState<number>(defaultMonth);
  const [year, setYear] = useState<number>(defaultYear);

  useEffect(() => {
    onChange?.(formatDateTime(new Date(year, month, day)));
  }, [day, month, year]);

  return (
    <div style={{ display: "flex" }}>
      <Select
        variant="underlined"
        placeholder="Jour"
        value={day}
        onChange={(value) => {
          setDay(value);
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
        }}
        options={years.map((year) => ({
          label: year,
          value: year,
        }))}
      />
    </div>
  );
};

export default AppointmentDate;
