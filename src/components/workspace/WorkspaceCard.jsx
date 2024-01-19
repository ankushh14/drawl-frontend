import PropTypes from "prop-types"
import { useNavigate } from "react-router-dom"
import { MdGroup,MdOutlineDoubleArrow } from "react-icons/md";
import { getProfiles } from "../../api/workspace";
import { useCallback, useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";




export default function WorkspaceCard({ workspace }) {
  const navigate = useNavigate()
  const {token} = useAuth()
  const [profiles,setProfiles] = useState([])
  const [submenu,setSubmenu] = useState(false)
  const [members,setMembers] = useState(false)
  const [actualMembers] = useState([...workspace.members,workspace.owner+" (owner)"])
  const [about,setAbout] = useState(false)
  const workspaceRoute = import.meta.env.VITE_WORKSPACES
  const handleNavigate = () => {
    navigate(`/${workspaceRoute}/${workspace.ID}`)
  }
  const getProfileData = useCallback(async()=>{
    let requestBody = {
      workspaceID : workspace.ID
    }
    const data = await getProfiles(requestBody,token)
    if(data.valid){
      return setProfiles(data.data)
    }else{
      return
    }
  },[workspace,token])

  useEffect(()=>{
    getProfileData()
  },[getProfileData])

  return (
    <div className={`card w-[300px]  h-[330px] p-2 m-4 px-4 rounded bg-white text-black flex flex-col justify-between shadow shadow-inherit cursor-pointer hover:shadow-md   transition-all duration-500 ease-in-out [perspective:1000px] [transform-Style:preserve-3d] ${(members || about)?"[transform:rotateY(180deg)]":""}`}>
      <div className={`card-main w-full flex flex-col space-y-4 ${(members || about)?"hidden opacity-0":"visible opacity-100"}`}>
        <div className="card-header w-full py-1 flex justify-between items-center">
          <h1 className="w-full font-bold">
            {workspace.name}
          </h1>
          <div className="dots-div flex flex-col relative px-2" onClick={()=>setSubmenu((prev)=>!prev)}>
            <span className="w-[0.15rem] h-[0.15rem] bg-black m-[0.08rem] rounded-full"></span>
            <span className="w-[0.15rem] h-[0.15rem] bg-black m-[0.08rem] rounded-full"></span>
            <span className="w-[0.15rem] h-[0.15rem] bg-black m-[0.08rem] rounded-full"></span>
            <div className={`absolute w-[100px] flex flex-col cursor-pointer shadow-sm shadow-slate-500 rounded-md p-2 text-xs text-slate-500 bg-white top-5 right-2 transition-all duration-300 ${submenu?"visible opacity-100":"invisible opacity-0"}`}>
              <div className="w-full border-b border-slate-500 text-center p-1" onClick={()=>setAbout(true)}>About</div>
              <div className="w-full text-center p-1" onClick={()=>setMembers(true)}>Members</div>
            </div>
          </div>
        </div>
        <div className="card-body w-full flex flex-col"  onClick={handleNavigate}>
        <div className="grp-img-div w-full flex justify-center items-center">
          <div className="outer-img w-[50%]">
            <img src="https://www.iconpacks.net/icons/1/free-user-group-icon-296-thumb.png" className="w-full" alt="icon" />
          </div>
        </div>
        <div className="members-pic-div w-full flex justify-center items-center flex-col">
          <div className="members-pics w-full flex justify-center items-center py-1">
            {
              profiles && profiles.length>0 && profiles.slice(0,3).map((item,index)=>{
                return <img src={item} alt="member" key={index} className="w-[30px] m-1 rounded-full" />
              })
            }
            {
              profiles.length>3 && <span className="ml-1 text-xs">...</span>
            }
          </div>
          <h1 className="text-xs text-slate-500 flex justify-center items-center"><MdGroup size={17} className="mr-1" />{workspace.members.length + 1 === 1 ? `${workspace.members.length + 1} Member` : `${workspace.members.length + 1} Members`}</h1>
        </div>
        <div className="enter-workspace-div w-full py-2">
          <h1 className="text-xs text-slate-500 w-full flex justify-center items-center">Enter workspace <MdOutlineDoubleArrow  size={17} className="ml-1"/></h1>
        </div>
      </div>
      </div>
      <div className={`card-footer w-full ${(members || about)?"hidden":"visible"}`}>
      <h1 className="w-full text-xs font-semibold text-end">
        - created by {workspace.owner}
      </h1>
      </div>
      <div className={`about-div w-full ${about?"visible opacity-100":"hidden opacity-0"}`}>
          <div className="back-btn w-full flex justify-end mb-4">
            <FaArrowRight size={18} onClick={()=>setAbout(false)}/>
          </div>
          <div className="content-about w-full text-xs text-center [transform:rotateY(180deg)]">
            {workspace.description}
          </div>
      </div>
      <div className={`members-div w-full ${members?"visible opacity-100":"hidden opacity-0"}`}>
          <div className="back-btn w-full flex justify-end mb-4">
            <FaArrowRight size={18} onClick={()=>setMembers(false)}/>
          </div>
          <div className="content-about w-full text-xs flex flex-col [transform:rotateY(180deg)]">
            {actualMembers?.map((item,index)=>{
              return <span className="w-full text-center p-2" key={index}>{item}</span>
            })}
          </div>
      </div>
    </div>
  )
}

WorkspaceCard.propTypes = {
  workspace: PropTypes.object.isRequired
}
