import { useState } from "react"
import { BsEyeSlashFill,BsEyeFill } from "react-icons/bs"
import PropTypes from "prop-types"

export default function InputIcons({type}) {
  const [visible,setVisible] = useState(false);
  if(visible){
    document.getElementById("password").type = "text"
  }else{
    if(document.getElementById("password"))
    document.getElementById("password").type = "password"
  }  
  if(type === "password"){
    return (
        <div className="icon absolute right-4 bottom-[3.25rem] lg:bottom-[2.45rem] cursor-pointer" onTouchStart={()=>setVisible(true)} onTouchEnd={()=>setVisible(false)} onMouseDown={()=>setVisible(true)} onMouseUp={()=>setVisible(false)}>
            {
                visible?<BsEyeFill size={15}/>:<BsEyeSlashFill size={15}/>
            }
        </div>
    )
  }else{
    return <></>
  }
}

InputIcons.propTypes = {
    type: PropTypes.string.isRequired
}