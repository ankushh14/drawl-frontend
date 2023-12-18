import { useState } from 'react'
import { useWorkspace } from '../../hooks/useWorkspace'
import useTheme from '../../hooks/useTheme'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

export default function WorkspacePassword() {
    const [workspacePassword, setWorkspacePassword] = useState("")
    const navigate = useNavigate()
    const { darkMode } = useTheme()
    const { password, updatePasswordStatus } = useWorkspace()
    const [description, setDescription] = useState("This workspace is password protected!")

    const handlePasswordVerification = (e) => {
        e.preventDefault()
        if (workspacePassword === password) {
            return updatePasswordStatus(false)
        } else {
            setDescription("Invalid Password")
        }
    }

    return (
        <div className={`w-full h-screen flex flex-col space-y-10 ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}>
            <div className="return-home-div w-full flex justify-start">
                <h1 className='flex space-x-2 p-3 cursor-pointer justify-center items-center' onClick={()=>navigate('/home')}><FaArrowLeftLong/> <span> Return home</span></h1>
            </div>
            <form className="w-full h-[50%] flex justify-center items-center flex-col" onSubmit={handlePasswordVerification}>
                <div className="input-desc my-8">
                    <h1 className="text-xl">Workspace Password</h1>
                </div>
                <input type="password" autoComplete='off' placeholder='Enter password here' value={workspacePassword} onChange={(e) => setWorkspacePassword(e.target.value)} className={`w-[90%] md:w-[60%] lg:w-[45%] bg-inherit text-inherit font-kalam p-3 text-xs outline-none ${darkMode ? "text-white" : "text-black"} border-slate-500 border-b focus:border-b-[2px]`} />
                <div className="btn-div my-8 w-[90%] md:w-[60%] lg:w-[45%]">
                    <button type="submit" className={`${darkMode ? "bg-white text-black" : "bg-black text-white"} border w-full border-black rounded-md px-8 py-3 flex justify-center items-center active:scale-95 transition-all duration-500`}>Submit</button>
                </div>
                <div className="desc-div my-8">
                    <h1 className="text-xs">{description}</h1>
                </div>
            </form>
        </div>
    )
}
