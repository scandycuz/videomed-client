import "regenerator-runtime/runtime.js";

import 'assets/styles/normalize.css';
import 'assets/styles/global.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { logout } from 'actions/session';
import axios from 'axios';
import store from 'store';
import theme from 'theme';
import App from './containers/App';

axios.interceptors.response.use(response => {
   return response;
}, error => {
  if (error.response.status === 401) {
    window.sessionStorage.removeItem('token');
    store.dispatch(logout());
  }

  return Promise.reject(error);
});

ReactDOM.render(
  <Provider store={store}>
      <ThemeProvider theme={theme}>
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </Provider>,
  document.getElementById('app'),
);
