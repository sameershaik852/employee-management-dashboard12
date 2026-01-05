import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Routes>
      <Route
        path="/"
        element={
          loggedIn ? (
            <Navigate to="/dashboard" />
          ) : (
            <Login onLogin={() => setLoggedIn(true)} />
          )
        }
      />
      <Route
        path="/dashboard"
        element={
          loggedIn ? (
            <Dashboard onLogout={() => setLoggedIn(false)} />
          ) : (
            <Navigate to="/" />
          )
        }
      />
    </Routes>
  );
}
