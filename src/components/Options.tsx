import React from "react";
import Image from "next/image";
import settings from "../../public/settings.svg";
import { useRouter } from "next/navigation";
import { CalendarContext } from "./Context";

const Options = () => {
  const { checked, setChecked } = React.useContext(CalendarContext);

  const router = useRouter();

  return (
    <div className="flex justify-center items-center gap-5">
      <div onTouchStart={() => setChecked("morning")}>
        <div
          className={`h-4 w-4 bg-[#FDC800] rounded-full m-auto ${
            checked === "morning" ? "border-2 border-blue-400" : ""
          }`}
        ></div>
        <p
          className={`font-normal text-base-500 ${
            checked === "morning" ? " text-blue-400" : ""
          }`}
        >
          Morning
        </p>
      </div>
      <div onTouchStart={() => setChecked("afternoon")}>
        <div
          className={`h-4 w-4 bg-[#00C950] rounded-full m-auto ${
            checked === "afternoon" ? "border-2 border-blue-400" : ""
          }`}
        ></div>
        <p
          className={`font-normal text-base-500 ${
            checked === "afternoon" ? " text-blue-400" : ""
          }`}
        >
          Afternoon
        </p>
      </div>
      <div onTouchStart={() => setChecked("night")}>
        <div
          className={`h-4 w-4 bg-[#165DFB] rounded-full m-auto ${
            checked === "night" ? "border-2 border-blue-400" : ""
          }`}
        ></div>
        <p
          className={`font-normal text-base-500 ${
            checked === "night" ? " text-blue-400" : ""
          }`}
        >
          Night
        </p>
      </div>
      <div
        onTouchStart={() => router.push("/settings")}
        className="border-l-2 border-base-300 pl-2"
      >
        <div>
          <Image
            className={`m-auto h-5 w-5`}
            src={settings}
            alt="settings.svg"
          />
        </div>
        <p className="font-normal text-base-500">Settings</p>
      </div>
    </div>
  );
};

export default Options;
