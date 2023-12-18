import PropTypes from "prop-types"
import { useNavigate } from "react-router-dom"


export default function WorkspaceCard({workspace}) {
  const navigate = useNavigate() 
  const workspaceRoute = import.meta.env.VITE_WORKSPACES
  const handleNavigate = ()=>{
    navigate(`/${workspaceRoute}/${workspace.ID}`)
  } 
  return (
    <div className="card w-[310px]  h-[350px] p-2 m-4 px-4 rounded bg-white text-black flex flex-col justify-between shadow shadow-inherit cursor-pointer hover:shadow-md   transition-all duration-500 ease-in-out" onClick={handleNavigate}>
        <div className="card-body w-full flex flex-col space-y-4">
        <h1 className="w-full font-bold">
            {workspace.name}
        </h1>
        <p className="w-full text-xs">
            {workspace.description}
        </p>
        </div>
        <h1 className="w-full text-sm font-semibold text-end">
            - {workspace.owner}
        </h1>
    </div>
  )
}

WorkspaceCard.propTypes = {
    workspace : PropTypes.object.isRequired
}
