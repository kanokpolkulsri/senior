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
            token_lastname: ""
        }
    }

    checkPath = (prevState) => {
        if(window.location.pathname === "/"){
            if(prevState == null || !prevState.checkFeed)
                this.setState({checkFeed: true});
        }    
        else{
            if(prevState == null || prevState.checkFeed)
                this.setState({checkFeed: false});
        }
    }

    POST_CHECK_TOKEN = () => {
        let token = {'token': window.localStorage.getItem('token')}
        API_TOKEN.POST_CHECK_TOKEN(token)
        .then(response => {
            let username = response.token_username
            let firstname = response.token_firstname
            let lastname = response.token_lastname
            this.setState({token_username: username, token_firstname: firstname, token_lastname: lastname})
            return (username !== "" && firstname !== "" && lastname !== "")
        })   
    }

    REMOVE_TOKEN_LOCAL_STORAGE = () => {
        window.localStorage.removeItem('token')
        this.setState({token_username: "", token_firstname: "", token_lastname: ""})
    }

    componentWillMount = () => {
        // to detect which button it should have
        let shouldHaveLoginButton = this.POST_CHECK_TOKEN()
    }

    componentDidMount = () => {
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
                <Col span={15} offset={3}>
                    <div className="nav"> 
                        <NavLink className="nav-menu" to='/'>Announcement</NavLink>
                        <Divider className="divider" type="vertical" />
                        <NavLink className="nav-menu" to='/Review'>Review</NavLink>
                        <Divider className="divider" type="vertical" />
                        <NavLink className="nav-menu" to='/FAQ'>FAQs</NavLink>
                        <Divider className="divider" type="vertical" />
                        <NavLink className="nav-menu" to='/schedule'>My Assignment</NavLink>
                        <Divider className="divider" type="vertical" />
                        <NavLink className="nav-menu" to='/admin'>Admin</NavLink>
                        <NavLink className="login-btn" to='/Login'>Log in</NavLink>
                    </div> 
                </Col> 
       
             </Row>
          
            </div>  
    )
    }
}

export default Navigation