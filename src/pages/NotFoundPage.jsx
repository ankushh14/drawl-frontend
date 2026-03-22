import { Link } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import { BsFillEmojiFrownFill } from "react-icons/bs";
import Button from "../components/ui/button";
import { getThemeStyles } from "../styles/theme";

export default function NotFoundPage() {
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
        <div className="absolute top-[-20%] left-[-10%] w-[400px] h-[400px] bg-purple-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] bg-indigo-500/10 blur-[120px] rounded-full" />
      </div>
      <div
        className={`relative z-10 w-full max-w-lg rounded-2xl ${theme.card} p-8 flex flex-col items-center text-center`}
      >
        <div className="mb-4 p-4 rounded-full bg-white/10 border border-white/10">
          <BsFillEmojiFrownFill size={28} className="opacity-80" />
        </div>
        <h1 className="text-3xl font-Aclonica font-bold tracking-wide bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-400 bg-clip-text text-transparent">
          DrawL
        </h1>
        <h2 className="mt-4 text-2xl md:text-3xl font-bold">
          404 — Page not found
        </h2>
        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 max-w-md">
          The page you’re looking for doesn’t exist or may have been moved.
        </p>
        <div className="mt-6">
          <Link to="/dashboard">
            <Button variant="primary">Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
