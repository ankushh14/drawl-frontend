import useTheme from "../../hooks/useTheme"
import ThemeToggle from "../../utils/theme/ThemeToggle"

export default function WorkspaceUtilityBar() {
    const { darkMode } = useTheme()

    return (
        <div className={`utility-bar w-full flex justify-between items-center p-2 transition-colors duration-500
        ${darkMode ? "bg-[#212529]  text-white border-b-slate-700" : "bg-white text-black border-b-[#d3d3d3]"}
        `}>
            <div className="left-utility-bar w-fit">
                <ThemeToggle />
            </div>
            <h1 className="font-Aclonica font-bold cursor-pointer">
                Nexusmeethub
            </h1>
            <div className="right-utility-bar w-fit">
                <button type="submit" className={`bg-red-500 border border-red-600 rounded-md px-4 py-2 text-white flex justify-center items-center text-xs w-full active:scale-95 transition-all duration-500`}>Exit workspace</button>
            </div>
        </div>
    )
}
