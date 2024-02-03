import Navbar from "../../components/navbar/Navbar"
import { Outlet } from "react-router-dom"

export default function MainLayout() {
  return (
    <div className="w-full flex flex-col">
        <Navbar/>
        <div className="main-div w-full">
            <Outlet/>
        </div>
    </div>
  )
}
