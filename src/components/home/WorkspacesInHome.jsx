import PropTypes from "prop-types"
import useTheme from "../../hooks/useTheme"
import WorkspaceCard from "../workspace/WorkspaceCard"

export default function WorkspacesInHome({ workspaces }) {
    const { darkMode } = useTheme()
    return (
        <div className={`cards-cont flex flex-wrap overflow-y-scroll justify-center h-[80%] lg:h-auto lg:overflow-hidden w-full  lg:w-[70%]  p-4  ${darkMode ? "bg-[#212529] text-white  shadow-white" : "bg-white text-black shadow-slate-500"}`}>
            {
                workspaces.map((item, index) => {
                    return <WorkspaceCard workspace={item} key={index}/>
                })
            }
        </div>
    )
}

WorkspacesInHome.propTypes = {
    workspaces: PropTypes.array.isRequired
}
