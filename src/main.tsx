import './global.css'
import 'virtual:fonts.css'

import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import App from './components/App'
import Home from './components/Home'
import Game from './components/Game'
import SignUp from './components/SignUp'

createRoot(document.getElementById('root') as Element).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />} path="/" />
        <Route element={<Home />} path="/home" />
        <Route element={<Game />} path="/game" />
        <Route element={<SignUp />} path="/signup" />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
