type DayType = {
  id: string;
  number: number;
  weekday: number;
  isHoliday: boolean;
};

type MonthType = {
  month: number;
  monthName: string;
  year: number;
  days: (DayType | null)[];
};

export type CalendarType = {
  year: number;
  months: MonthType[];
};

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const adjustedWeekday = (jsDay: number) => (jsDay === 0 ? 6 : jsDay - 1);

const CalendarGenerate = (year: number, holidays: string[]): CalendarType => {
  const months: MonthType[] = [];

  for (let m = 0; m < 12; m++) {
    const days: (DayType | null)[] = [];
    const daysInMonth = new Date(year, m + 1, 0).getDate();

    const firstDay = new Date(year, m, 1);
    const firstDayWeekday = adjustedWeekday(firstDay.getDay());

    // Nulls para alinhar o começo na segunda
    for (let i = 0; i < firstDayWeekday; i++) {
      days.push(null);
    }

    // Dias do mês
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, m, d);
      const pad = (n: number) => n.toString().padStart(2, "0");
      const id = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
        date.getDate()
      )}`;

      days.push({
        id,
        number: d,
        weekday: adjustedWeekday(date.getDay()),
        isHoliday: holidays.includes(id),
      });
    }

    // Completar o array para ter 42 itens (6 semanas) com null no fim, para manter layout fixo
    while (days.length < 28) {
      days.push(null);
    }

    months.push({
      month: m + 1,
      monthName: monthNames[m],
      year,
      days,
    });

    // console.log(
    //   `Month ${m + 1}`,
    //   days.map((d) => (d ? d.number : null))
    // );
  }

  return {
    year,
    months,
  };
};

export default CalendarGenerate;

// const calendarExample = {
//   year: 2025,
//   months: [
//     {
//       month: 7,
//       monthName: "Julho",
//       year: 2025,
//       days: [
//         { id: "2025-07-01", number: 1, weekday: 2, isHoliday: false },
//         { id: "2025-07-02", number: 2, weekday: 3, isHoliday: false },
//         { id: "2025-07-09", number: 9, weekday: 3, isHoliday: true },  // feriado exemplo
//         { id: "2025-07-25", number: 25, weekday: 5, isHoliday: false },
//       ],
//     },
//     {
//       month: 8,
//       monthName: "Agosto",
//       year: 2025,
//       days: [
//         { id: "2025-08-01", number: 1, weekday: 5, isHoliday: false },
//         { id: "2025-08-07", number: 7, weekday: 4, isHoliday: true },   // feriado exemplo
//         { id: "2025-08-15", number: 15, weekday: 5, isHoliday: false },
//         { id: "2025-08-31", number: 31, weekday: 0, isHoliday: false },
//       ],
//     },
//   ],
// };
