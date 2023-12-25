import { useWorkspace } from "../../hooks/useWorkspace"
// import PT from "prop-types"

export default function Collaborators() {
    const {members,owner} = useWorkspace()
    const collaborators = [...members,owner]
    return (
        <div className="w-[250px] absolute p-2 rounded-md shadow shadow-black top-14 right-4 bg-slate-500 text-white">
            {
                collaborators?.map((item,index)=>{
                    return <div className="w-full p-1 flex justify-between items-center py-2" key={index}>
                        <h1 className="text-xs">{item}</h1>
                        {/* { currentlyOnline.some(obj => obj.email === item) && <div className="rounded-full w-3 h-3 bg-orange-300"></div> } */}
                    </div>
                })
            }
        </div>
    )
}

// Collaborators.propTypes = {
//     currentlyOnline : PT.array.isRequired
// }
