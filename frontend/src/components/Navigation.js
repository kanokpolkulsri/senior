import React from 'react'
import { NavLink } from 'react-router-dom'
import { Row, Col,Divider } from 'antd';

import '../css/Navigation.css';
import "antd/dist/antd.css";

const API_TOKEN = require('../api/Token')

class Navigation extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            checkFeed: true,
            token_username: "",
            token_firstname: "",
            token_lastname: "",
            token_status: ""
        }
    }

    checkPath = (prevState) => {
        if(window.location.pathname === "/"){
            if(prevState == null || !prevState.checkFeed){
                this.POST_CHECK_TOKEN()
                this.setState({checkFeed: true})
            }
        }else{
            if(prevState == null || prevState.checkFeed){
                this.POST_CHECK_TOKEN()
                this.setState({checkFeed: false})
            }
        }
    }

    POST_CHECK_TOKEN = () => {
        let token = {'token': window.localStorage.getItem('token_senior_project')}
        API_TOKEN.POST_CHECK_TOKEN(token)
        .then(response => {
            let username = response.token_username
            let firstname = response.token_firstname
            let lastname = response.token_lastname
            let status = response.token_status
            this.setState({token_username: username, token_firstname: firstname, token_lastname: lastname, token_status: status})
        })   
    }

    logout = () => {
        this.REMOVE_TOKEN_LOCAL_STORAGE()
        // console.log(this.props.location);
        // this.props.history.push('/')
    }

    REMOVE_TOKEN_LOCAL_STORAGE = () => {
        window.localStorage.removeItem('token_senior_project')
        this.setState({token_username: "", token_firstname: "", token_lastname: "", token_status: ""})
    }

    componentDidMount = () => {
        this.POST_CHECK_TOKEN()
        this.checkPath(null)
    }

    componentDidUpdate = (prevProps,prevState) => {
        this.checkPath(prevState)
    }

    render() {
        let headerClass = this.state.checkFeed? "index":"not-index";
        return (
            <div className={"header "+ `${headerClass}`}>
             <Row>
                <Col span={6}>
                    <span className="web-logo">Internship Program  </span>
                </Col>
                <Col span={14} offset={4}>
                    <div className="nav"> 
                {
                    console.log("token_status",this.state.token_status)
                    
                }
                        <NavLink className="nav-menu" to='/'>Announcement</NavLink>
                        <Divider className="divider" type="vertical" />
                        <NavLink className="nav-menu" to='/Review'>Review</NavLink>
                        <Divider className="divider" type="vertical" />
                        <NavLink className="nav-menu" to='/FAQ'>FAQs</NavLink>
                        {
                            this.state.token_status === "student"? 
                            <span>
                                <Divider className="divider" type="vertical" />
                                <NavLink className="nav-menu" to='/schedule'>My Assignment</NavLink>
                            </span> : this.state.token_status === "admin"? 
                            <span>
                                <Divider className="divider" type="vertical" />
                                <NavLink className="nav-menu" to='/admin'>Admin</NavLink>
                            </span> : <span></span>
                            
                        }

                        
                       {
                           this.state.token_username === ""? 
                           <NavLink className="login-btn" to='/Login'>Log in</NavLink>:
                           <span className="username">{this.state.token_firstname} <span className="login-btn" onClick={this.logout}>log out</span></span>

                       } 
                    </div> 
                </Col> 
       
             </Row>
          
            </div>  
        )
    }
}

export default Navigation