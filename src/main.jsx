import React from 'react'
import ReactDOM from 'react-dom/client'
import WelcomeScreen from './components/WelcomeScreen'
import './index.css'

console.log('VEXO: Starting initialization...');

const root = ReactDOM.createRoot(document.getElementById('root'));
console.log('VEXO: Root element found:', document.getElementById('root'));

root.render(
  <React.StrictMode>
    <WelcomeScreen />
  </React.StrictMode>
);

console.log('VEXO: Render attempted');