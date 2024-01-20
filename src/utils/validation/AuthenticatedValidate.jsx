import { Outlet,Navigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import { WorkspaceCountProvider } from "../../context/UserWorkspaceCountUpdate"

export default function AuthenticatedValidate() {
    const {authenticated} = useAuth()
    return(
        <WorkspaceCountProvider>
            {
                authenticated?<Outlet/>:<Navigate to={"/auth"}/>
            }
        </WorkspaceCountProvider>
    )
}
