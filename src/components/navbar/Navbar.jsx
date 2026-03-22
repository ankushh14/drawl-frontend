import { useCallback, useState } from "react";
import useTheme from "../../hooks/useTheme";
import ThemeToggle from "../../utils/theme/ThemeToggle";
import { IoIosNotifications } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";
import NotificationComponent from "../notification/NotificationComponent";
import { useAuth } from "../../hooks/useAuth";
import { userLogout } from "../../api/auth";
import { showToastMessage } from "../../utils/toasts/showToast";
import { useIsusingworkspace } from "../../hooks/useIsusingworkspace";
import { useClickAway } from "@uidotdev/usehooks";
import { getThemeStyles } from "../../styles/theme";
import Button from "../ui/button";
import Portal from "../ui/portal";

export default function Navbar() {
  const { darkMode } = useTheme();
  const theme = getThemeStyles(darkMode);
  const { isUsingworkspace } = useIsusingworkspace();
  const navigate = useNavigate();
  const { user, token, logout } = useAuth();
  const [nav, setNav] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [ping, setPing] = useState(false);

  const logoutFunction = useCallback(async () => {
    const data = await userLogout(token);
    if (data.valid) {
      showToastMessage(data.message, data.info);
      return logout();
    } else {
      showToastMessage(data.message, data.info);
    }
  }, [token, logout]);

  const navigationRef = useClickAway((e) => {
    if (e.target.closest("#navigation-dropdown")) return;
    setNav(false);
  });

  const notificationRef = useClickAway((e) => {
    if (e.target.closest("#notification-div")) return;
    setNotifications(false);
  });

  return (
    <div
      className={`w-full flex justify-between items-center px-4 py-2 border-b transition-colors duration-500
      ${theme.card} ${isUsingworkspace && "hidden"}`}
    >
      <div
        className="cursor-pointer font-Aclonica font-bold text-lg bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-400 bg-clip-text text-transparent"
        onClick={() => navigate("/dashboard")}
      >
        DrawL
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />

        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => setNotifications((prev) => !prev)}
            className={`p-2 rounded-lg transition ${
              darkMode ? "hover:bg-white/10" : "hover:bg-gray-100"
            }`}
          >
            <IoIosNotifications size={20} />
          </button>

          {ping && (
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          )}
        </div>

        <div ref={navigationRef} className="relative">
          <button
            onClick={() => setNav((prev) => !prev)}
            className={`flex flex-col justify-center items-center gap-[3px] p-2 rounded-lg transition
            ${darkMode ? "hover:bg-white/10" : "hover:bg-gray-100"}`}
          >
            <span
              className={`w-5 h-[2px] transition-all duration-300 ${
                darkMode ? "bg-white" : "bg-black"
              } ${nav ? "rotate-45 translate-y-[2.5px]" : ""}`}
            />
            <span
              className={`w-5 h-[2px] transition-all duration-300 ${
                darkMode ? "bg-white" : "bg-black"
              } ${nav ? "-rotate-45 -translate-y-[2.5px]" : ""}`}
            />
          </button>

          <Portal>
            <div
              id="navigation-dropdown"
              className={`absolute right-0 top-12 w-[280px] rounded-2xl overflow-hidden transition-all duration-300 z-50
            ${nav ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}
            ${darkMode ? "text-white" : "text-black"}
            ${theme.overlayCard}`}
            >
              <div
                className={`flex items-center justify-between px-4 py-3 border-b ${theme.divider}`}
              >
                <span className="text-xs truncate">{user.email}</span>
                <img
                  src={user.profile}
                  alt={`${user.email} profile`}
                  className="w-6 h-6 rounded-full"
                />
              </div>

              <NavLink
                to="/dashboard"
                onClick={() => setNav(false)}
                className={`block px-4 py-3 text-sm transition ${
                  darkMode ? "hover:bg-white/10" : "hover:bg-gray-100"
                }`}
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/profile"
                onClick={() => setNav(false)}
                className={`block px-4 py-3 text-sm transition ${
                  darkMode ? "hover:bg-white/10" : "hover:bg-gray-100"
                }`}
              >
                Profile
              </NavLink>

              <div className="px-4 py-3">
                <Button
                  variant="danger"
                  className="w-full"
                  onClick={logoutFunction}
                >
                  Logout
                </Button>
              </div>
            </div>
          </Portal>
        </div>
      </div>

      <Portal>
        <NotificationComponent noti={notifications} setPing={setPing} />
      </Portal>
    </div>
  );
}
