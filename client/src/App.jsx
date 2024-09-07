import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/auth/RegisterPage";
import LoginPage from "./pages/auth/LoginPage";
import Sidebar from "./components/Sidebar";
import NotificationPage from "./pages/NotificationPage";
import NavBar from "./components/NavBar";

function App() {

  return (
    <div className="flex max-w-6xl mx-auto">
      <Sidebar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/notification" element={<NotificationPage />} />
      </Routes>
      <NavBar />
    </div>
  )
}

export default App
