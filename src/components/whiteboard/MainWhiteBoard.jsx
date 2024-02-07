import { Tldraw } from "@tldraw/tldraw"
import '@tldraw/tldraw/tldraw.css'
import useTheme from "../../hooks/useTheme"
import { useWorkspace } from "../../hooks/useWorkspace";
import useBoardStore from "../../hooks/useBoardStore";
import { useAuth } from "../../hooks/useAuth";
import { myOverrides } from "../../utils/tldraw/new_Overrides";



export default function MainWhiteBoard() {
  const {darkMode} = useTheme()
  const {ID} = useWorkspace()
  const {user} = useAuth()
  const store = useBoardStore({roomID:ID,userName:user.email})

  return (
    <div className='w-full fixed md:w-[65%] xl:w-[75%] md:static h-[calc(100%-41.6px)] md:h-full border border-[#30363b] transition-colors duration-500'>
      <Tldraw inferDarkMode = {darkMode} store={store} overrides={myOverrides} />
    </div>
  )
}
