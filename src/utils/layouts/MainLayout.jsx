import Navbar from "../../components/navbar/Navbar"
import { Outlet } from "react-router-dom"

export default function MainLayout() {
  return (
    <div className="w-full flex flex-col">
        <div className="navbar-div w-full">
            <Navbar/>
        </div>
        <div className="main-div w-full">
            <Outlet/>
        </div>
    </div>
  )
}
