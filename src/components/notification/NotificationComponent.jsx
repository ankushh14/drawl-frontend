import PropTypes from "prop-types";
import useTheme from "../../hooks/useTheme";
import { useAuth } from "../../hooks/useAuth";
import { clearAll, getNotifications } from "../../api/notification";
import { useCallback, useEffect, useState } from "react";
import SingleNotificationComponent from "./SingleNotificationComponent";
import { showToastMessage } from "../../utils/toasts/showToast";

export default function NotificationComponent({
  noti,
  setPing,
}) {
  const { darkMode } = useTheme();
  const [notifications, setNotifications] = useState([]);
  const [notificationRefresh, setNotificationsRefresh] = useState(false);
  const { user, token } = useAuth();

  const fetchnotifications = useCallback(async () => {
    try {
      let requestBody = {
        email: user.email,
      };
      const response = await getNotifications(requestBody, token);
      return setNotifications(response.data);
    } catch (error) {
      return
    }
  }, [user, setNotifications, token]);

  const checkNotifications = useCallback(() => {
    if (notifications.length > 0) {
      setPing(true);
    } else {
      setPing(false);
    }
  }, [notifications, setPing]);

  useEffect(() => {
    checkNotifications();
  }, [checkNotifications]);

  useEffect(() => {
    fetchnotifications();
    setInterval(() => {
      fetchnotifications();
    }, 30000);
  }, [fetchnotifications, notificationRefresh]);

  const clearAllNotifications = async()=>{
    let requestBody = {
      userEmail : user.email
    }
    const response = await clearAll(requestBody, token);
    if (response.valid) {
      return setNotificationsRefresh((prev) => !prev);
    } else {
      return showToastMessage(response.message, response.info);
    }
  }

  return (
    <div
      id="notification-div"
      className={`notification-list absolute z-50 w-full md:w-[50%] lg:w-[30%] max-h-[50%] overflow-y-scroll  top-10 transition-all duration-300 border right-0 md:right-10 rounded-md no-scrollbar border-[#d3d3d3] 
      ${
        noti ? "visible opacity-100" : "invisible opacity-0"
      } 
      ${
        darkMode
          ? "bg-[#212529] text-white"
          : "bg-white text-black"
      }`}
    >
      {notifications.length === 0 ? (
        <div className="notfound-div w-full p-3 py-6">
          <h1 className="font-bold text-center text-sm md:text-md">
            Nothing to see here...
          </h1>
        </div>
      ) : (
        <div className="notification-div w-full flex flex-col">
          <div className="w-full flex p-2 justify-between items-center border-b">
                <h3 className="text-xs">Notifications</h3>
                <button className="text-xs rounded-md text-blue-500" onClick={clearAllNotifications}>Clear all</button>
          </div>  
          {notifications.map((item, index) => {
            return (
              <SingleNotificationComponent
                key={index}
                item={item}
                setNotificationRefresh={setNotificationsRefresh}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

NotificationComponent.propTypes = {
  noti: PropTypes.bool.isRequired,
  setPing: PropTypes.func.isRequired,
};
