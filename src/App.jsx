import React from "react"
import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import Header from "./components/Headers"
import Login from "./components/Login"
import Home from "./components/Home"
import BookNewTrip from "./components/BookNewTrip"
import MyTrips from "./components/MyTrips"
import NotFound from "./components/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"
import "./App.css"

function App(){
  const isAuth = !!localStorage.getItem("jwt_token")
  const { pathname } = useLocation()

  return (
    <>
      {/* Show Header only on authenticated pages */}
      {isAuth && pathname !== "/login" && <Header />}

      <Routes>
        <Route
          path="/login"
          element={isAuth ? <Navigate to="/" replace /> : <Login />}
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/book-a-new-trip"
          element={
            <ProtectedRoute>
              <BookNewTrip />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-trips"
          element={
            <ProtectedRoute>
              <MyTrips />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
export default App
