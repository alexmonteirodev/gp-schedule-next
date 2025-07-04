// import { defaultOptions } from "@/components/PeriodOptions";
// import React from "react";
// import { useCalendarContext } from "./Context";
// import { collectSegmentData } from "next/dist/server/app-render/collect-segment-data";

// const HoursCount = () => {
//   const { hours, setTotals } = useCalendarContext();

//   React.useEffect(() => {
//     const periodsOnly = hours.map((eachMonth) =>
//       eachMonth.map((obj) => obj.period)
//     );
//     const bleu = periodsOnly.map((arr) =>
//       arr.map((value) => {
//         value.replace(defaultOptions[value], defaultOptions[value].hours);
//       })
//     );
//     setTotals("bleu", bleu);
//   });
//   return null;
// };

// export default HoursCount;
