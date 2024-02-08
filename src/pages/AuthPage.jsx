import { useState } from "react";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";
import useTheme from "../hooks/useTheme";

export default function AuthPage() {
  const [newUser, setNewUser] = useState(false);
  const { darkMode } = useTheme();
  return (
    <div
      className={`main-div w-full h-screen flex justify-center items-center
    ${
      darkMode
        ? "bg-[#212529]  text-white border-white"
        : "bg-white text-black border-[#d3d3d3]"
    }
    `}
    >
      {newUser ? (
        <Register setNewUser={setNewUser} />
      ) : (
        <Login setNewUser={setNewUser} />
      )}
    </div>
  );
}
