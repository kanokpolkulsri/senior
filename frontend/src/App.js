import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import './css/App.css';

import Feed from './components/Feed'
import Register from './components/Register'
import Report from './components/Report'
import Review from './components/Review'
import ReviewCompany from './components/ReviewCompany'
import FAQ from './components/Faq'
import Admin from './components/Admin'
import Error from './components/Error'

import Navigation from './components/Navigation'


class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div className="">

          <Navigation></Navigation>
          <Switch>
            <Route path='/' component={Feed} exact />

            <Route path='/login' component={Register} />
            <Route path='/signup' component={Register} />
            <Route path='/schedule' component={Report} />
            <Route path='/assignment/:filter' component={Report} />
            <Route path='/assignment' component={Report} />
            <Route path='/review/:company' component={ReviewCompany}/>
            <Route path='/review' component={Review} />
            <Route path='/faq' component={FAQ} />
            <Route path='/admin/:cate/:topic' component={Admin} />
            <Route path='/admin/:cate/:topic/:idProcess' component={Admin} />
            <Route path='/admin/:cate' component={Admin} />
            <Route path='/admin' component={Admin} />
       
            <Route component={Error} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
