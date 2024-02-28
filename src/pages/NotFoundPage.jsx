import { Link } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import { BsFillEmojiFrownFill } from "react-icons/bs";

export default function NotFoundPage() {
  const { darkMode } = useTheme();
  return (
    <div
      className={`w-full flex flex-col h-screen max-h-screen justify-center items-center 
    ${
      darkMode
        ? "bg-[#212529]  text-white border-white"
        : "bg-white text-black border-[#d3d3d3]"
    }
      `}
    >
      <div className="404-box w-[90%] h-1/2 md:w-[70%] lg:w-[55%] border-2 flex flex-col justify-center items-center rounded-md">
        <BsFillEmojiFrownFill size={40} className="mb-2"/>
        <h1 className="text-3xl md:text-4xl font-Aclonica w-full text-center py-3 font-bold">
          NexusMeetHub
        </h1>
        <h2 className="text-xl md:text-2xl font-bold text-center w-full">
          404 page not found!
        </h2>
        <div className="back-link w-full flex justify-center items-center py-3">
          <Link to={"/dashboard"} className="text-blue-600 underline">
            Back to dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
