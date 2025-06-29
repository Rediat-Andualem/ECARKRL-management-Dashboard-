import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App'; 
import createStore from 'react-auth-kit/createStore'
import AuthProvider from 'react-auth-kit';
const store = createStore({
  authName: 'token',
  authType: 'localStorage',
  cookieDomain: window.location.hostname,
  cookieSecure: false,
});

ReactDOM.render(
  <AuthProvider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>,
  document.getElementById('root')
);
