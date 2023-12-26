import PropTypes from "prop-types"
import { useNavigate } from "react-router-dom"
import { MdGroup,MdOutlineDoubleArrow } from "react-icons/md";
import { getProfiles } from "../../api/workspace";
import { useCallback, useEffect, useState } from "react";



export default function WorkspaceCard({ workspace }) {
  const navigate = useNavigate()
  const [profiles,setProfiles] = useState([])
  const workspaceRoute = import.meta.env.VITE_WORKSPACES
  const handleNavigate = () => {
    navigate(`/${workspaceRoute}/${workspace.ID}`)
  }
  const getProfileData = useCallback(async()=>{
    let requestBody = {
      workspaceID : workspace.ID
    }
    const data = await getProfiles(requestBody)
    if(data.valid){
      return setProfiles(data.data)
    }else{
      return
    }
  },[workspace])

  useEffect(()=>{
    getProfileData()
  },[getProfileData])

  return (
    <div className="card w-[300px]  h-[330px] p-2 m-4 px-4 rounded bg-white text-black flex flex-col justify-between shadow shadow-inherit cursor-pointer hover:shadow-md   transition-all duration-500 ease-in-out">
      <div className="card-body w-full flex flex-col space-y-4">
        <div className="card-header w-full py-1 flex justify-between items-center">
          <h1 className="w-full font-bold">
            {workspace.name}
          </h1>
          <div className="dots-div flex flex-col">
            <span className="w-[0.15rem] h-[0.15rem] bg-black m-[0.08rem] rounded-full"></span>
            <span className="w-[0.15rem] h-[0.15rem] bg-black m-[0.08rem] rounded-full"></span>
            <span className="w-[0.15rem] h-[0.15rem] bg-black m-[0.08rem] rounded-full"></span>
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
      <div className="card-footer w-full">
      <h1 className="w-full text-xs font-semibold text-end">
        - created by {workspace.owner}
      </h1>
      </div>
    </div>
  )
}

WorkspaceCard.propTypes = {
  workspace: PropTypes.object.isRequired
}
