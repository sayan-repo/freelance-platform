import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Correctly imported here
import App from './App.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import './styles/main.css';
import { WalletProvider } from './contexts/WalletContext.jsx'; // Import new provider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <WalletProvider> {/* Wrap AuthProvider */}
          <App />
        </WalletProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);