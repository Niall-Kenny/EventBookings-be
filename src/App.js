import React, {Component} from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import './App.css';


import AuthPage from './components/pages/AuthPage';
import EventsPage from './components/pages/EventsPage';
import BookingsPage from './components/pages/BookingsPage';
import MainNavigation from './components/navigation/MainNavigation';
import AuthContext from './context/auth-context'

import './App.css'

class App extends Component {
  state = {
    token:null,
    userId: null
  } 

  login = (token, userId, tokenExpiration) => {
    this.setState({token, userId})
  }

  logout = () => {
    this.setState({token:null, userId:null})
  }

  render () {
    const {token, userId} = this.state
    return (
      <BrowserRouter>
      <>
      <AuthContext.Provider 
        value={{
          token, 
          userId, 
          login: this.login, 
          logout: this.logout
        }}
       >
      <MainNavigation/>
      <main className="main-content">
        <Switch>
          {!token && <Redirect path="/" to="/auth" exact /> }
          {token && <Redirect path="/" to="/events" exact /> }
          {token && <Redirect path="/auth" to="/events" exact /> }
          {!token && <Route path="/auth" component={AuthPage} />}
          <Route path="/events" component={EventsPage} />
          {token &&<Route path="/bookings" component={BookingsPage} />}
        </Switch>
      </main>
      </AuthContext.Provider>
      </>
      </BrowserRouter>
    );
  }
}

export default App;
