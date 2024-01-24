import PropTypes from 'prop-types'
import { useState } from 'react';
import { FaEye, FaEyeSlash, FaRegCopy } from "react-icons/fa";
import { showToastMessage } from '../../utils/toasts/showToast';


export default function ProfileAccordion({ workspaceName, workspacePassword, workspaceMembers }) {
    const [passwordVisibility, setPasswordVisibility] = useState(true)
    const [edit,setEdit] = useState(false)

    const copyPassword = ()=>{
        navigator.clipboard.writeText(workspacePassword)
        showToastMessage("copied to clipboard","success")
    }
    return (
        <>
            <div className="main-title w-full flex flex-col lg:flex-row p-3 rounded-md border shadow shadow-slate-400 mt-2 mb-1 first:mt-0 last:mb-0">
                <h1 className="w-full md:w-full pb-2 lg:pb-0">
                    {workspaceName}
                </h1>
                <div className="primary-buttons-div w-full md:w-fit flex">
                    <button className={`border text-white bg-slate-400 mx-1 rounded-md px-4 py-2 text-xs lg:text-sm flex justify-center items-center active:scale-95 transition-all duration-500`} onClick={()=>setEdit((prev)=>!prev)}>{edit?"Done":"Edit"}</button>
                    <button className={`border text-white bg-red-400 mx-1 rounded-md px-4 py-2 text-xs lg:text-sm flex justify-center items-center active:scale-95 transition-all duration-500`}>Delete</button>
                </div>
            </div>
            <div className={`w-full flex flex-col text-xs bg-slate-200 rounded-md transition-height duration-500 ${edit?"h-[250px]":"h-0"} overflow-hidden`}>
                <div className={`password-div flex flex-col p-2 w-full lg:w-[50%]`}>
                    <h1 className={`text-[0.55rem] w-full`}>Password</h1>
                    <h1 className={`w-full flex justify-between`}>
                        {
                            workspacePassword.length > 0 ?
                             <>
                                <input type={passwordVisibility ? "password" : "text"} disabled value={workspacePassword} />
                                <div className={`w-fit ${workspacePassword.length > 0 ? "flex" : "hidden"}`}>
                                    <div className="w-fit  cursor-pointer mr-2" onClick={()=>setPasswordVisibility((prev)=>!prev)}>
                                        {
                                            passwordVisibility?
                                                <FaEyeSlash className='text-slate-500' />
                                                :
                                                <FaEye className='text-slate-500'/>
                                        }
                                        
                                    </div>
                                    <div className='w-fit  cursor-pointer' onClick={copyPassword}>
                                        <FaRegCopy className='text-slate-500'/>
                                    </div>
                                </div>
                            </>:
                            <span>None</span>
                    }
                    </h1>
                </div>
                <div className={`w-full flex flex-col`}>
                    {workspaceMembers.map((member,index)=>{
                        return <div key={index} className='w-full lg:w-[50%] border'>
                            <h1>{member}</h1>
                        </div>
                    })}
                </div>
            </div>
        </>
    )
}

ProfileAccordion.propTypes = {
    workspaceName: PropTypes.string.isRequired,
    workspacePassword: PropTypes.string.isRequired,
    workspaceMembers: PropTypes.array.isRequired
}