import React from 'react'
import ReactDOM from 'react-dom/client'
import WelcomeScreen from './components/WelcomeScreen'
import './styles/main.css'

// Add console log for debugging
console.log('VEXO Initializing...');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WelcomeScreen />
  </React.StrictMode>
)