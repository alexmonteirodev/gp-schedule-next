import React from "react";
import { useCalendarContext } from "./Context";

const HoursCount = () => {
  const { hours, setHours, calendar, options, setHours } = useCalendarContext();

  React.useEffect(() => {
    if (!calendar || !options || !setHours) return;
  }, []);

  return <div></div>;
};

export default HoursCount;
