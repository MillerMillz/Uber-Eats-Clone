import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "antd/dist/antd.css"
import { BrowserRouter } from 'react-router-dom';
import AuthContextProvider from './Contexts/AuthContext';
import Authenticator from './Components/Authenticator';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <Authenticator/>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);


