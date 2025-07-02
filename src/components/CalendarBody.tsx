"use client";
import React, { useContext, useEffect, useRef } from "react";
import { CalendarContext } from "./Context";
import Label from "./Label";

const CalendarBody = () => {
  const { calendar, currentMonth, setCurrentMonth } =
    useContext(CalendarContext);
  const containerRef = useRef<HTMLDivElement>(null);
  const monthRefs = useRef<(HTMLDivElement | null)[]>([]);
  const observer = useRef<IntersectionObserver | null>(null);

  // Observa qual mês está visível
  useEffect(() => {
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

  return (
    <div>
      <Label />
      <div
        ref={containerRef}
        className="overflow-y-scroll snap-y snap-mandatory h-screen scrollbar-hide"
      >
        {calendar?.months.map((month, index) => (
          <div
            key={month.month}
            ref={(el) => (monthRefs.current[index] = el)}
            className="mb-8 snap-center min-h-screen"
          >
            <div className="grid grid-cols-7">
              {month.days.map((day, i) => (
                <div
                  key={i}
                  className={`pt-2 h-20 text-center border-t border-base-300 font-bold ${
                    day?.isHoliday ? "border-t-2 border-purple-600" : ""
                  } ${i % 7 === 5 || i % 7 === 6 ? "text-base-400" : ""}`}
                >
                  {day ? day.number : ""}
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

// "use client";
// import React from "react";
// import { CalendarContext } from "./Context";
// import Label from "./Label";

// const CalendarBody = () => {
//   const calendar = React.useContext(CalendarContext);
//   console.log(calendar);

//   return (
//     <div>
//       <Label />
//       <div className="overflow-y-scroll snap-y snap-mandatory h-screen scrollbar-hide">
//         {calendar?.months.map((month) => (
//           <div key={month.month} className="mb-8 snap-center min-h-screen ">
//             <div className="grid grid-cols-7 ">
//               {month.days.map((day, i) => (
//                 <div
//                   key={i}
//                   className={`pt-2 h-20 text-center border-t border-base-300 font-bold ${
//                     day?.isHoliday ? "border-t-2 border-purple-600" : ""
//                   } ${i % 7 === 5 || i % 7 === 6 ? "text-base-400" : ""}`}
//                 >
//                   {day ? day.number : ""}
//                   {/* <div>teste</div> */}
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
