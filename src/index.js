import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { AuthProvider } from "./firebase/AuthContext";
import { BrowserRouter as Router } from 'react-router-dom';


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <App/>
      </AuthProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
