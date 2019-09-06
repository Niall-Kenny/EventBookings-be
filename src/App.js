import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom'

import './App.css';
import Auth from './components/pages/Auth';

function App() {
  return (
    <BrowserRouter>
    <Route path="/" component={Auth} />
    </BrowserRouter>
  );
}

export default App;
