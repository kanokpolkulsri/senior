import React from 'react'
import {  Route, Switch, Link } from 'react-router-dom'
import {
  Form, Icon, Input, Button, Col, Row
} from 'antd';

import '../css/Register.css';

const API_REGISTER = require('../api/Register')

class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        login:"Log In",
        signup:"Sign Up",
        loginQ: "Don't have an account?",
        loginLink: "Create new account",
        signupQ: "Have an account?",
        signupLink: "Log in",
        form: this.props.form
    }
  }

    render() {
        return (
            <div className="regis-container">
              <div className="login-block">
                <div className="green-block">
                  <div className="green-circle"><i className="material-icons">keyboard_arrow_right</i></div>
                  <p className="green-block-topic">{this.props.match.path === "/login" ? this.state.login:this.state.signup}</p>
                  <div className="underlined"></div>
                 
                  <p>{this.props.match.path === "/login" ? this.state.loginQ: this.state.signupQ} <br/>
                  <Link to={this.props.match.path === "/login" ? "/signup" : "/login"}>{this.props.match.path === "/login" ? this.state.loginLink: this.state.signupLink}</Link> 
                  </p>
                </div>
                  <Switch>
                      <Route path="/login" component={Login}/>
                      <Route path="/signup" component={Signup}/>
                  </Switch>
              </div>
            </div>
        )
    }
}

class LogInForm extends React.Component {  

  POST_LOGIN = (values) => {
    API_REGISTER.POST_LOGIN(values)
    .then(response => {
      if(response.code === 1){
        console.log(response)
        // request successfully

        // response.data

        /*
        data = {
          username: "5810504361",
          firstname: "kanokpol",
          lastname: "kulsri"
        }
        */
      }
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of SignIn form: ', values);
        this.POST_LOGIN(values)
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return(
    <div className="white-block login">
        <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </Form.Item>
        <Form.Item>
          <a className="login-form-forgot" href="">Forgot password</a>
          <Button type="primary" htmlType="submit" className="login-form-button" block>
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div> );
  }
}

const Login = Form.create({ name: 'normal_login' })(LogInForm);

  
class SignUpForm extends React.Component {  
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  validateEmailKu = (rule, value, callback) => {
    const form = this.props.form
    if(value){
      var mail = value.split('@')
      var firstname = form.getFieldValue('firstname').toLowerCase()
      var lastname = form.getFieldValue('lastname')[0].toLowerCase()
      var name = firstname+"."+lastname
      if((!mail[0].includes(name)) || (mail[1] !== "ku.th" && mail[1] !== "ku.ac.th"))
        callback('your email is not Kasetsart email!')
    }
    callback()

  }

  validateStudentID = (rule, value, callback) => {
    if(value){
      if(value.length === 10){
        try{
          var tmp = parseInt(value)
          console.log("tmp" ,tmp);
          
          if(!tmp)
            callback("input only number!")
        }catch(err){
          callback("input only number!")
        }
      }
      else{
        callback("your student ID should be 10 digit!")
      }
    }
    callback()
 
    
  }
  signupBackNext = (e) => {
    console.log(e.currentTarget);
    const form = this.props.form;

    if(e.currentTarget.id === "next-btn"){
      this.props.form.validateFields(['firstname','lastname','username'], { force: true }, (errors, values)  => {
        if(!errors){
          document.getElementsByClassName("first-page")[0].classList.toggle("hidden");
          document.getElementsByClassName("second-page")[0].classList.toggle("hidden");
        }
      });
    } 
    else{
      document.getElementsByClassName("first-page")[0].classList.toggle("hidden");
      document.getElementsByClassName("second-page")[0].classList.toggle("hidden");
    }
      
    
    
  }

  POST_ADD = (values) => {
    delete values["confirm"]
    values["year"] = parseInt(values["username"][0] + values["username"][1])
    API_REGISTER.POST_ADD(values)
    .then(response => {
      if(response.code === 1){
        console.log(response)
        // request successfully
        /*
        data = {
          username: "5810504361"
        }
        */
      }
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of SignUp form: ', values);
        this.POST_ADD(values) 
      }
    });
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 0 },
      wrapperCol: { span: 24 },
    };
    // const tailFormItemLayout = {
    //   labelCol: { span: 0 },
    //   wrapperCol: { span: 24,offset: 8 },
    // };
    return (
      <div className="white-block signup">
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <div className="first-page"> 
        <Form.Item  {...formItemLayout} >
            {getFieldDecorator('firstname', {
              rules: [{ required: true, message: 'Please input your First name!' }],
            })(
              <Input placeholder="First Name" />
            )}
        </Form.Item>
        <Form.Item  {...formItemLayout} >
            {getFieldDecorator('lastname', {
              rules: [{ required: true, message: 'Please input your Last name!' }],
            })(
              <Input placeholder="Last Name" />
            )}
        </Form.Item>
        <Form.Item  {...formItemLayout} >
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your Student ID!' },
              ,{
                validator: this.validateStudentID,
              }],
            })(
              <Input placeholder="Student ID" />
            )}
        </Form.Item>
        <Button id="next-btn" onClick={this.signupBackNext} className="signup-next-button login-form-button">
          Next <i className="material-icons">arrow_right_alt</i>
        </Button>
    
      </div>
    <div className="second-page hidden">
    <Form.Item {...formItemLayout} >
      {getFieldDecorator('email', {
        rules: [{
          type: 'email', message: 'The input is not valid E-mail!',
        }, {
          required: true, message: 'Please input your E-mail!',
        },{
          validator: this.validateEmailKu,
        }],
      })(
        <Input placeholder="E-mail"/>
      )}
    </Form.Item>
    <Form.Item {...formItemLayout}
      
    >
      {getFieldDecorator('password', {
        rules: [{
          required: true, message: 'Please input your password!',
        }, {
          validator: this.validateToNextPassword,
        }],
      })(
        <Input type="password" placeholder="Password" />
      )}
    </Form.Item>
    <Form.Item {...formItemLayout}
    >
      {getFieldDecorator('confirm', {
        rules: [{
          required: true, message: 'Please confirm your password!',
        }, {
          validator: this.compareToFirstPassword,
        }],
      })(
        <Input type="password" placeholder="Confirm Password" onBlur={this.handleConfirmBlur} />
      )}
    </Form.Item>
    <Row>
      <Col span={10}>
      <Button id="back-btn" className="login-form-button" onClick={this.signupBackNext}><i className="material-icons arrow-left">
      arrow_right_alt</i>Back</Button>
      </Col>
      <Col span={13} offset={1}>
      <Form.Item  span={16} className="form-button">
          <Button type="primary" htmlType="submit" className="regis-form-button" block>Sign Up</Button>
      </Form.Item>
    </Col>
    </Row>
    
    </div>
    </Form>        
        </div>
    )
  }
}

const Signup = Form.create({ name: 'normal_signup' })(SignUpForm);
export default Register