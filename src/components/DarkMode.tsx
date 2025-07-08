import React from "react";

const DarkMode = () => {
  const [dark, setDark] = React.useState(false);

  React.useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [dark]);

  return (
    <div>
      <label className="flex items-center gap-3 cursor-pointer">
        <h3 className="text-base-900 font-bold text-xl dark:text-base-100">
          Dark Mode
        </h3>
        <input
          type="checkbox"
          className="sr-only peer"
          onChange={() => setDark((prev) => !prev)}
        />
        <div className="w-11 h-6 bg-base-300 peer-checked:bg-blue-600 rounded-full relative ">
          <div
            className={`absolute left-1 top-1 w-4 h-4 bg-base-50 rounded-full transition-transform ${
              dark ? "translate-x-5" : ""
            }`}
          />
        </div>
        <p className="text-red-400">is not working yet</p>
      </label>
    </div>
  );
};

export default DarkMode;
