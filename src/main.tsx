import './index.scss'
import React from 'react'
import ReactDOM from 'react-dom/client'
import './firebase/config'

import App from './App'
import { AuthProvaider } from './contexts/AuthContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvaider>
      <App />
    </AuthProvaider>
    
  </React.StrictMode>,
)
