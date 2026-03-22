import useTheme from "../../hooks/useTheme";

export default function SkeletonCard() {
  const { darkMode } = useTheme();

  return (
    <div
      className={`w-[300px] h-[220px] m-4 p-4 rounded-2xl flex flex-col justify-between transition-all duration-300
      ${
        darkMode
          ? "bg-white/5 border border-white/10"
          : "bg-white border border-gray-200 shadow-sm"
      }`}
    >
      <div className="flex justify-between items-center">
        <div className="w-10 h-10 rounded-xl bg-slate-300 dark:bg-white/10 animate-pulse"></div>
        <div className="w-5 h-5 rounded-md bg-slate-300 dark:bg-white/10 animate-pulse"></div>
      </div>

      <div className="mt-3 flex flex-col gap-2">
        <div className="w-[80%] h-[14px] rounded bg-slate-300 dark:bg-white/10 animate-pulse"></div>
        <div className="w-[60%] h-[12px] rounded bg-slate-300 dark:bg-white/10 animate-pulse"></div>
      </div>

      <div className="flex items-center justify-between mt-3">
        <div className="flex -space-x-2">
          <div className="w-8 h-8 rounded-full bg-slate-300 dark:bg-white/10 animate-pulse"></div>
          <div className="w-8 h-8 rounded-full bg-slate-300 dark:bg-white/10 animate-pulse"></div>
          <div className="w-8 h-8 rounded-full bg-slate-300 dark:bg-white/10 animate-pulse"></div>
        </div>
        <div className="w-10 h-[12px] rounded bg-slate-300 dark:bg-white/10 animate-pulse"></div>
      </div>

      <div className="flex justify-between items-center mt-3">
        <div className="w-[50%] h-[12px] rounded bg-slate-300 dark:bg-white/10 animate-pulse"></div>
        <div className="w-[40px] h-[12px] rounded bg-slate-300 dark:bg-white/10 animate-pulse"></div>
      </div>
    </div>
  );
}
