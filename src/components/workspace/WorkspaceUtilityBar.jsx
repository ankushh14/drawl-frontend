import { useState } from "react"
import useTheme from "../../hooks/useTheme"
import ThemeToggle from "../../utils/theme/ThemeToggle"
import ExitWorkspaceModal from "./ExitWorkspaceModal"
import { FaUsers } from "react-icons/fa";
import Collaborators from "../chats/Collaborators";
import { useClickAway } from "@uidotdev/usehooks";
import PropTypes from 'prop-types'
import { IoIosChatbubbles } from "react-icons/io";




export default function WorkspaceUtilityBar({online,setChatComponent}) {
    const { darkMode } = useTheme()
    const [exitModal, setExitModal] = useState(false)
    const [onlineList,setOnlineList] = useState(false)

    const onlineListRef = useClickAway(()=>{
        setOnlineList(false)
    })

    return (
        <div className={`utility-bar w-full flex justify-between items-center p-2 transition-colors duration-500
        ${darkMode ? "bg-[#212529]  text-white border-slate-700" : "bg-white text-black border-[#d3d3d3]"}
        `}>
            <div className="left-utility-bar w-[30%] flex justify-start items-center space-x-2 md:space-x-4 lg:space-x-6">
                <ThemeToggle />
                <div 
                className="online-members w-fit px-2 rounded-md flex justify-center items-center space-x-1 cursor-pointer" 
                onClick={()=>setOnlineList((prev)=>!prev)}
                ref={onlineListRef}
                >
                    <FaUsers size={19}/>
                    <h3 className="online-heading hidden md:block">Online</h3>
                    {onlineList && <Collaborators currentlyOnline={online}/>}
                </div>
            </div>
            <h1 className="font-Aclonica font-bold cursor-pointer">
                DrawL
            </h1>
            <div className="right-utility-bar w-[30%] flex justify-end items-center">
                <div className="chats-btn w-fit flex justify-center items-center px-2 md:hidden" onClick={()=>setChatComponent((prev)=>!prev)}>
                    <IoIosChatbubbles size={19}/>
                </div>
                <button 
                className={`bg-red-500 border border-red-600 rounded-md px-3 py-1 text-white flex justify-center items-center text-xs w-[70px] active:scale-95 transition-all duration-500`}
                onClick={()=>setExitModal(true)}
                >
                    Exit
                </button>
            </div>
            {exitModal && <ExitWorkspaceModal ModalController={setExitModal}/>}
        </div>
    )
}

WorkspaceUtilityBar.propTypes = {
    online : PropTypes.array.isRequired,
    setChatComponent: PropTypes.func.isRequired
}
