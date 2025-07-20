import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register'
import Dashboard from './pages/Dashboard';
import Home from './pages/Home'
import LeaderboardPage from './pages/Leaderboard';
import ProtectedRoute from './components/ProtectedRoute';
import { ProfilePage } from "./pages/UserProfile";
import FootGraph from './pages/Analytics';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='/login' element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path='/Profile' element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/leaderboard" element={<ProtectedRoute><LeaderboardPage /></ProtectedRoute>} />
        <Route path="/analytics" element={<ProtectedRoute><FootGraph /></ProtectedRoute>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;