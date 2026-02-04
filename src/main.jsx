import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'  // ✅ This must exist and match the actual filename
import ScrollToHash from './components/ScrollHash.jsx'
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ScrollToHash />
    <App />
  </BrowserRouter>
)
