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
import StarredPage from './components/email/StarredPage';
import AllPage from './components/email/AllPage';
import SnoozedPage from './components/email/SnoozedPage';
import TrashPage from './components/email/TrashPage';
import SpamPage from './components/email/SpamPage';
import SentPage from './components/email/SentPage';
import ProfilePage from './components/user/ProfilePage';
import SuccessfullyUpdatedPage from "./components/user/SuccessfullyUpdatedPage"
import SendEmailPage from './components/email/SendEmailPage';
import DraftPage from './components/email/DraftPage';


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
          <Route exact path="/profile" render={() => (
            localStorage.getItem("jwtToken") == null ? (
              <Redirect to="/login" />
            ) : (
                <ProfilePage />
              )
          )} />
          <Route exact path="/success" render={() => (
            localStorage.getItem("jwtToken") == null ? (
              <Redirect to="/login" />
            ) : (
                <SuccessfullyUpdatedPage />
              )
          )} />

          <Route exact path="/compose" render={() => (
            localStorage.getItem("jwtToken") == null ? (
              <Redirect to="/login" />
            ) : (
                <SendEmailPage />
              )
          )} />
          <Route exact path="/all" render={() => (
            localStorage.getItem("jwtToken") == null ? (
              <Redirect to="/login" />
            ) : (
                <AllPage />
              )
          )} />
          <Route exact path="/inbox" render={() => (
            localStorage.getItem("jwtToken") == null ? (
              <Redirect to="/login" />
            ) : (
                <InboxPage />
              )
          )} />
          <Route exact path="/starred" render={() => (
            localStorage.getItem("jwtToken") == null ? (
              <Redirect to="/login" />
            ) : (
                <StarredPage />
              )
          )} />
          <Route exact path="/snoozed" render={() => (
            localStorage.getItem("jwtToken") == null ? (
              <Redirect to="/login" />
            ) : (
                <SnoozedPage />
              )
          )} />
          <Route exact path="/spam" render={() => (
            localStorage.getItem("jwtToken") == null ? (
              <Redirect to="/login" />
            ) : (
                <SpamPage />
              )
          )} />
          <Route exact path="/sent" render={() => (
            localStorage.getItem("jwtToken") == null ? (
              <Redirect to="/login" />
            ) : (
                <SentPage />
              )
          )} />
          <Route exact path="/trash" render={() => (
            localStorage.getItem("jwtToken") == null ? (
              <Redirect to="/login" />
            ) : (
                <TrashPage />
              )
          )} />
          <Route exact path="/drafts" render={() => (
            localStorage.getItem("jwtToken") == null ? (
              <Redirect to="/login" />
            ) : (
                <DraftPage />
              )
          )} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
