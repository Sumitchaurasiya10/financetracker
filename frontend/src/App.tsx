import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "././components/Navbar";
import Login from "././pages/Login";
import Register from "././pages/Register";
import Dashboard from "././pages/Dashboard";
import AddTransaction from "././pages/AddTransaction";
import EditTransaction from "././pages/EditTransaction";
import Transactions from "././pages/Transactions";
import { AuthProvider, useAuth } from "./context/AuthContext";
import React from "react";

function PrivateRoute({ children }: { children: React.ReactElement }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/transactions" element={<PrivateRoute><Transactions /></PrivateRoute>} />
          <Route path="/add" element={<PrivateRoute><AddTransaction /></PrivateRoute>} />
          <Route path="/:id/edit" element={<PrivateRoute><EditTransaction /></PrivateRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
