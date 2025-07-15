import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Header from './Components/header.jsx'
import ReadingContent from './Components/ReadingContent.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <ReadingContent />
  </StrictMode>,
)
