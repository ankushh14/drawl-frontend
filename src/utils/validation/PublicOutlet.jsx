import { Outlet, useNavigate} from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"

export default function PublicOutlet() {
    const navigate = useNavigate()
    const {authenticated} = useAuth()
    if(!authenticated){
        return <Outlet/>
    }else{
        return navigate(-1)
    }
}
