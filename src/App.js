import React from 'react';
import {BrowserRouter, Route, Redirect} from 'react-router-dom'
import './App.css';

import AuthPage from './components/pages/AuthPage';
import EventsPage from './components/pages/EventsPage';
import BookingsPage from './components/pages/BookingsPage';

function App() {
  return (
    <BrowserRouter>
    <Redirect path="/" to="/auth" exact />
    <Route path="/auth" component={AuthPage} />
    <Route path="/events" component={EventsPage} />
    <Route path="/bookings" component={BookingsPage} />
    </BrowserRouter>
  );
}

export default App;
