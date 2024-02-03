import { IsUsingworkspaceProvider } from "../context/IsUsingWorkspaceContext";
import { WorkspaceCountProvider } from "../context/UserWorkspaceCountUpdate";
import PropTypes from 'prop-types'


export default function WorkspaceCommonProvider ({children}){
    return(
        <WorkspaceCountProvider>
            <IsUsingworkspaceProvider>
                {children}
            </IsUsingworkspaceProvider>
        </WorkspaceCountProvider>
    )
}

WorkspaceCommonProvider.propTypes = {
    children : PropTypes.element.isRequired
}