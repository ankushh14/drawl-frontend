import { Outlet,Navigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import { showToastMessage } from "../toasts/showToast"

export default function AuthenticatedValidate() {
    const {authenticated} = useAuth()
    // const navigate = useNavigate()
    if(authenticated){
        return <Outlet/>
    }else{
        showToastMessage("Please login to continue","error")
        return <Navigate to={"/auth"}/>
    }
}
