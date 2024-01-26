import { Navigate, Outlet} from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"

export default function PublicOutlet() {
    const {authenticated} = useAuth()
    if(!authenticated){
        return <Outlet/>
    }else{
        return <Navigate to={"/dashboard"}/>
    }
}
