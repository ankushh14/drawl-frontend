import { useState } from "react";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";
import useTheme from "../hooks/useTheme";

export default function AuthPage() {
  const [newUser, setNewUser] = useState(false);
  const { darkMode } = useTheme();

  return (
    <div
      className={`relative w-full min-h-screen flex overflow-hidden transition-colors duration-500 justify-center items-center
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
      <div className="hidden lg:flex relative z-10 items-center justify-center px-12">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold font-Aclonica tracking-tight bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-400 bg-clip-text text-transparent">
            DrawL
          </h1>

          <p className="mt-6 text-lg text-gray-400 dark:text-gray-300 leading-relaxed">
            Collaborate in real-time with chat and a powerful whiteboard. Build,
            brainstorm, and communicate seamlessly—all in one place.
          </p>

          <div className="mt-8 space-y-2 text-sm text-gray-500 dark:text-gray-400">
            <p>• Real-time chat & collaboration</p>
            <p>• Secure, protected workspaces</p>
          </div>
        </div>
      </div>
      <div className="flex w-full lg:w-[480px] items-center justify-center px-6 relative z-10">
        {newUser ? (
          <Register setNewUser={setNewUser} />
        ) : (
          <Login setNewUser={setNewUser} />
        )}
      </div>
    </div>
  );
}
