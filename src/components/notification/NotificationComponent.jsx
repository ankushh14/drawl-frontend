import PropTypes from "prop-types";
import useTheme from "../../hooks/useTheme";
import { useAuth } from "../../hooks/useAuth";
import { clearAll, getNotifications } from "../../api/notification";
import { useCallback, useEffect, useState } from "react";
import SingleNotificationComponent from "./SingleNotificationComponent";
import { showToastMessage } from "../../utils/toasts/showToast";
import { getThemeStyles } from "../../styles/theme";

export default function NotificationComponent({ noti, setPing }) {
  const { darkMode } = useTheme();
  const theme = getThemeStyles(darkMode);
  const [notifications, setNotifications] = useState([]);
  const [notificationRefresh, setNotificationsRefresh] = useState(false);
  const { user, token, authenticated } = useAuth();

  const fetchnotifications = useCallback(async () => {
    if (!authenticated) return;

    try {
      let requestBody = {
        email: user.email,
      };
      const response = await getNotifications(requestBody, token);
      setNotifications(response.data);
    } catch (error) {
      return;
    }
  }, [user, token, authenticated]);

  const checkNotifications = useCallback(() => {
    if (!authenticated) return;
    setPing(notifications?.length > 0);
  }, [notifications, setPing, authenticated]);

  useEffect(() => {
    checkNotifications();
  }, [checkNotifications]);

  useEffect(() => {
    if (!authenticated) return;

    fetchnotifications();
    const interval = setInterval(() => {
      fetchnotifications();
    }, 10000);

    return () => clearInterval(interval);
  }, [fetchnotifications, notificationRefresh, authenticated]);

  const clearAllNotifications = async () => {
    let requestBody = {
      userEmail: user.email,
    };

    const response = await clearAll(requestBody, token);

    if (response.valid) {
      setNotificationsRefresh((prev) => !prev);
    } else {
      showToastMessage(response.message, response.info);
    }
  };

  return (
    <div
      id="notification-div"
      className={`absolute z-[9999] w-full md:w-[420px] max-h-[60vh] overflow-y-auto top-12 right-0 md:right-6 rounded-2xl transition-all duration-300 no-scrollbar
      ${noti ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}
      ${theme.overlayCard}`}
    >
      {notifications.length === 0 ? (
        <div className="w-full py-10 flex items-center justify-center">
          <p className={`text-sm ${theme.mutedText}`}>Nothing to see here...</p>
        </div>
      ) : (
        <div className="flex flex-col">
          <div
            className={`flex items-center justify-between px-4 py-3 border-b ${theme.divider}`}
          >
            <h3 className="text-sm font-semibold">Notifications</h3>

            <button
              onClick={clearAllNotifications}
              className="text-xs text-purple-500 hover:text-purple-600 transition"
            >
              Clear all
            </button>
          </div>

          <div className="flex flex-col divide-y">
            {notifications.map((item, index) => (
              <SingleNotificationComponent
                key={index}
                item={item}
                setNotificationRefresh={setNotificationsRefresh}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

NotificationComponent.propTypes = {
  noti: PropTypes.bool.isRequired,
  setPing: PropTypes.func.isRequired,
};
