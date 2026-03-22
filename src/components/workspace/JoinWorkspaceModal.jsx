import PropTypes from "prop-types";
import { IoClose } from "react-icons/io5";
import useTheme from "../../hooks/useTheme";
import { useCallback, useEffect, useState } from "react";
import { findWorkspaces } from "../../api/workspace";
import { useDebounce } from "@uidotdev/usehooks";
import { useAuth } from "../../hooks/useAuth";
import { joinWorkspace } from "../../api/workspace";
import { showToastMessage } from "../../utils/toasts/showToast";
import { getThemeStyles } from "../../styles/theme";
import Button from "../ui/button";

export default function JoinWorkspaceModal({ openJoinModal }) {
  const { darkMode } = useTheme();
  const theme = getThemeStyles(darkMode);
  const { token, user } = useAuth();
  const [workspaceSearch, setWorkspaceSearch] = useState("");
  const [searchArray, setSearchArray] = useState([]);
  const [inputDescription, setInputDescription] = useState(null);
  const [finalSelectedWorkspace, setFinalSelectedWorkspace] = useState("");
  const [finalWorkspaceID, setFinalWorkspaceID] = useState(null);
  const [finalWorkspaceOwner, setFinalWorkspaceOwner] = useState(null);
  const debouncedSearch = useDebounce(workspaceSearch, 500);

  const searchWorkspaces = useCallback(async () => {
    setInputDescription(null);
    setSearchArray([]);
    if (debouncedSearch == "" || undefined) {
      return;
    }
    let requestBody = {
      name: debouncedSearch,
      email: user.email,
    };
    const data = await findWorkspaces(requestBody, token);
    if (data.data.length === 0) {
      return setInputDescription("Workspace not found");
    }
    return setSearchArray(data.data);
  }, [debouncedSearch, token, user]);

  useEffect(() => {
    searchWorkspaces();
  }, [searchWorkspaces]);

  const modalCloseHandle = (e) => {
    if (e.target.id === "Modal-background") {
      openJoinModal(false);
    }
  };

  const handleSelection = (name, id, owner) => {
    if (!searchArray.find((value) => value.name === name)) {
      return setInputDescription("Workspace not found");
    }
    setWorkspaceSearch("");
    setFinalSelectedWorkspace(name);
    setFinalWorkspaceID(id);
    setFinalWorkspaceOwner(owner);
    return setSearchArray([]);
  };

  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      const item = searchArray.find((item) => item.name === workspaceSearch);
      return handleSelection(workspaceSearch, item.ID, item.owner);
    } else {
      return;
    }
  };

  const sendJoinRequest = useCallback(async () => {
    if (
      !finalSelectedWorkspace ||
      !finalWorkspaceID ||
      !finalSelectedWorkspace ||
      !user
    ) {
      return showToastMessage("Request failed", "error");
    }
    let requestBody = {
      to: finalWorkspaceOwner,
      from: user.email,
      ID: finalWorkspaceID,
      workspacename: finalSelectedWorkspace,
    };
    const response = await joinWorkspace(requestBody, token);
    if (response.valid) {
      showToastMessage(response.message, response.info);
      return openJoinModal(false);
    } else {
      return showToastMessage("Request failed", response.info);
    }
  }, [
    finalSelectedWorkspace,
    finalWorkspaceID,
    finalWorkspaceOwner,
    user,
    token,
    openJoinModal,
  ]);

  return (
    <div
      id="Modal-background"
      className={`fixed inset-0 flex items-center justify-center ${theme.overlay}`}
      onClick={modalCloseHandle}
    >
      <div
        className={`w-[95%] md:w-[75%] lg:w-[45%] p-6 text-xs rounded-2xl transition ${theme.overlayCard}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full flex justify-end">
          <IoClose
            className="cursor-pointer text-lg"
            onClick={() => openJoinModal(false)}
          />
        </div>

        <div className="w-full py-2 text-xs text-red-500">
          <p>
            Note: You can only access the workspace once your join request has
            been accepted by the owner of the workspace.
          </p>
        </div>

        <div
          className={`w-full mt-3 p-4 rounded-xl border transition
          ${
            darkMode
              ? "bg-green-500/10 border-green-500/30"
              : "bg-green-50 border-green-200"
          }`}
        >
          <p className="text-[0.65rem] text-green-500 mb-1">
            Selected Workspace
          </p>

          <p className="text-sm font-semibold break-words">
            {finalSelectedWorkspace || "No workspace selected"}
          </p>
        </div>

        <div className="w-full mt-4 relative">
          <input
            type="text"
            placeholder="Search workspace..."
            value={workspaceSearch}
            onChange={(e) => setWorkspaceSearch(e.target.value)}
            onKeyDown={handleEnterKey}
            className={`${theme.input} w-full px-4 py-3 rounded-xl outline-none focus:border-purple-500 ${
              inputDescription ? "border-red-500" : ""
            }`}
          />

          {inputDescription && (
            <div className="w-full mt-1 px-2 text-[0.65rem] text-red-500">
              {inputDescription}
            </div>
          )}

          {searchArray.length > 0 && (
            <div
              className={`absolute w-full mt-2 rounded-xl max-h-[240px] overflow-y-auto z-20 ${theme.overlayCard}`}
            >
              {searchArray.map((item, index) => (
                <div
                  key={index}
                  onClick={() =>
                    handleSelection(item.name, item.ID, item.owner)
                  }
                  className={`w-full p-3 cursor-pointer border-b last:border-none ${
                    darkMode ? "hover:bg-white/10" : "hover:bg-gray-100"
                  }`}
                >
                  <h1 className="font-medium text-sm">
                    Workspace: {item.name}
                  </h1>
                  <p className={`text-[0.7rem] ${theme.mutedText}`}>
                    Owner: {item.owner}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="w-full mt-6">
          <Button className="w-full" onClick={sendJoinRequest}>
            Send join request
          </Button>
        </div>
      </div>
    </div>
  );
}

JoinWorkspaceModal.propTypes = {
  openJoinModal: PropTypes.func.isRequired,
};
