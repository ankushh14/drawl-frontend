import { BrowserRouter, Route, Routes } from "react-router-dom"
import { GoogleOAuthProvider } from '@react-oauth/google';
// import { MainLoader } from "./utils/loaders/MainLoader"
import AuthPage from "./pages/AuthPage"
import { Toaster } from 'react-hot-toast';
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import AuthenticatedValidate from "./utils/validation/AuthenticatedValidate";
import PublicOutlet from "./utils/validation/PublicOutlet";
import MainLayout from "./utils/layouts/MainLayout";
import { ThemeProvider } from "./context/ThemeContext";


function App() {
  const Client_id = import.meta.env.VITE_GOOGLE_CLIENT_ID
  return (
    <GoogleOAuthProvider clientId={`${Client_id}`}>
      <ThemeProvider>
      <BrowserRouter>
        {/* <MainLoader/> */}
        <Toaster />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route element = {<PublicOutlet/>}>
          <Route path="/auth" element={<AuthPage />} />
          </Route>
          <Route element = {<AuthenticatedValidate/>}>
            <Route element = {<MainLayout/>}>
            <Route path="/home" element={<HomePage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      </ThemeProvider>
    </GoogleOAuthProvider>
  )
}

export default App
