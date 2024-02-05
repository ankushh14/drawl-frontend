import { IoWarning } from "react-icons/io5";
import useTheme from "../../hooks/useTheme";
import { useWorkspace } from "../../hooks/useWorkspace";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function ExitWorkspaceModal({ModalController}) {
    const {darkMode} = useTheme()
    const navigate = useNavigate()
    const { leave,name } = useWorkspace()
    const handleYes = ()=>{
        leave()
        ModalController(false)
        return navigate("/dashboard")
    }

    const handleNo = ()=>{
        return ModalController(false)
    }

    return (
        <div className="Modal-background fixed z-[1000] top-0 left-0 right-0 bottom-0 bg-[#5c5b5b5d] flex justify-center items-center">
            <div className={`w-[300px] rounded-md shadow p-3 flex flex-col ${darkMode ? "bg-[#212529] text-white" : "bg-white text-black overflow-hidden"}`}>
                <div className="w-full flex p-2 justify-center items-center text-red-500">
                    <IoWarning size={60} />
                </div>
                <div className="w-full">
                    <h1 className="text-center w-full font-semibold">Are you sure you want to exit the workspace `{name}` ?</h1>
                </div>
                <div className="btns-div flex w-full justify-center items-center py-2">
                    <button className={`border text-white bg-red-500 mx-1 rounded-md px-4 py-2 text-xs lg:text-sm flex justify-center items-center active:scale-95 transition-all duration-500 w-[40%]`} onClick={handleYes}>Yes</button>
                    <button className={`border text-white bg-red-500 mx-1 rounded-md px-4 py-2 text-xs lg:text-sm flex justify-center items-center active:scale-95 transition-all duration-500 w-[40%]`} onClick={handleNo}>No</button>
                </div>
            </div>
        </div>
    )
}

ExitWorkspaceModal.propTypes = {
    ModalController : PropTypes.func.isRequired
}
