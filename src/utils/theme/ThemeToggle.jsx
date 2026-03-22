import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import useTheme from "../../hooks/useTheme";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useCallback, useEffect } from "react";

export default function ThemeToggle() {
  const { darkMode, setDarkMode } = useTheme();
  const [themeInLocal, setThemeInLocal] = useLocalStorage("darkTheme", false);

  const changeInTheme = useCallback(() => {
    setDarkMode(themeInLocal);
  }, [setDarkMode, themeInLocal]);

  useEffect(() => {
    changeInTheme();
  }, [changeInTheme]);

  const toggleTheme = () => {
    setThemeInLocal((prev) => !prev);
  };

  return (
    <div
      onClick={toggleTheme}
      className={`relative w-12 h-6 flex items-center rounded-full cursor-pointer transition-all duration-300
      ${darkMode ? "bg-white/10 border border-white/20" : "bg-gray-200 border border-gray-300"}`}
    >
      <div className="absolute left-1 flex items-center justify-center">
        <MdOutlineDarkMode
          size={14}
          className={darkMode ? "text-white" : "text-gray-500"}
        />
      </div>

      <div className="absolute right-1 flex items-center justify-center">
        <MdOutlineLightMode
          size={14}
          className={darkMode ? "text-gray-400" : "text-black"}
        />
      </div>

      <div
        className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full shadow-md transition-all duration-300
        ${darkMode ? "translate-x-[22px] bg-white" : "translate-x-[2px] bg-black"}`}
      />
    </div>
  );
}
