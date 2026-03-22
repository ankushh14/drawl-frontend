import { Link, useRouteError } from "react-router-dom";
import useTheme from "../../hooks/useTheme";
import Button from "../ui/button";
import { getThemeStyles } from "../../styles/theme";

export default function ErrorBoundary() {
  const error = useRouteError();
  const { darkMode } = useTheme();
  const theme = getThemeStyles(darkMode);

  return (
    <div
      className={`relative w-full min-h-screen flex items-center justify-center px-6 overflow-hidden transition-colors duration-500
      ${
        darkMode
          ? "bg-gradient-to-br from-[#0f0f11] via-[#1a1b1f] to-[#0f0f11] text-white"
          : "bg-gradient-to-br from-[#f8f9fa] via-white to-[#eef1f4] text-black"
      }`}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[-20%] left-[-10%] w-[400px] h-[400px] bg-red-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] bg-indigo-500/10 blur-[120px] rounded-full" />
      </div>
      <div
        className={`relative z-10 w-full max-w-lg rounded-2xl ${theme.card} transition p-8 flex flex-col items-center text-center`}
      >
        <h1 className="text-3xl font-Aclonica font-bold tracking-wide bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-400 bg-clip-text text-transparent">
          DrawL
        </h1>
        <h2 className="mt-6 text-xl md:text-2xl font-semibold">
          Something went wrong
        </h2>
        <p className="mt-3 text-sm text-red-400 max-w-md break-words">
          {error?.message || "An unexpected error occurred."}
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3 w-full justify-center">
          <Button variant="primary" onClick={() => window.location.reload()}>
            Reload Page
          </Button>

          <Link to="/dashboard">
            <Button variant="secondary">Go to Dashboard</Button>
          </Link>
        </div>
        <p className="mt-6 text-xs text-gray-500 dark:text-gray-400">
          If the issue persists, try refreshing or returning later.
        </p>
      </div>
    </div>
  );
}
