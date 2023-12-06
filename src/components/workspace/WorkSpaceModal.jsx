import PropTypes from "prop-types"
import { IoClose } from "react-icons/io5";
import InputComp from "../../utils/input/InputComp";
import { useState } from "react";
import useTheme from "../../hooks/useTheme";
import { IoSearch } from "react-icons/io5";
import InputIcons from "../../utils/input/InputIcons";


export default function WorkSpaceModal({ openModal }) {
    const { darkMode } = useTheme()
    const [name, setName] = useState("")
    const [nameDescription, setNameDescription] = useState("")
    const [description, setDescription] = useState("")
    const [members, setMembers] = useState(["ankushshenoy97@gmail.com", "arghyadprasad", "arghyadprasad", "arghyadprasad", "arghyadprasad", "arghyadprasad"])
    const [individual, setIndividual] = useState("")
    const [password, setPassword] = useState("");
    const [passwordDesc, setPasswordDesc] = useState("")
    const [searchDescription, setSearchDescription] = useState("")
    const modalCloseHandle = (e) => {
        if (e.target.id === "Modal-background") {
            openModal(false)
        }
    }
    return (
        <div id="Modal-background" className="Modal-background fixed top-0 left-0 right-0 bottom-0 bg-[#5c5b5b5d] flex justify-center items-center" onClick={modalCloseHandle}>

            <div className={`Modal-div w-[95%] md:w-[75%] lg:w-[45%] p-5 ${darkMode ? "bg-black text-white" : "bg-white text-black"} rounded-md overflow-y-scroll`}>
                <div className="close-btn w-full flex justify-end">
                    <IoClose className={`cursor-pointer`} onClick={() => openModal(false)} />
                </div>
                <form className="w-full">
                    <div className="workspace-name w-full">
                        <InputComp label={"Workspace name"} name={"name"} placeholder={"Enter workspace name"} type={"text"} stateVar={name} setStatevar={setName} description={nameDescription} descriptionControlFunc={setNameDescription} />
                    </div>
                    <div className="workspace-description w-full p-2 flex flex-col space-y-3">
                        <label htmlFor="description" className="text-xs w-full">Workspace description</label>
                        <textarea name="description" id="description" cols="30" rows="6" placeholder="About your workspace..." className={`w-full p-3 bg-inherit border rounded-md text-xs border-slate-500 resize-none outline-none focus:border-2`} value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className="workspace-members w-full p-2 flex flex-col">
                        <div className="search-div relative">
                            <IoSearch className="absolute right-4 text-inherit bottom-[44%]" size={13} />
                            <InputComp type={"text"} placeholder={"Search for collaborators..."} name={"members"} label={"Collaborators"} required={false} stateVar={individual} setStatevar={setIndividual} description={searchDescription} descriptionControlFunc={setSearchDescription} />
                        </div>
                        <div className="member-div w-full p-2 flex items-center flex-wrap">
                            {
                                members.map((item, index) => {
                                    return <div className={`${darkMode ? "bg-white text-black" : "bg-black text-white"} flex justify-center items-center rounded-md text-xs px-3 pr-1 py-1 m-2`} key={index}><span>{item}</span><IoClose className="ml-2 cursor-pointer" size={15} /></div>
                                })
                            }
                        </div>
                    </div>
                    <div className={"password w-full relative"}>
                        <InputComp type={"password"} label={"Password (Optional)"} placeholder={"John_doe123"} name={"password"} required={false} stateVar={password} setStatevar={setPassword} description={passwordDesc} descriptionControlFunc={setPasswordDesc} />
                        <InputIcons type={"password"} />
                    </div>
                    <div className="create-workspace w-full p-2">
                        <button type="submit" className={`${darkMode ? "bg-white text-black" : "bg-black text-white"} border border-black rounded-md px-8 py-3 flex justify-center items-center text-xs w-full md:w-[60%] lg:w-[40%] active:scale-95 transition-all duration-500`}>Create workspace</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

WorkSpaceModal.propTypes = {
    openModal: PropTypes.func.isRequired
}
