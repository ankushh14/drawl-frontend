import useTheme from "../../hooks/useTheme"
import PropTypes from "prop-types"
export default function NoWorkSpaceComponent({openModal,openJoinModal}) {
    const { darkMode } = useTheme()
    return (
        <div className={`w-full h-[80%] flex justify-center items-center space-y-6 flex-col p-3 ${darkMode ? "text-white" : "text-black"}`}>
            <p className="no-para text-center w-full text-2xl font-semibold">
                Currently you are working in zero workspaces,kindly choose any one below options
            </p>
            <div className="btns-div w-[80%] md:w-[40%] lg:w-[30%] flex flex-col space-y-2">
                <button type="button" onClick={()=>openModal(true)} className={`${darkMode ? "bg-white text-black" : "bg-black text-white"} border border-black rounded-md px-8 py-3 flex justify-center items-center  active:scale-95 transition-all duration-500`}>Create a new workspace</button>
                <button type="button" onClick={()=>openJoinModal(true)} className={`${darkMode ? "bg-white text-black" : "bg-black text-white"} border border-black rounded-md px-8 py-3 flex justify-center items-center  active:scale-95 transition-all duration-500`}>Join a workspace</button>
            </div>
        </div>
    )
}

NoWorkSpaceComponent.propTypes = {
    openModal: PropTypes.func.isRequired,
    openJoinModal: PropTypes.func.isRequired,
}
