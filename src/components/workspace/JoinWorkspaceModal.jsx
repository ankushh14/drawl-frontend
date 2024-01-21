import PropTypes from "prop-types"
import { IoClose } from "react-icons/io5"
import useTheme from "../../hooks/useTheme"
import { useState } from "react"

export default function JoinWorkspaceModal({ openJoinModal }) {
    const { darkMode } = useTheme()
    const [workspaceSearch,setWorkspaceSearch] = useState("")

    const modalCloseHandle = (e) => {
        if (e.target.id === "Modal-background") {
            openJoinModal(false)
        }
    }

    let searchArray = [
    ]

    return (
        <div id="Modal-background" className="Modal-background fixed top-0 left-0 right-0 bottom-0 bg-[#5c5b5b5d] flex justify-center items-center" onClick={modalCloseHandle}>

            <div className={`Modal-div w-[95%] text-xs md:w-[75%] lg:w-[45%] p-5 ${darkMode ? "bg-black text-white" : "bg-white text-black"} rounded-md overflow-y-none`}>
                <div className="close-btn w-full flex justify-end">
                    <IoClose className={`cursor-pointer`} onClick={() => openJoinModal(false)} />
                </div>
                <div className="note-div w-full text-xs text-red-300 py-2">
                    <p className="w-full">Note: You can only access the workspace once your join request has been accepted by the owner of the workspace.</p>
                </div>
                <div className="find-workspace-outer w-full my-2 py-1 relative">
                    <input type="text" placeholder="Enter workspace name" value={workspaceSearch} onChange={(e)=>setWorkspaceSearch(e.target.value)} className={`w-full bg-inherit text-inherit font-kalam p-3 text-xs outline-none border-slate-500 border-b focus:border-b-2`} />
                    <div className={`search-results-div ${searchArray.length === 0 && "hidden"} w-full rounded-md shadow-slate-500 shadow-sm mt-1 absolute ${darkMode ? "bg-black text-white" : "bg-white text-black"} max-h-[242px] overflow-y-scroll`}>
                        {
                            searchArray.map((item,index)=>{
                                return <div key={index} className="w-full flex flex-col p-3 hover:bg-slate-100 first:rounded-t-md last:rounded-b-md cursor-pointer border-b border-slate-400 last:border-none" onClick={()=>setWorkspaceSearch(item.name)}>
                                    <h1 className="w-full font-semibold mb-1">Workspace : {item.name}</h1>
                                    <h1 className="w-full text-[0.65rem]">Owner : {item.owner}</h1>
                                </div>
                            })
                        }
                    </div>
                </div>
                <div className="find-btn w-full py-2 pt-4">
                <button type="button" className={`${darkMode ? "bg-white text-black" : "bg-black text-white"} border border-black rounded-md px-8 py-3 flex justify-center items-center w-full active:scale-95 transition-all duration-500`}>Send join request</button>
                </div>
            </div>
        </div>
    )
}

JoinWorkspaceModal.propTypes = {
    openJoinModal: PropTypes.func.isRequired
}
