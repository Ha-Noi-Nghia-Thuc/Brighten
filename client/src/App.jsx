import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/auth/RegisterPage";
import LoginPage from "./pages/auth/LoginPage";
import Sidebar from "./components/Sidebar";
import NotificationPage from "./pages/NotificationPage";
import ProfilePage from "./pages/ProfilePage";
import NavBar from "./components/NavBar";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

function App() {
  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/auth/me")
        const data = await res.json()

        if (data.error) {
          return null
        }

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong")
        }

        console.log(`authUser is here: ${data}`)
        return data;
      } catch (error) {
        throw new Error(error)
      }
    },
    retry: false
  })

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <h1>Loading...</h1>
      </div>
    )
  }


  return (
    <div className="flex max-w-6xl mx-auto">
      {authUser && <Sidebar />}
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/register" element={!authUser ? <RegisterPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/notification" element={authUser ? <NotificationPage /> : <Navigate to="/login" />} />
        <Route path="/profile/:username" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>
      {authUser && <NavBar />}
      <Toaster />
    </div>
  )
}

export default App
