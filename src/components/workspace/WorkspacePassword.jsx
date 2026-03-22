import { useState } from "react";
import { useWorkspace } from "../../hooks/useWorkspace";
import useTheme from "../../hooks/useTheme";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { getThemeStyles } from "../../styles/theme";
import Button from "../../components/ui/button";

export default function WorkspacePassword() {
  const [workspacePassword, setWorkspacePassword] = useState("");
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const theme = getThemeStyles(darkMode);
  const { password, updatePasswordStatus, leave } = useWorkspace();
  const [description, setDescription] = useState(
    "This workspace is password protected",
  );

  const handlePasswordVerification = (e) => {
    e.preventDefault();
    if (workspacePassword === password) {
      updatePasswordStatus(false);
    } else {
      setDescription("Invalid password");
    }
  };

  return (
    <div className={`w-full min-h-screen flex flex-col ${theme.page}`}>
      {/* Top Navigation */}
      <div className="w-full p-4">
        <button
          onClick={() => {
            navigate("/dashboard");
            leave();
          }}
          className="flex items-center gap-2 text-sm hover:opacity-80 transition"
        >
          <FaArrowLeftLong />
          Return to dashboard
        </button>
      </div>

      {/* Center Card */}
      <div className="flex flex-1 items-center justify-center px-4">
        <div
          className={`w-full max-w-md p-6 rounded-2xl flex flex-col gap-6 ${theme.card}`}
        >
          <div className="text-center">
            <h1 className="text-xl font-semibold">Workspace Access</h1>
            <p className={`text-xs mt-1 ${theme.mutedText}`}>
              Enter the password to continue
            </p>
          </div>

          <form
            className="flex flex-col gap-4"
            onSubmit={handlePasswordVerification}
          >
            <input
              type="password"
              autoComplete="off"
              placeholder="Enter workspace password"
              value={workspacePassword}
              onChange={(e) => setWorkspacePassword(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl outline-none transition
              ${
                darkMode
                  ? "bg-white/5 border border-white/10 text-white placeholder:text-gray-400"
                  : "bg-white border border-gray-300 text-gray-900 placeholder:text-gray-500"
              }
              focus:border-purple-500`}
            />

            <Button type="submit" className="w-full">
              Unlock Workspace
            </Button>
          </form>

          <p
            className={`text-xs text-center ${
              description === "Invalid password"
                ? "text-red-500"
                : theme.mutedText
            }`}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
