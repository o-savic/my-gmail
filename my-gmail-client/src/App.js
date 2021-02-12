import './App.css';
import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "./store/index";
import jwtDecode from "jwt-decode";
import { Redirect } from 'react-router';
import { setAuthorizationToken, setUser } from "./store/actions/auth";

import LoginPage from "./components/user/LoginPage";
import RegistrationPage from "./components/user/RegistrationPage"
import InboxPage from './components/email/InboxPage';

const store = configureStore();
if (localStorage.jwtToken) {
  const decodedToken = jwtDecode(localStorage.jwtToken);
  const now = new Date();
  if (Date.parse(now) / 1000 >= decodedToken.exp) {
    try {
      setAuthorizationToken(false);
      store.dispatch(setUser({}));
    } catch (err) {
      console.log(err);
    }
  } else {
    try {
      setAuthorizationToken(localStorage.jwtToken);
      store.dispatch(setUser(decodedToken));
    } catch (err) {
      store.dispatch(setUser({}));
    }
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router className="App">
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegistrationPage} />
          <Route exact path="/inbox" render={() => (
            localStorage.getItem("jwtToken") == null ? (
              <Redirect to="/login" />
            ) : (
                <InboxPage />
              )
          )} />
          <Route exact path="/inbox" render={() => (
            localStorage.getItem("jwtToken") == null ? (
              <Redirect to="/login" />
            ) : (
                <InboxPage />
              )
          )} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
