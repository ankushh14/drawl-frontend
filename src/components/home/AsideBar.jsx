import useTheme from "../../hooks/useTheme"
import PropTypes from "prop-types"

export default function AsideBar({openModal}) {
    const {darkMode} = useTheme()
    return (
        <div className={`aside-bar fixed md:static bottom-0  flex flex-col w-full md:w-[40%] lg:w-[30%] space-y-3 p-4 md:border-l md:ml-2 ${darkMode?"border-white bg-black":"border-black bg-white"}`}>
            <button type="button" className={`${darkMode?"bg-white text-black":"bg-black text-white"} border border-black rounded-md px-8 py-3 flex justify-center items-center active:scale-95 transition-all duration-500`} onClick={()=>openModal(true)}>Create a new workspace</button>
            {/* <button type="button" className={`${darkMode?"bg-white text-black":"bg-black text-white"} border border-black rounded-md px-8 py-3 flex justify-center items-center active:scale-95 transition-all duration-500`}>Join a workspace</button> */}
        </div>
    )
}

AsideBar.propTypes = {
    openModal: PropTypes.func.isRequired
}