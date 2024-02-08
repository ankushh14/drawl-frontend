import { useAuth } from "../../hooks/useAuth";
import useTheme from "../../hooks/useTheme";
import STATUS from "../status";

export default function MainLoader() {
  const { status } = useAuth();
  const { darkMode } = useTheme();
  return (
    status === STATUS.PENDING && (
      <div
        className={`back-div fixed top-0 left-0 right-0 bottom-0 z-40 flex justify-center items-center 
        ${darkMode ? "bg-[#212529] text-white" : "bg-white text-black"}`}
      >
        <div className="load-div flex justify-center space-x-1 items-center">
          <h1 className="text-[20px] font-semibold text-inherit xl:text-[40px] animate-pulse delay-75 font-Aclonica">
            NexusMeetHub
          </h1>
        </div>
      </div>
    )
  );
}
