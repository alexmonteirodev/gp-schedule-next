"use client";
import React from "react";
import { useCalendarContext } from "./Context";
import Label from "./Label";
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

const CalendarBody = () => {
  const {
    calendar,
    currentMonth,
    setCurrentMonth,
    rotated,
    checked,
    options,
    setHours,
    hours,
  } = useCalendarContext();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const monthRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const observer = React.useRef<IntersectionObserver | null>(null);

  function handleEdit(e: React.TouchEvent<HTMLDivElement>) {
    const el = e.currentTarget;

    const period = options.find((opt) => opt.id === checked);
    if (!period || !currentMonth) return;

    const dayId = el.id;
    const newLabel = period.label;

    setHours((prevHours) => {
      if (!prevHours) return prevHours;
      const newHours = prevHours.map((monthArr) => [...monthArr]);
      const monthIndex = currentMonth - 1;

      const existingIndex = newHours[monthIndex].findIndex(
        (entry) => entry.dayId === dayId
      );

      const isSamePeriod =
        existingIndex !== -1 &&
        newHours[monthIndex][existingIndex].period === newLabel;

      // Se o mesmo período já estiver setado: desmarca
      if (isSamePeriod && rotated) {
        el.innerText = "";
        el.style.backgroundColor = "";
        el.style.color = "";
        el.style.borderRadius = "";
        el.style.fontSize = "";
        el.style.padding = "";

        //hours remove
        newHours[monthIndex].splice(existingIndex, 1);
      } else if (rotated) {
        el.innerText = newLabel;
        el.style.backgroundColor = period.color;
        el.style.color = period.textColor;
        el.style.borderRadius = "0.2rem";
        el.style.fontSize = "0.5rem";
        el.style.padding = "2px 4px";

        //hours add
        if (existingIndex !== -1) {
          newHours[monthIndex].splice(existingIndex, 1); // Remove antigo
        }

        newHours[monthIndex].push({ dayId, period: newLabel }); // Adiciona novo
      }

      return newHours;
    });
  }

  // Observa qual mês está visível
  React.useEffect(() => {
    if (!calendar || !setCurrentMonth) return;

    observer.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) {
          const index = monthRefs.current.findIndex(
            (ref) => ref === visible.target
          );
          if (index !== -1) {
            const monthNumber = calendar.months[index]?.month;
            setCurrentMonth(monthNumber); // Atualiza no contexto
          }
        }
      },
      {
        root: containerRef.current,
        threshold: 0.5, // considera visível se mais de 50% estiver na tela
      }
    );

    monthRefs.current.forEach((ref) => {
      if (ref) observer.current?.observe(ref);
    });

    return () => {
      observer.current?.disconnect();
    };
  }, [calendar, setCurrentMonth]);

  React.useEffect(() => {
    if (!calendar || !hours || hours.length === 0) return;

    requestAnimationFrame(() => {
      hours.forEach((monthArr) => {
        monthArr.forEach(({ dayId, period }) => {
          const el = document.getElementById(dayId);
          const opt = options.find((o) => o.label === period);
          if (el && opt) {
            el.innerText = period;
            el.style.backgroundColor = opt.color;
            el.style.color = opt.textColor;
            el.style.borderRadius = "0.2rem";
            el.style.fontSize = "0.5rem";
            el.style.padding = "2px 4px";
          }
        });
      });
    });
  }, [calendar, hours, options]);

  //scroll automatico para mes atual
  const initialScrollDone = React.useRef(false);

  React.useEffect(() => {
    if (!calendar || !containerRef.current) return;
    if (initialScrollDone.current) return;

    const monthEl = document.getElementById("actual-month");
    if (monthEl) {
      const container = containerRef.current;
      const offsetTop = monthEl.offsetTop;

      container.scrollTo({
        top: offsetTop,
        behavior: "auto",
      });

      initialScrollDone.current = true;
    }
  }, [calendar]);

  //isToday - bolinha dia atual
  const isToday = new Date().toLocaleDateString("sv-SE");

  return (
    <div>
      <Label />
      <div
        ref={containerRef}
        className="overflow-y-scroll snap-y snap-mandatory h-screen scrollbar-hide hide-scrollbar"
      >
        {calendar?.months.map((month, index) => (
          <div
            key={month.month}
            ref={(el) => {
              monthRefs.current[index] = el;
            }}
            className={`mb-8 min-h-screen snap-center`}
            id={
              month.month === new Date().getMonth() + 1
                ? "actual-month"
                : undefined
            }
          >
            <div className="grid grid-cols-7 ">
              {month.days.map((day, i) => (
                <div
                  key={i}
                  className={`pt-2 h-20 text-center border-t border-base-300 font-bold ${
                    day?.isHoliday ? "border-t-2 border-purple-600" : ""
                  } ${i % 7 === 5 || i % 7 === 6 ? "text-base-400" : ""}`}
                >
                  {day ? (
                    <div>
                      <div
                        className={`${
                          day?.id === isToday
                            ? "bg-base-900 text-base-50 rounded-full w-6 m-auto"
                            : ""
                        }`}
                      >
                        {day.number}
                      </div>
                      <div
                        onTouchStart={handleEdit}
                        id={day.id}
                        className={`${
                          rotated
                            ? "border-[1px] border-base-300 rounded-[0.2rem]  mx-0.5 h-[1.7rem] text-center flex items-center justify-center mt-1 transition-transform duration-200 active:scale-120 active:translate-z-3"
                            : "mx-0.5 mt-1 flex items-center justify-center h-[1.7rem]"
                        }`}
                      ></div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarBody;

//------
// "use client";
// import React from "react";
// import { useCalendarContext } from "./Context";
// import Label from "./Label";

// const CalendarBody = () => {
//   const {
//     calendar,
//     currentMonth,
//     setCurrentMonth,
//     rotated,
//     checked,
//     options,
//     setHours,
//     hours,
//   } = useCalendarContext();
//   const containerRef = React.useRef<HTMLDivElement>(null);
//   const monthRefs = React.useRef<(HTMLDivElement | null)[]>([]);
//   const observer = React.useRef<IntersectionObserver | null>(null);

//   function handleEdit(e: React.TouchEvent<HTMLDivElement>) {
//     const el = e.currentTarget;

//     const period = options.find((opt) => opt.id === checked);
//     if (!period || !currentMonth) return;

//     const dayId = el.id;
//     const newLabel = period.label;

//     setHours((prevHours) => {
//       if (!prevHours) return prevHours;
//       const newHours = prevHours.map((monthArr) => [...monthArr]);
//       const monthIndex = currentMonth - 1;

//       const existingIndex = newHours[monthIndex].findIndex(
//         (entry) => entry.dayId === dayId
//       );

//       const isSamePeriod =
//         existingIndex !== -1 &&
//         newHours[monthIndex][existingIndex].period === newLabel;

//       // Se o mesmo período já estiver setado: desmarca
//       if (isSamePeriod && rotated) {
//         el.innerText = "";
//         el.style.backgroundColor = "";
//         el.style.color = "";
//         el.style.borderRadius = "";
//         el.style.fontSize = "";
//         el.style.padding = "";

//         //hours remove
//         newHours[monthIndex].splice(existingIndex, 1);
//       } else if (rotated) {
//         el.innerText = newLabel;
//         el.style.backgroundColor = period.color;
//         el.style.color = period.textColor;
//         el.style.borderRadius = "0.2rem";
//         el.style.fontSize = "0.55rem";
//         el.style.padding = "2px 4px";

//         //hours add
//         if (existingIndex !== -1) {
//           newHours[monthIndex].splice(existingIndex, 1); // Remove antigo
//         }

//         newHours[monthIndex].push({ dayId, period: newLabel }); // Adiciona novo
//       }

//       return newHours;
//     });
//   }

//   // Observa qual mês está visível
//   React.useEffect(() => {
//     if (!calendar || !setCurrentMonth) return;

//     observer.current = new IntersectionObserver(
//       (entries) => {
//         const visible = entries.find((entry) => entry.isIntersecting);
//         if (visible) {
//           const index = monthRefs.current.findIndex(
//             (ref) => ref === visible.target
//           );
//           if (index !== -1) {
//             const monthNumber = calendar.months[index]?.month;
//             setCurrentMonth(monthNumber); // Atualiza no contexto
//           }
//         }
//       },
//       {
//         root: containerRef.current,
//         threshold: 0.5, // considera visível se mais de 50% estiver na tela
//       }
//     );

//     monthRefs.current.forEach((ref) => {
//       if (ref) observer.current?.observe(ref);
//     });

//     return () => {
//       observer.current?.disconnect();
//     };
//   }, [calendar, setCurrentMonth]);

//   React.useEffect(() => {
//     if (!calendar || !hours || hours.length === 0) return;

//     requestAnimationFrame(() => {
//       hours.forEach((monthArr) => {
//         monthArr.forEach(({ dayId, period }) => {
//           const el = document.getElementById(dayId);
//           const opt = options.find((o) => o.label === period);
//           if (el && opt) {
//             el.innerText = period;
//             el.style.backgroundColor = opt.color;
//             el.style.color = opt.textColor;
//             el.style.borderRadius = "0.2rem";
//             el.style.fontSize = "0.55rem";
//             el.style.padding = "2px 4px";
//           }
//         });
//       });
//     });
//   }, [calendar, hours, options]);

//   //scroll automatico para mes atual
//   const initialScrollDone = React.useRef(false);

//   React.useEffect(() => {
//     if (!calendar || !containerRef.current) return;
//     if (initialScrollDone.current) return;

//     const monthEl = document.getElementById("actual-month");
//     if (monthEl) {
//       const container = containerRef.current;
//       const offsetTop = monthEl.offsetTop;

//       container.scrollTo({
//         top: offsetTop,
//         behavior: "auto",
//       });

//       initialScrollDone.current = true;
//     }
//   }, [calendar]);

//   //isToday - bolinha dia atual
//   const isToday = new Date().toLocaleDateString("sv-SE");

//   return (
//     <div>
//       <Label />
//       <div
//         ref={containerRef}
//         className="overflow-y-scroll snap-y snap-mandatory h-screen scrollbar-hide hide-scrollbar"
//       >
//         {calendar?.months.map((month, index) => (
//           <div
//             key={month.month}
//             ref={(el) => {
//               monthRefs.current[index] = el;
//             }}
//             className={`mb-8 min-h-screen snap-center`}
//             id={
//               month.month === new Date().getMonth() + 1
//                 ? "actual-month"
//                 : undefined
//             }
//           >
//             <div className="grid grid-cols-7">
//               {month.days.map((day, i) => (
//                 <div
//                   key={i}
//                   className={`pt-2 h-20 text-center border-t border-base-300 font-bold ${
//                     day?.isHoliday ? "border-t-2 border-purple-600" : ""
//                   } ${i % 7 === 5 || i % 7 === 6 ? "text-base-400" : ""}`}
//                 >
//                   {day ? (
//                     <div>
//                       <div
//                         className={`${
//                           day?.id === isToday
//                             ? "bg-base-900 text-base-50 rounded-full w-6 m-auto"
//                             : ""
//                         }`}
//                       >
//                         {day.number}
//                       </div>
//                       <div
//                         onTouchStart={handleEdit}
//                         id={day.id}
//                         className={`${
//                           rotated
//                             ? "border-[1px] border-base-300 rounded-[0.2rem]  mx-0.5 h-5 text-center flex items-center justify-center mt-1 transition-transform duration-200 active:scale-120 active:translate-z-3"
//                             : "mx-0.5 mt-1 flex items-center justify-center h-5"
//                         }`}
//                       ></div>
//                     </div>
//                   ) : (
//                     ""
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CalendarBody;
