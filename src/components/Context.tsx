"use client";
import React, { ReactNode } from "react";
import CalendarGenerate, { CalendarType } from "./CalendarGenerate";
import { defaultOptions, PeriodOptionType } from "@/components/PeriodOptions";

type CalendarContextType = {
  calendar: CalendarType | null;
  currentMonth: number | null;
  setCurrentMonth: React.Dispatch<React.SetStateAction<number | null>>;
  checked: string;
  setChecked: React.Dispatch<React.SetStateAction<string>>;
  rotated: boolean;
  setRotated: React.Dispatch<React.SetStateAction<boolean>>;
  options: PeriodOptionType[];
  setOptions: React.Dispatch<React.SetStateAction<PeriodOptionType[]>>;
  hours: number[];
  setHours: React.Dispatch<React.SetStateAction<number[]>>;
};

const CalendarContext = React.createContext<CalendarContextType | null>(null);

export const useCalendarContext = () => {
  const context = React.useContext(CalendarContext);
  if (context === null) throw new Error("Provider não encontrado");
  return context;
};

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
  const [options, setOptions] =
    React.useState<PeriodOptionType[]>(defaultOptions);
  const [hours, setHours] = React.useState<number[]>(new Array(12).fill(0));

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
        options,
        setOptions,
        hours,
        setHours,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};
