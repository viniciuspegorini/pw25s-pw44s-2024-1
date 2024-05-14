import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
import './index.scss'
import { UserSignupPage } from './pages/UserSignupPage/index.tsx'
import { LoginPage } from './pages/LoginPage/index.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    
    <UserSignupPage />

    <LoginPage />

  </React.StrictMode>,
)
