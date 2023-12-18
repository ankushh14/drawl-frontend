import { WorkSpaceProvider } from "../../context/WorkspaceContext";
import { Outlet } from "react-router-dom";

export default function WorkSpaceLayout() {
  return (
    <WorkSpaceProvider>
        <Outlet/>
    </WorkSpaceProvider>
  )
}
