import React, { useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Header/Header'
import Display from '../Display/Display';
import SignIn from '../AuthForm/SignIn';
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useAuth } from '../.././firebase/AuthContext';


function App() {

  const { currentUser, signUpAsGuest } = useAuth();

  return (
    <>
      <Router>
        <Header/>
        <Display/>
      </Router>
    </>
  );
}

export default App;
