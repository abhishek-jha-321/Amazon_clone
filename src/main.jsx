import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import { CartProvider } from './context/CartContext'
import { UIProvider } from './context/UIContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
      <UIProvider>
        <App />
      </UIProvider>
    </CartProvider>
  </React.StrictMode>,
)

