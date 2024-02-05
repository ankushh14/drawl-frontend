import Navbar from "../../components/navbar/Navbar"
import { Outlet } from "react-router-dom"
import useTheme from "../../hooks/useTheme"

export default function MainLayout() {
  const { darkMode } = useTheme()
  return (
    <div className={`main-layout w-full flex flex-col ${darkMode?"bg-[#212529]":"bg-white"}`}>
        <Navbar/>
        <div className="main-div w-full">
            <Outlet/>
        </div>
    </div>
  )
}
