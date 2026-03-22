import PropTypes from "prop-types";
import { IoCheckmarkSharp, IoCloseSharp, IoTrash } from "react-icons/io5";
import { deleteOne, sendResponse } from "../../api/notification";
import { showToastMessage } from "../../utils/toasts/showToast";
import { useAuth } from "../../hooks/useAuth";
import { useWorkspacesUpdate } from "../../hooks/useWorkspaceCount";
import { useEffect } from "react";
import Button from "../ui/button";
import useTheme from "../../hooks/useTheme";
import { getThemeStyles } from "../../styles/theme";

export default function SingleNotificationComponent({
  item,
  setNotificationRefresh,
}) {
  const { token } = useAuth();
  const { setUpdateWorkspaceCount } = useWorkspacesUpdate();
  const { darkMode } = useTheme();
  const theme = getThemeStyles(darkMode);

  const handleResponse = async (answer = undefined) => {
    if (answer === undefined) return;

    let requestBody = {
      notificationID: item._id,
      answer,
    };

    const response = await sendResponse(requestBody, token);

    if (response.valid) {
      setUpdateWorkspaceCount((prev) => !prev);
      return setNotificationRefresh((prev) => !prev);
    } else {
      return showToastMessage("Some error occured", response.info);
    }
  };

  const handleDelete = async () => {
    let requestBody = {
      notificationID: item._id,
    };

    const response = await deleteOne(requestBody, token);

    if (response.valid) {
      return setNotificationRefresh((prev) => !prev);
    } else {
      return showToastMessage(response.message, response.info);
    }
  };

  useEffect(() => {
    if (
      item.type === "ACCEPT" ||
      item.type === "REMOVE" ||
      item.type === "LEAVE"
    ) {
      setUpdateWorkspaceCount((prev) => !prev);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`w-full p-4 flex items-center justify-between transition-colors duration-200
      border-b last:border-none ${theme.divider}`}
    >
      <div className="flex flex-col gap-2 w-full">
        <p className="text-sm font-medium leading-snug break-words">
          {item.message}
        </p>

        {(item.type === "INVITE" || item.type === "REQUEST") && (
          <div className="flex gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={() => handleResponse(true)}
              leftIcon={<IoCheckmarkSharp size={14} />}
            >
              Accept
            </Button>

            <Button
              variant="danger"
              size="sm"
              onClick={() => handleResponse(false)}
              leftIcon={<IoCloseSharp size={14} />}
            >
              Reject
            </Button>
          </div>
        )}
      </div>

      {!(item.type === "INVITE" || item.type === "REQUEST") && (
        <button
          onClick={handleDelete}
          className={`ml-4 p-2 rounded-lg transition
          ${darkMode ? "hover:bg-white/10" : "hover:bg-gray-100"}`}
        >
          <IoTrash size={16} />
        </button>
      )}
    </div>
  );
}

SingleNotificationComponent.propTypes = {
  item: PropTypes.object.isRequired,
  setNotificationRefresh: PropTypes.func.isRequired,
};
