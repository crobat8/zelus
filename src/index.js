import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { ChatContextProvider } from './context/ChatContext';
import { UserContextProvider } from './context/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <ChatContextProvider>
      <UserContextProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </UserContextProvider>
    </ChatContextProvider>
  </AuthContextProvider>
);

