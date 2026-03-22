import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import Button from "../components/ui/button";

export default function LandingPage() {
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  return (
    <div
      className={`relative w-full min-h-screen flex flex-col justify-center items-center px-6 overflow-hidden transition-colors duration-500
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

      <div className="relative z-10 max-w-5xl text-center flex flex-col items-center">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-400 bg-clip-text text-transparent">
            DrawL
          </span>
        </h1>
        <h2 className="mt-6 text-xl md:text-3xl font-semibold text-gray-400 dark:text-gray-300">
          A Collaborative Networking Experience
        </h2>
        <p className="mt-6 max-w-2xl text-sm md:text-base leading-relaxed text-gray-500 dark:text-gray-400 mb-6">
          DrawL is a real-time collaboration platform that blends seamless chat
          with a Figma-like interactive whiteboard. Brainstorm, sketch ideas,
          and communicate effortlessly—all in one workspace designed for speed
          and creativity.
        </p>
        <Button
          variant="primary"
          size="lg"
          onClick={() => navigate("/dashboard")}
          rightIcon={<FaArrowRight />}
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
}
