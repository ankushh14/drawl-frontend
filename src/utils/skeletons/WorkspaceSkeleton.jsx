import { useState } from "react";
import useTheme from "../../hooks/useTheme";
import SkeletonCard from "./SkeletonCard";

export default function WorkspaceSkeleton() {
  const { darkMode } = useTheme();
  const [skeletonArray,] = useState([
    1,
    2,
    3
  ])
  return (
    <div
      className={`cards-cont flex flex-wrap overflow-y-scroll justify-center h-[80%] lg:h-auto lg:overflow-hidden w-full  lg:w-[70%]  p-4  ${
        darkMode
          ? "bg-[#212529] text-white  shadow-white"
          : "bg-white text-black shadow-slate-500"
      }`}
    >
      {
        skeletonArray.map((item)=>{
            return <SkeletonCard key={item} />
        })
      }
    </div>
  );
}
