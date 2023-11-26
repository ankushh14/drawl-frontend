import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AuthPage } from "./pages/AuthPage"
import { LandingPage } from "./pages/LandingPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
