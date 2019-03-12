import React from 'react'
import {  Route, Switch, Link } from 'react-router-dom'

import '../css/Register.css';


class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        login:"Log In",
        signup:"Sign Up",
        loginQ: "Don't have an account?",
        loginLink: "Create new account",
        signupQ: "Have an account?",
        signupLink: "Log in"
    }
  }
 
    render() {
        return (
            <div class="regis-container">
              <div class="login-block">
                <div class="green-block">
                  <div class="green-circle"><i class="material-icons">keyboard_arrow_right</i></div>
                  <p class="green-block-topic">{this.props.match.path === "/Login" ? this.state.login:this.state.signup}</p>
                  <div class="underlined"></div>
                 
                  <p>{this.props.match.path === "/Login" ? this.state.loginQ: this.state.signupQ} <br/>
                   <a>{this.props.match.path === "/Login" ? this.state.loginLink: this.state.signupLink}</a> 
                  </p>
                </div>
                  <Switch>
                      <Route path="/login" component={Login}/>
                      <Route path="/signup" component={Signup}/>
                  </Switch>
           
              </div>

                    <Link to="/signup">Sign Up</Link>
                    <Link to="/login">Log In</Link>

                    
            </div>
           
        )
    }
}

const Login = () => (
    <div class="white-block">
      <h2>Login</h2>
    </div>
  );
  
  const Signup = () => (
    <div class="white-block">
      <h2>Signup</h2>
    </div>
  );

export default Register