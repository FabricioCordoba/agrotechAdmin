import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import { UserProvider } from './context/UserContext.jsx';
import { ProductProvider } from './context/ProductContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <ProductProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>

      </ProductProvider>


    </UserProvider>

  </React.StrictMode>,
)
