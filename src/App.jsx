import { BrowserRouter, Route, Routes } from "react-router-dom"
import { GoogleOAuthProvider } from '@react-oauth/google';
import  MainLoader  from "./utils/loaders/MainLoader"
import AuthPage from "./pages/AuthPage"
import { Toaster } from 'react-hot-toast';
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import AuthenticatedValidate from "./utils/validation/AuthenticatedValidate";
import PublicOutlet from "./utils/validation/PublicOutlet";
import MainLayout from "./utils/layouts/MainLayout";
import WorkSpaceLayout from "./components/workspace/WorkSpaceLayout";
import WorkspaceValidator from "./components/workspace/WorkspaceValidator";
import ProfilePage from "./pages/ProfilePage";


function App() {
  const Client_id = import.meta.env.VITE_GOOGLE_CLIENT_ID
  const workspace = import.meta.env.VITE_WORKSPACES
  return (
    <GoogleOAuthProvider clientId={`${Client_id}`}>
      <BrowserRouter>
        <MainLoader/>
        <Toaster />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route element = {<PublicOutlet/>}>
          <Route path="/auth" element={<AuthPage />} />
          </Route>
          <Route element = {<AuthenticatedValidate/>}>
            <Route element = {<MainLayout/>}>
            <Route path="/dashboard" element={<HomePage />} />
            <Route path = {`/${workspace}`} element = {<WorkSpaceLayout/>}>
              <Route path={`:id`} element = {<WorkspaceValidator/>}/>
            </Route>
            <Route path="/profile" element = {<ProfilePage/>}/>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App
