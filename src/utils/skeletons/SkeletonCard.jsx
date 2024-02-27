import useTheme from "../../hooks/useTheme";

export default function SkeletonCard() {
  const { darkMode } = useTheme()
  return (
    <div className={`card w-[300px]  h-[330px] p-2 m-4 px-4 rounded flex flex-col justify-between shadow shadow-inherit cursor-pointer hover:shadow-md
    ${
      darkMode
        ? "bg-[#393f45] text-white shadow-slate-800"
        : "bg-white text-black shadow-slate-500"
    }`}>
      <div className="name-skeleton w-[90%] h-[30px] rounded-md bg-slate-400 animate-pulse"></div>
      <div className="group-skeleton-outer w-full h-[250px] my-2 flex justify-center items-center flex-col">
        <div className="group-icon-skelton w-[100px] h-[100px] bg-slate-400 animate-pulse rounded-xl ">
        </div>
        <div className="group-icon-skelton w-[120px] h-[30px] bg-slate-400 animate-pulse rounded-md my-5 ">
        </div>
      </div>
      <div className="owner-skeleton w-[90%] h-[20px] rounded-md bg-slate-400 animate-pulse self-end"></div>
    </div>
  );
}
