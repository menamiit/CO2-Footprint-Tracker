import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register'
import Dashboard from './pages/Analyze';
import Home from './pages/Home'
import ProtectedRoute from './components/ProtectedRoute';
import { ProfilePage } from "./pages/UserProfile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path='/login' element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path='/Profile' element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
    </Routes>
  );
}

export default App;