import React from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import './App.css';


import AuthPage from './components/pages/AuthPage';
import EventsPage from './components/pages/EventsPage';
import BookingsPage from './components/pages/BookingsPage';
import MainNavigation from './components/navigation/MainNavigation';

import './App.css'

function App() {
  return (
    <BrowserRouter>
    <>
    <MainNavigation/>
    <main className="main-content">
      <Switch>
        <Redirect path="/" to="/auth" exact />
        <Route path="/auth" component={AuthPage} />
        <Route path="/events" component={EventsPage} />
      <Route path="/bookings" component={BookingsPage} />
      </Switch>
    </main>
    </>
    </BrowserRouter>
  );
}

export default App;
