import { useAuth } from "../../hooks/useAuth"
import { useWorkspace } from "../../hooks/useWorkspace"
import PT from "prop-types"

export default function Collaborators({currentlyOnline}) {
    const {members,owner} = useWorkspace()
    const collaborators = [...members,owner]
    const {user} = useAuth()
    return (
        <div className="w-[300px] absolute p-2 rounded-md shadow shadow-black top-14 right-2 bg-slate-500 text-white">
            {
                collaborators?.map((item,index)=>{
                    return <div className="w-full p-1 flex justify-between items-center py-2" key={index}>
                        <h1 className="text-xs">
                            {
                                item === user.email?`You (${item})`:item
                            }
                        </h1>
                        { currentlyOnline.includes(item) && <div className="rounded-full w-3 h-3 bg-orange-300"></div> }
                    </div>
                })
            }
        </div>
    )
}

Collaborators.propTypes = {
    currentlyOnline : PT.array.isRequired
}
