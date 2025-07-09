export type PeriodOptionType = {
  id: string;
  color: string;
  label: string;
  textColor: string;
  hours: number;
};

export const defaultOptions: PeriodOptionType[] = [
  {
    id: "morning",
    label: "Morning",
    color: "#FDC800",
    textColor: "var(--color-base-900)",
    hours: 7,
  },
  {
    id: "afternoon",
    label: "Afternoon",
    color: "#00C950",
    textColor: "var(--color-base-100)",
    hours: 8,
  },
  {
    id: "night",
    label: "Night",
    color: "#165DFB",
    textColor: "var(--color-base-100)",
    hours: 9,
  },
  // {
  //   id: "sick",
  //   label: "Sick",
  //   color: "#5D0EC1",
  //   textColor: "var(--color-base-100)",
  //   hours: 0,
  // },
  // {
  //   id: "ingles",
  //   label: "ingles",
  //   color: "#F54900",
  //   textColor: "var(--color-base-100)",
  //   hours: 9,
  // },
  // {
  //   id: "psicologo",
  //   label: "psicologo",
  //   color: "#9810FA",
  //   textColor: "var(--color-base-100)",
  //   hours: 9,
  // },
];
