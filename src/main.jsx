import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Global styles (Tailwind)
import './index.css'
// Root app component
import App from './App.jsx'

// Mount React into the root DOM node
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
