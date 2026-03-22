import { useState } from "react";
import useTheme from "../../hooks/useTheme";
import ThemeToggle from "../../utils/theme/ThemeToggle";
import ExitWorkspaceModal from "./ExitWorkspaceModal";
import { FaUsers } from "react-icons/fa";
import Collaborators from "../chats/Collaborators";
import { useClickAway } from "@uidotdev/usehooks";
import PropTypes from "prop-types";
import { IoIosChatbubbles } from "react-icons/io";
import { getThemeStyles } from "../../styles/theme";
import Button from "../ui/button";
import Portal from "../ui/portal";

export default function WorkspaceUtilityBar({ online, setChatComponent }) {
  const { darkMode } = useTheme();
  const theme = getThemeStyles(darkMode);

  const [exitModal, setExitModal] = useState(false);
  const [onlineList, setOnlineList] = useState(false);

  const onlineListRef = useClickAway(() => {
    setOnlineList(false);
  });

  return (
    <div
      className={`utility-bar w-full flex items-center justify-between px-4 py-2 border-b transition-colors duration-300
      ${theme.card}`}
    >
      <div className="left-utility-bar flex items-center gap-3 md:gap-4 lg:gap-5">
        <ThemeToggle />

        <div
          ref={onlineListRef}
          onClick={() => setOnlineList((prev) => !prev)}
          className={`online-members relative flex items-center gap-2 px-2 py-1 rounded-lg cursor-pointer transition
          ${darkMode ? "hover:bg-white/10" : "hover:bg-gray-100"}`}
        >
          <FaUsers size={16} />
          <span className="hidden md:block text-sm">Online</span>

          {onlineList && (
            <Portal>
              {" "}
              <Collaborators currentlyOnline={online} />{" "}
            </Portal>
          )}
        </div>
      </div>

      <h1 className="font-Aclonica font-bold text-sm md:text-base bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-400 bg-clip-text text-transparent">
        DrawL
      </h1>

      <div className="right-utility-bar flex items-center gap-2">
        <button
          onClick={() => setChatComponent((prev) => !prev)}
          className={`md:hidden p-2 rounded-lg transition
          ${darkMode ? "hover:bg-white/10" : "hover:bg-gray-100"}`}
        >
          <IoIosChatbubbles size={18} />
        </button>

        <Button variant="danger" size="md" onClick={() => setExitModal(true)}>
          Exit
        </Button>
      </div>

      {exitModal && (
        <Portal>
          <ExitWorkspaceModal ModalController={setExitModal} />{" "}
        </Portal>
      )}
    </div>
  );
}

WorkspaceUtilityBar.propTypes = {
  online: PropTypes.array.isRequired,
  setChatComponent: PropTypes.func.isRequired,
};
