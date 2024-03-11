import useTheme from "../../hooks/useTheme"
import PropTypes from "prop-types"

export default function AsideBar({openModal,openJoinModal}) {
    const {darkMode} = useTheme()
    return (
        <div className={`lg:static fixed bottom-0 flex flex-col w-full lg:w-[30%] space-y-3 p-4 border-t lg:border-l lg:border-t-0 ${darkMode?"bg-[#212529]  border-white":"bg-white border-[#d3d3d3]"}`}>
            <button type="button" className={`${darkMode?"bg-white text-black":"bg-black text-white"} border border-black rounded-md px-8 py-3 flex justify-center items-center active:scale-95 transition-all duration-500`} onClick={()=>openModal(true)}>Create a new workspace</button>
            <button type="button" className={`${darkMode?"bg-white text-black":"bg-black text-white"} border border-black rounded-md px-8 py-3 flex justify-center items-center active:scale-95 transition-all duration-500`} onClick={()=>openJoinModal(true)}>Join a workspace</button>
        </div>
    )
}

AsideBar.propTypes = {
    openModal: PropTypes.func.isRequired,
    openJoinModal: PropTypes.func.isRequired
}