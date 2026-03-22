import { useAuth } from "../../hooks/useAuth";
import { useWorkspace } from "../../hooks/useWorkspace";
import PT from "prop-types";
import useTheme from "../../hooks/useTheme";
import { getThemeStyles } from "../../styles/theme";

export default function Collaborators({ currentlyOnline }) {
  const { members, owner } = useWorkspace();
  const collaborators = [...members, owner];
  const { user } = useAuth();
  const { darkMode } = useTheme();
  const theme = getThemeStyles(darkMode);

  return (
    <div
      id="collaborators-list"
      className={`absolute top-12 left-2 md:left-5 w-[260px] p-3 rounded-2xl z-[999] flex flex-col gap-2
      ${theme.overlayCard} ${darkMode ? "text-white" : "text-black"}`}
    >
      <h1 className="text-xs font-semibold mb-1">Collaborators</h1>

      {collaborators.map((item, index) => {
        const isOnline = currentlyOnline.includes(item);

        return (
          <div
            key={index}
            className={`flex items-center justify-between px-2 py-2 rounded-lg transition
            ${darkMode ? "hover:bg-white/10" : "hover:bg-gray-100"}`}
          >
            <span className="text-xs truncate">
              {item === user.email ? `You (${item})` : item}
            </span>

            <div className="flex items-center gap-2">
              {isOnline && (
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

Collaborators.propTypes = {
  currentlyOnline: PT.array.isRequired,
};
