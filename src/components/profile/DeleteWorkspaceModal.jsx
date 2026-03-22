import useTheme from "../../hooks/useTheme";
import PropTypes from "prop-types";
import { IoWarning } from "react-icons/io5";
import { deleteWorkspace } from "../../api/workspace";
import { useCallback } from "react";
import { useAuth } from "../../hooks/useAuth";
import { showToastMessage } from "../../utils/toasts/showToast";
import { useWorkspacesUpdate } from "../../hooks/useWorkspaceCount";
import { getThemeStyles } from "../../styles/theme";
import Button from "../ui/button";

export default function DeleteWorkspaceModal({
  workspaceName,
  workspaceID,
  ModalOpenController,
}) {
  const { darkMode } = useTheme();
  const theme = getThemeStyles(darkMode);
  const { token } = useAuth();
  const { setUpdateWorkspaceCount } = useWorkspacesUpdate();

  const workspaceDelete = useCallback(async () => {
    let requestBody = {
      workspaceID,
    };
    const response = await deleteWorkspace(requestBody, token);
    if (response.valid) {
      setUpdateWorkspaceCount((prev) => !prev);
      return showToastMessage(response.message, response.info);
    }
    return showToastMessage(response.message, response.info);
  }, [workspaceID, token, setUpdateWorkspaceCount]);

  const handleDelete = async () => {
    workspaceDelete();
    return ModalOpenController(false);
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center ${theme.overlay}`}
    >
      <div
        className={`w-[320px] rounded-2xl p-6 flex flex-col gap-4 text-center ${theme.overlayCard}`}
      >
        <div className="flex justify-center text-red-500">
          <IoWarning size={50} />
        </div>

        <h1 className="text-sm font-semibold leading-relaxed">
          Are you sure you want to delete <br />
          <span className="font-bold">{workspaceName}</span>?
        </h1>

        <p className={`text-xs ${theme.mutedText}`}>
          This action cannot be undone.
        </p>

        <div className="flex gap-2 mt-2">
          <Button variant="danger" className="w-full" onClick={handleDelete}>
            Delete
          </Button>

          <Button
            variant="secondary"
            className="w-full"
            onClick={() => ModalOpenController(false)}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

DeleteWorkspaceModal.propTypes = {
  workspaceName: PropTypes.string.isRequired,
  workspaceID: PropTypes.string.isRequired,
  ModalOpenController: PropTypes.func.isRequired,
};
