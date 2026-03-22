import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import {
  FaEye,
  FaEyeSlash,
  FaRegCopy,
  FaTrash,
  FaPen,
  FaCheck,
  FaPlus,
} from "react-icons/fa";
import { showToastMessage } from "../../utils/toasts/showToast";
import DeleteWorkspaceModal from "./DeleteWorkspaceModal";
import { removeMember, updatePassword } from "../../api/workspace";
import { useAuth } from "../../hooks/useAuth";
import { useWorkspacesUpdate } from "../../hooks/useWorkspaceCount";
import AddMemberModal from "./AddMemberModal";
import useTheme from "../../hooks/useTheme";
import { getThemeStyles } from "../../styles/theme";
import Button from "../ui/button";

export default function ProfileAccordion({
  workspaceName,
  workspacePassword,
  workspaceMembers,
  workspaceID,
}) {
  const { token } = useAuth();
  const { setUpdateWorkspaceCount } = useWorkspacesUpdate();
  const { darkMode } = useTheme();
  const theme = getThemeStyles(darkMode);

  const [open, setOpen] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [passwordEdit, setPasswordEdit] = useState(false);
  const [password, setPassword] = useState(workspacePassword);
  const [deleteWorkspace, setDeleteWorkspace] = useState(false);
  const [isAddingMembers, setIsAddingMembers] = useState(false);

  const copyPassword = () => {
    navigator.clipboard.writeText(workspacePassword);
    showToastMessage("copied to clipboard", "success");
  };

  const removeWorkspaceMember = useCallback(
    async (mail) => {
      const response = await removeMember(
        { memberMail: mail, workspaceID },
        token,
      );
      showToastMessage(response.message, response.info);
      if (response.valid) {
        setUpdateWorkspaceCount((prev) => !prev);
      }
    },
    [workspaceID, token, setUpdateWorkspaceCount],
  );

  const handlePasswordChange = async () => {
    if (password !== workspacePassword) {
      const data = await updatePassword({ password, workspaceID }, token);
      showToastMessage(data.message, data.info);
      if (data.valid) {
        setUpdateWorkspaceCount((prev) => !prev);
        setPasswordEdit(false);
      }
    } else {
      setPasswordEdit(false);
    }
  };

  const handleCancel = () => {
    setPassword(workspacePassword);
    setPasswordEdit(false);
  };

  return (
    <div className={`rounded-2xl p-4 transition mb-2 ${theme.card}`}>
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-sm">{workspaceName}</h1>

        <div className="flex gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? "Close" : "Manage"}
          </Button>

          <Button
            size="sm"
            variant="danger"
            onClick={() => setDeleteWorkspace(true)}
          >
            Delete
          </Button>
        </div>
      </div>

      {/* Expandable Content */}
      <div
        className={`transition-all duration-300 overflow-hidden ${
          open ? "max-h-[400px] mt-4" : "max-h-0"
        }`}
      >
        {/* Password Section */}
        <div className="flex flex-col gap-2 mb-4">
          <span className={`text-xs ${theme.mutedText}`}>Password</span>

          {password.length > 0 || passwordEdit ? (
            <div className="flex items-center gap-2 flex-wrap">
              <input
                type={passwordVisibility ? "password" : "text"}
                disabled={!passwordEdit}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`px-3 py-1 rounded-md text-xs outline-none
                ${
                  darkMode
                    ? "bg-white/10 border border-white/10"
                    : "bg-gray-100 border border-gray-300"
                }`}
              />

              <span
                className="cursor-pointer text-gray-500"
                onClick={() => setPasswordVisibility((prev) => !prev)}
              >
                {passwordVisibility ? <FaEyeSlash /> : <FaEye />}
              </span>

              <FaRegCopy
                className="cursor-pointer text-gray-500"
                onClick={copyPassword}
              />

              {passwordEdit ? (
                <>
                  <FaCheck
                    className="cursor-pointer text-green-500"
                    onClick={handlePasswordChange}
                  />
                  <FaPlus
                    className="rotate-45 cursor-pointer text-red-500"
                    onClick={handleCancel}
                  />
                </>
              ) : (
                <FaPen
                  className="cursor-pointer text-gray-500"
                  onClick={() => setPasswordEdit(true)}
                />
              )}
            </div>
          ) : (
            <button
              onClick={() => setPasswordEdit(true)}
              className="text-xs text-purple-500 flex items-center gap-1"
            >
              Add password <FaPlus />
            </button>
          )}
        </div>

        {/* Members */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className={`text-xs ${theme.mutedText}`}>Members</span>

            <button
              className="text-xs text-purple-500 flex items-center gap-1"
              onClick={() => setIsAddingMembers(true)}
            >
              Add <FaPlus />
            </button>
          </div>

          {workspaceMembers.length === 0 ? (
            <p className="text-xs opacity-60">No members</p>
          ) : (
            workspaceMembers.map((member, index) => (
              <div
                key={index}
                className="flex justify-between items-center text-xs py-1"
              >
                <span>{member}</span>
                <FaTrash
                  className="cursor-pointer text-red-400"
                  size={12}
                  onClick={() => removeWorkspaceMember(member)}
                />
              </div>
            ))
          )}
        </div>
      </div>

      {deleteWorkspace && (
        <DeleteWorkspaceModal
          workspaceName={workspaceName}
          ModalOpenController={setDeleteWorkspace}
          workspaceID={workspaceID}
        />
      )}

      {isAddingMembers && (
        <AddMemberModal
          workspaceID={workspaceID}
          openModal={setIsAddingMembers}
          workspaceMembers={workspaceMembers}
        />
      )}
    </div>
  );
}

ProfileAccordion.propTypes = {
  workspaceName: PropTypes.string.isRequired,
  workspacePassword: PropTypes.string.isRequired,
  workspaceID: PropTypes.string.isRequired,
  workspaceMembers: PropTypes.array.isRequired,
};
