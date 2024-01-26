import { Tldraw } from "@tldraw/tldraw"
import '@tldraw/tldraw/tldraw.css'
import useTheme from "../../hooks/useTheme"
import { useWorkspace } from "../../hooks/useWorkspace";
import useBoardStore from "../../hooks/useBoardStore";
import { useAuth } from "../../hooks/useAuth";
import { useCallback } from "react";



export default function MainWhiteBoard() {
  const {darkMode,setDarkMode} = useTheme()
  const {ID} = useWorkspace()
  const {user} = useAuth()
  const store = useBoardStore({roomID:ID,userName:user.email})
  const handleUiEvent = useCallback((name)=>{
    if(name === 'toggle-dark-mode'){
      return setDarkMode(!darkMode)
    }
  },[darkMode,setDarkMode])

  return (
    <div className='w-full fixed md:w-[60%] xl:w-[75%] md:static h-[94vh] border'>
      <Tldraw inferDarkMode = {darkMode} store={store} overrides={{
        menu(editor,menu){
          const newMenu = menu.slice(0,2);
          return newMenu
        }
      }} onUiEvent={handleUiEvent}/>
    </div>
  )
}
