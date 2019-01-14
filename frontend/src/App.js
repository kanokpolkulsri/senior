import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import './css/App.css';

import Feed from './components/Feed'
import Register from './components/Register'
import Report from './components/Report'
import Review from './components/Review'
import Error from './components/Error'

import Navigation from './components/Navigation'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navigation />
          <Switch>
            <Route path='/' component={Feed} exact />
            <Route path='/Register' component={Register} />
            <Route path='/Report' component={Report} />
            <Route path='/Review' component={Review} />
            <Route component={Error} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
