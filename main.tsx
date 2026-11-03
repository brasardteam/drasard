import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App'
import './index.css'

const root = document.getElementById('root')!
const documentLanguage = document.documentElement.lang.toLowerCase()
const initialLang = documentLanguage === 'lv' ? 'LV' : documentLanguage === 'ru' ? 'RU' : 'EN'
const application = (
  <React.StrictMode>
    <App initialLang={initialLang} />
  </React.StrictMode>
)

if (initialLang === 'EN' && root.hasChildNodes()) {
  hydrateRoot(root, application)
} else {
  createRoot(root).render(application)
}
