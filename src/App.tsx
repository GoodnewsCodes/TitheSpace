"use client"

import type React from "react"

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider, useAuth } from "./contexts/AuthContext"
import { ToastProvider } from "./components/ui/toast"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Dashboard from "./components/Dashboard"
import ForgotPassword from "./components/ForgotPassword"
import ChurchSetup from "./components/ChurchSetup"
import LoadingScreen from "./components/LoadingScreen"
import { ThemeProvider } from "@/components/theme-provider"

// Protected route component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { currentUser, loading } = useAuth()

  if (loading) {
    return <LoadingScreen />
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

function AppRoutes() {
  const { currentUser } = useAuth()

  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/login" element={currentUser ? <Navigate to="/dashboard" replace /> : <Login />} />
          <Route path="/signup" element={currentUser ? <Navigate to="/dashboard" replace /> : <Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/setup"
            element={
              <ProtectedRoute>
                <ChurchSetup />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        <ToastProvider />
        <AppRoutes />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App


