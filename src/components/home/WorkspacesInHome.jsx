import PropTypes from "prop-types"
import useTheme from "../../hooks/useTheme"

export default function WorkspacesInHome({ workspaces }) {
    const { darkMode } = useTheme()
    return (
        <div className={`workspaces-cont flex flex-col overflow-y-scroll h-[90%] md:h-auto md:overflow-hidden w-full md:w-[60%] lg:w-[70%] space-y-3 p-4 md:border-r ${darkMode ? "bg-black text-white border-white shadow-slate-800" : "bg-white text-black border-black shadow-slate-500"}`}>
            {
                workspaces.map((item, index) => {
                    return <div className="w-full border shadow-sm shadow-inherit rounded-md p-3 cursor-pointer" key={index}>
                        {item.name}
                    </div>
                })
            }
        </div>
    )
}

WorkspacesInHome.propTypes = {
    workspaces: PropTypes.array.isRequired
}
