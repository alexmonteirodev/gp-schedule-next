"use client";
import React, { ReactNode } from "react";
import CalendarGenerate, { CalendarType } from "./CalendarGenerate";
import { defaultOptions, PeriodOptionType } from "@/components/PeriodOptions";
type HourEntry = {
  dayId: string;
  period: string;
};
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
  hours: HourEntry[][] | null;
  setHours: React.Dispatch<React.SetStateAction<HourEntry[][] | null>>;
  totals: number[] | null;
  setTotals: React.Dispatch<React.SetStateAction<number[] | null>>;
  deleted: boolean;
  setDeleted: React.Dispatch<React.SetStateAction<boolean>>;
  newShiftAdded: number;
  setNewShiftAdded: React.Dispatch<React.SetStateAction<number>>;
  dark: boolean;
  setDark: React.Dispatch<React.SetStateAction<boolean>>;
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
  "2025-05-02",
  "2025-05-15",
  "2025-07-25",
  "2025-08-15",
  "2025-11-01",
  "2025-11-10",
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
  const [hours, setHours] = React.useState<HourEntry[][] | null>(null);
  const [totals, setTotals] = React.useState<number[] | null>(null);
  const [deleted, setDeleted] = React.useState(false);
  const [newShiftAdded, setNewShiftAdded] = React.useState(0);
  const [dark, setDark] = React.useState<boolean>(false);

  //0. carrega darkmode no localstorage e aplica tema
  React.useEffect(() => {
    const isDark = localStorage.getItem("darkMode");
    if (isDark !== null) {
      setDark(JSON.parse(isDark));
    } else {
      setDark(false);
    }
  }, [setDark]);

  React.useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [dark]);

  // 1. Carrega os dados do localStorage
  React.useEffect(() => {
    const stored = localStorage.getItem("calendarData");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.hours) setHours(parsed.hours);
        if (parsed.totals) setTotals(parsed.totals);
      } catch (e) {
        console.error("Erro ao carregar do localStorage", e);
      }
    } else {
      // Se não houver dados, inicializa vazio
      setHours(Array.from({ length: 12 }, () => []));
      setTotals(new Array(12).fill(0));
    }
  }, []);

  // 2. Só gera o calendário quando hours estiver carregado
  React.useEffect(() => {
    if (hours !== null && totals !== null) {
      const actualCalendar = CalendarGenerate(
        new Date().getFullYear(),
        feriadosSpain2025
      );
      setCalendar(actualCalendar);
    }
  }, [hours, totals]);

  // 3. Recalcula os totais quando hours mudar
  React.useEffect(() => {
    if (!hours || !options) return;

    const newTotals = hours.map((monthEntries) => {
      return monthEntries.reduce((total, entry) => {
        const option = options.find((opt) => opt.label === entry.period);
        if (!option) {
          console.warn("Turno não encontrado:", entry.period);
          return total;
        }
        return total + option.hours;
      }, 0);
    });

    setTotals(newTotals);
  }, [hours, options]);

  // 4. Salva no localStorage sempre que hours ou totals mudam
  React.useEffect(() => {
    if (hours && totals) {
      const dataToStore = {
        hours,
        totals,
      };
      localStorage.setItem("calendarData", JSON.stringify(dataToStore));
    }
  }, [hours, totals]);

  //5. add user shifts
  React.useEffect(() => {
    const savedShifts = localStorage.getItem("userShiftsList");
    if (savedShifts) {
      try {
        const userShifts: PeriodOptionType[] = JSON.parse(savedShifts);
        setOptions([...defaultOptions, ...userShifts]);
      } catch (err) {
        console.error("Erro ao carregar shifts do localStorage", err);
        setOptions(defaultOptions);
      }
    } else {
      setOptions(defaultOptions);
    }
  }, [deleted, newShiftAdded]);

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
        totals,
        setTotals,
        deleted,
        setDeleted,
        newShiftAdded,
        setNewShiftAdded,
        dark,
        setDark,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};
