import { useAuth } from "../hooks/useAuth";
import { getWorkspaces } from "../api/workspace";
import { useCallback, useEffect, useState } from "react";
import { useWorkspacesUpdate } from "../hooks/useWorkspaceCount";
import ProfileAccordion from "../components/profile/ProfileAccordion";
import { showToastMessage } from "../utils/toasts/showToast";
import useTheme from "../hooks/useTheme";
import { getThemeStyles } from "../styles/theme";

export default function ProfilePage() {
  const { user, token } = useAuth();
  const { updateWorkspaceCount } = useWorkspacesUpdate();
  const [accordionData, setAccordionData] = useState(null);
  const { darkMode } = useTheme();
  const theme = getThemeStyles(darkMode);

  const getUserWorkspaces = useCallback(async () => {
    const data = await getWorkspaces(
      { owner: user.email, forProfile: true },
      token,
    );

    if (data.valid) {
      setAccordionData(data.data);
    } else {
      showToastMessage(data.message, data.info);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, token, updateWorkspaceCount]);

  useEffect(() => {
    getUserWorkspaces();
  }, [getUserWorkspaces]);

  return (
    <div className={`w-full min-h-[calc(100vh-40px)] p-4 md:p-6 ${theme.page}`}>
      <div className="max-w-6xl mx-auto flex flex-col gap-6">
        <div
          className={`w-full p-6 rounded-2xl flex flex-col md:flex-row items-center gap-6 ${theme.card}`}
        >
          <div className="w-[100px] h-[100px] md:w-[120px] md:h-[120px] rounded-full overflow-hidden border-4 border-purple-500/30">
            <img
              src={user.profile}
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h1 className="text-lg md:text-xl font-semibold">
              {user.fullname}
            </h1>
            <p className={`text-sm ${theme.mutedText}`}>{user.email}</p>
          </div>
        </div>

        <div className={`w-full p-6 rounded-2xl ${theme.card}`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Your Workspaces</h2>
            <span className={`text-xs ${theme.mutedText}`}>
              {accordionData?.length || 0} total
            </span>
          </div>

          {accordionData?.length === 0 ? (
            <div className="py-10 text-center">
              <p className={`text-sm ${theme.mutedText}`}>
                You don’t own any workspaces yet.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {accordionData?.map((accordion, index) => (
                <ProfileAccordion
                  key={index}
                  workspaceName={accordion.name}
                  workspaceMembers={accordion.members}
                  workspaceID={accordion.ID}
                  workspacePassword={accordion.password}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
