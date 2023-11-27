import { BrowserRouter, Route, Routes } from "react-router-dom"
import { GoogleOAuthProvider } from '@react-oauth/google';
// import { MainLoader } from "./utils/loaders/MainLoader"
import AuthPage from "./pages/AuthPage"

function App() {
  const Client_id = import.meta.env.VITE_GOOGLE_CLIENT_ID
  return (
    <GoogleOAuthProvider clientId={`${Client_id}`}>
    <BrowserRouter>
      {/* <MainLoader/> */}
      <Routes>
        {/* <Route path="/" element={<LandingPage />} /> */}
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App
