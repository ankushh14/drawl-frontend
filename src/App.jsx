import { BrowserRouter, Route, Routes } from "react-router-dom"
import { GoogleOAuthProvider } from '@react-oauth/google';
// import { MainLoader } from "./utils/loaders/MainLoader"
import AuthPage from "./pages/AuthPage"

function App() {
  return (
    // <GoogleOAuthProvider clientId={import.meta.env.CLIENT_ID}>
    <BrowserRouter>
      {/* <MainLoader/> */}
      <Routes>
        {/* <Route path="/" element={<LandingPage />} /> */}
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
    // </GoogleOAuthProvider>
  )
}

export default App
