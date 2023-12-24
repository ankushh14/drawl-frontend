import { useWorkspace } from "../../hooks/useWorkspace"

export default function Collaborators() {
    const {members} = useWorkspace()
    return (
        <div className="w-[250px] absolute p-2 rounded-md shadow shadow-black top-14 right-4 bg-slate-500 text-white">
            {
                members?.map((item,index)=>{
                    return <div className="w-full p-1 flex justify-between items-center" key={index}>
                        <h1 className="text-xs">{item}</h1>
                        <div className="rounded-full w-3 h-3 bg-orange-400"></div>
                    </div>
                })
            }
        </div>
    )
}
