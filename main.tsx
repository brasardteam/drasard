import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App'
import './index.css'

const root = document.getElementById('root')!

if (root.hasChildNodes()) {
  hydrateRoot(
    root,
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
} else {
  createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
}
