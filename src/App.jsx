import { BrowserRouter, Route, Routes } from "react-router-dom"
import { GoogleOAuthProvider } from '@react-oauth/google';
// import { MainLoader } from "./utils/loaders/MainLoader"
import AuthPage from "./pages/AuthPage"
import { Toaster } from 'react-hot-toast';
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";


function App() {
  const Client_id = import.meta.env.VITE_GOOGLE_CLIENT_ID
  return (
    <GoogleOAuthProvider clientId={`${Client_id}`}>
      <BrowserRouter>
        {/* <MainLoader/> */}
        <Toaster />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route>
            <Route path="/home" element={<HomePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App
