import { Tldraw } from "@tldraw/tldraw"
import '@tldraw/tldraw/tldraw.css'
import useTheme from "../../hooks/useTheme"
import { useWorkspace } from "../../hooks/useWorkspace";
import useBoardStore from "../../hooks/useBoardStore";
import { useAuth } from "../../hooks/useAuth";
import { myOverrides } from "../../utils/tldraw/new_Overrides";
import { useEffect, useState } from "react";



export default function MainWhiteBoard() {
  const {darkMode} = useTheme()
  const {ID} = useWorkspace()
  const {user} = useAuth()
  const store = useBoardStore({roomID:ID,userName:user.email})
  const [editor,setEditor] = useState(null)

  useEffect(()=>{
    if(editor !==null || editor !== undefined){
      editor.user.updateUserPreferences({isDarkMode : darkMode})
      console.log(editor)
    }
  },[darkMode,editor])

  return (
    <div className='w-full fixed md:w-[65%] xl:w-[75%] md:static h-[calc(100%-41.6px)] md:h-full'>
      <Tldraw store={store} overrides={myOverrides} className={`border ${darkMode?"border-[#30363b]":"border-[#d3d3d3]"}`} onMount={(editor)=>setEditor(editor)}/>
    </div>
  )
}
