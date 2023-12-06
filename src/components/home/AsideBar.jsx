import useTheme from "../../hooks/useTheme"

export default function AsideBar() {
    const {darkMode} = useTheme()
    return (
        <div className="aside-bar flex flex-col w-full md:w-[40%] lg:w-[30%] space-y-3 p-4">
            <button type="button" className={`${darkMode?"bg-white text-black":"bg-black text-white"} border border-black rounded-md px-8 py-3 flex justify-center items-center active:scale-95 transition-all duration-500`}>Create a new workspace</button>
            <button type="button" className={`${darkMode?"bg-white text-black":"bg-black text-white"} border border-black rounded-md px-8 py-3 flex justify-center items-center active:scale-95 transition-all duration-500`}>Join a workspace</button>
        </div>
    )
}
