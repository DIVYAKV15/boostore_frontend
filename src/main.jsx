import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ContextShare from './context/ContextShare.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ContextShare>
        <GoogleOAuthProvider clientId='518329189710-bulrq0avhu08qvbaklo30go7sr1p5gof.apps.googleusercontent.com'>
          <App />
        </GoogleOAuthProvider>

      </ContextShare>
    </BrowserRouter>
  </StrictMode>,
)
