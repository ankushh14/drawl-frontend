import { Link, useRouteError } from "react-router-dom";
import useTheme from "../../hooks/useTheme";

export default function ErrorBoundary() {
  const error = useRouteError();
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
        <h1 className="text-3xl md:text-4xl font-Aclonica w-full text-center py-3 font-bold">
          NexusMeetHub
        </h1>
        <h2 className="text-xl md:text-2xl font-bold text-center w-full">
          An unknown Error occured!
        </h2>
        <p className="w-full text-center text-xs my-3 text-red-700">
          {error.message}
        </p>
        <div className="back-link w-full flex justify-center items-center py-3 flex-col">
          <h3 className="w-full text-center font-bold">Reload the page</h3>
          <h6 className="w-full my-2 text-center text-xs">Or</h6>
          <Link to={"/dashboard"} className="text-blue-600 underline">
            Return to dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
