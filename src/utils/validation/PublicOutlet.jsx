import { Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"

export default function PublicOutlet() {
    const {authenticated} = useAuth()
    const navigate = useNavigate()
    if(!authenticated){
        return (
            <Outlet/>
        )
    }else{
        return navigate(-1)
    }
}
