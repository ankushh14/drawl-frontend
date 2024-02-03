import { Outlet,Navigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import WorkspaceCommonProvider from "../WorkspaceCommonProvider"

export default function AuthenticatedValidate() {
    const {authenticated} = useAuth()
    return(
        <WorkspaceCommonProvider>
            {
                authenticated?<Outlet/>:<Navigate to={"/auth"}/>
            }
        </WorkspaceCommonProvider>
    )
}
