import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
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
import ErrorBoundary from "./components/error/ErrorBoundary";
import useTheme from "./hooks/useTheme";
import ForgotPasswordValidator from "./utils/validation/ForgotPasswordValidator";
import ForgotPassword from "./components/auth/ForgotPassword";
import MainLoader from "./utils/loaders/MainLoader";
import { getThemeStyles } from "./styles/theme";

function App() {
  const Client_id = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const workspace = import.meta.env.VITE_WORKSPACES;
  const { darkMode } = useTheme();
  const theme = getThemeStyles(darkMode);

  const { login, updateStatus, logout, status } = useAuth();

  const refreshAccessToken = useCallback(async () => {
    updateStatus(STATUS.PENDING);
    const data = await refreshToken();
    if (data && data.valid) {
      return login(data);
    } else {
      return logout();
    }
  }, [updateStatus, login, logout]);

  useEffect(() => {
    refreshAccessToken();
    setInterval(
      () => {
        refreshAccessToken();
      },
      //ACCESS TOKEN LIFE
    );
  }, [refreshAccessToken]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<LandingPage />} />
        <Route element={<PublicOutlet />} errorElement={<ErrorBoundary />}>
          <Route path="/auth" element={<AuthPage />} />
          <Route element={<ForgotPasswordValidator />}>
            <Route path="/auth/forgotPassword" element={<ForgotPassword />} />
          </Route>
        </Route>
        <Route
          element={<AuthenticatedValidate />}
          errorElement={<ErrorBoundary />}
        >
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<HomePage />} />
            <Route path={`/${workspace}`} element={<WorkSpaceLayout />}>
              <Route path={`:id`} element={<WorkspaceValidator />} />
              <Route index element={<Navigate to={`/404`} replace />} />
            </Route>
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Route>
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </>,
    ),
  );

  return (
    <GoogleOAuthProvider clientId={`${Client_id}`}>
      <Toaster />
      <main
        className={`relative w-full min-h-screen h-full overflow-hidden transition-colors duration-500 ${theme.page}`}
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-[-20%] left-[-10%] w-[400px] h-[400px] bg-purple-500/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] bg-indigo-500/10 blur-[120px] rounded-full" />
        </div>

        <div className="relative z-10">
          <RouterProvider router={router} />
        </div>

        {status === STATUS.PENDING && <MainLoader />}
      </main>
    </GoogleOAuthProvider>
  );
}

export default App;
