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
import StudentAssignment from './components/StudentAssignment'

import Form_1 from './components/form/Form_1'
import Form_2 from './components/form/Form_2'
// import Form_3 from './components/form/Form_3'
import Form_4 from './components/form/Form_4'
import Form_5 from './components/form/Form_5'
import Form_6 from './components/form/Form_6'
import Form_7 from './components/form/Form_7'
import Form_8 from './components/form/Form_8'
import Form_11 from './components/form/Form_11'
import Form_Review from './components/form/Form_Review'

class App extends Component {

 
  render() {
    return (
      <BrowserRouter>
        <div className="">

          <Navigation></Navigation>
          <Switch>
            <Route path='/' component={Feed} exact />

            <Route path='/error' component={Error} />
            
            <Route path='/login' component={Register} />
            <Route path='/signup' component={Register} />
            <Route path='/schedule' component={Report} />
            <Route path='/assignment/:filter' component={Report} />
            <Route path='/assignment' component={Report} />
            <Route path='/review/:company' component={ReviewCompany}/>
            <Route path='/review' component={Review} />
            <Route path='/faq' component={FAQ} />


            
            <Route path='/admin/:cate/:topic/:year/:idProcess/:idStudent' component={Admin} />
            <Route path='/admin/:cate/:topic/:year/:idProcess' component={Admin} />
            <Route path='/admin/:cate/:topic/:year' component={Admin} />
            <Route path='/admin/:cate/:topic' component={Admin} />
            <Route path='/admin/:cate' component={Admin} />
            <Route path='/admin' component={Admin} />

            <Route exact path='/form1' component={Form_1} />
            <Route exact path='/form2' component={Form_2} />
            {/* <Route exact path='/form_3' component={Form_3} /> */}
            <Route exact path='/form4' component={Form_4} />
            <Route exact path='/form5' component={Form_5} />
            <Route exact path='/form6' component={Form_6} />
            <Route exact path='/form7' component={Form_7} />
            <Route exact path='/form8' component={Form_8} />
            <Route exact path='/form11' component={Form_11} />
            <Route exact path='/writeReview' component={Form_Review} />


            <Route path='/:idAssignment' component={StudentAssignment}/>

            <Route component={Error} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
