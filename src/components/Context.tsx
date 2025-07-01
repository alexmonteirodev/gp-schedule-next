"use client";
import React, { ReactNode } from "react";
import CalendarGenerate, { CalendarType } from "./CalendarGenerate";

export const CalendarContext = React.createContext<CalendarType | null>(null);

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

  React.useEffect(() => {
    const actualCalendar = CalendarGenerate(
      new Date().getFullYear(),
      feriadosSpain2025
    );
    setCalendar(actualCalendar);
  }, []);
  return (
    <CalendarContext.Provider value={calendar}>
      {children}
    </CalendarContext.Provider>
  );
};
