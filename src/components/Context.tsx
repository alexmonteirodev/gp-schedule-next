"use client";
import React, { ReactNode } from "react";
import CalendarGenerate, { CalendarType } from "./CalendarGenerate";

type CalendarContextType = {
  calendar: CalendarType | null;
  currentMonth: number | null;
  setCurrentMonth: React.Dispatch<React.SetStateAction<number | null>>;
  checked: string;
  setChecked: React.Dispatch<React.SetStateAction<string>>;
  rotated: boolean;
  setRotated: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CalendarContext = React.createContext<CalendarContextType | null>(
  null
);

const feriadosSpain2025 = [
  "2025-01-01",
  "2025-01-06",
  "2025-04-17",
  "2025-04-18",
  "2025-05-01",
  "2025-08-15",
  "2025-10-12",
  "2025-11-01",
  "2025-12-06",
  "2025-12-08",
  "2025-12-25",
];

export const CalendarProvider = ({ children }: { children: ReactNode }) => {
  const [calendar, setCalendar] = React.useState<CalendarType | null>(null);
  const [currentMonth, setCurrentMonth] = React.useState<number | null>(null);
  const [checked, setChecked] = React.useState("morning");
  const [rotated, setRotated] = React.useState(false);

  React.useEffect(() => {
    const actualCalendar = CalendarGenerate(
      new Date().getFullYear(),
      feriadosSpain2025
    );
    setCalendar(actualCalendar);
  }, []);
  return (
    <CalendarContext.Provider
      value={{
        calendar,
        currentMonth,
        setCurrentMonth,
        checked,
        setChecked,
        rotated,
        setRotated,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};
