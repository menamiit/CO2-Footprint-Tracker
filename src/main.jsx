import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Login from './Components/Login.jsx'
import App from './App.jsx'
import ActivityLogger from './Components/ActivityLogger.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<App />} />
        <Route path='/Analyze' element={<ActivityLogger />} />
      </Routes>
    </BrowserRouter >
  </StrictMode>
)
