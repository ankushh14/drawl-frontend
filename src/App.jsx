import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import MainLoader from "./utils/loaders/MainLoader";
import AuthPage from "./pages/AuthPage";
import { Toaster } from "react-hot-toast";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import AuthenticatedValidate from "./utils/validation/AuthenticatedValidate";
import PublicOutlet from "./utils/validation/PublicOutlet";
import MainLayout from "./utils/layouts/MainLayout";
import WorkSpaceLayout from "./components/workspace/WorkSpaceLayout";
import WorkspaceValidator from "./components/workspace/WorkspaceValidator";
import ProfilePage from "./pages/ProfilePage";
import { useAuth } from "./hooks/useAuth";
import { useCallback, useEffect } from "react";
import { refreshToken } from "./api/auth";
import STATUS from "./utils/status";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const Client_id = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const workspace = import.meta.env.VITE_WORKSPACES;

  const { login, updateStatus, logout } = useAuth();

  const refreshAccessToken = useCallback(async () => {
    updateStatus(STATUS.PENDING);
    const data = await refreshToken();
    if (data.valid) {
      return login(data);
    } else {
      return logout();
    }
  }, [updateStatus, login, logout]);

  useEffect(() => {
    refreshAccessToken();
  }, [refreshAccessToken]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<LandingPage />} />
        <Route element={<PublicOutlet />}>
          <Route path="/auth" element={<AuthPage />} />
        </Route>
        <Route element={<AuthenticatedValidate />}>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<HomePage />} />
            <Route path={`/${workspace}`} element={<WorkSpaceLayout />}>
              <Route path={`:id`} element={<WorkspaceValidator />} />
            </Route>
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Route>
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </>
    )
  );

  return (
    <GoogleOAuthProvider clientId={`${Client_id}`}>
      <MainLoader />
      <Toaster />
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  );
}

export default App;
