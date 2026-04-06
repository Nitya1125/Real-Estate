import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {GoogleOAuthProvider} from '@react-oauth/google'

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId = "872873640503-udo11033r9u2rgtoabej6o3l6kimfhjf.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>,
)
