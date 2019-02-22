import React from 'react'
import {  Route, Switch, Link } from 'react-router-dom'

class Register extends React.Component {
    render() {
        return (
            <div>
                    <Link to="/signup">Sign Up</Link>
                    <Link to="/login">Log In</Link>

                    <Switch>
                        <Route path="/login" component={Login}/>
                        <Route path="/signup" component={Signup}/>
                    </Switch>
            </div>
           
        )
    }
}

const Login = () => (
    <div>
      <h2>Login</h2>
    </div>
  );
  
  const Signup = () => (
    <div>
      <h2>Signup</h2>
    </div>
  );

export default Register