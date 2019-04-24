import React from 'react'
import { NavLink ,Link} from 'react-router-dom'
import { Row, Col,Divider,Icon } from 'antd';
// import slide from 'react-burger-menu'
// import { slide as Menu } from 'react-burger-menu'



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
            token_status: "",
            menuOpen: false,

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
        window.location.reload();
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

    openMenu() {
        this.setState({ menuOpen: true })
      }
    
      closeMenu() {
        this.setState({ menuOpen: false })
      }
    

    render() {
        let headerClass = this.state.checkFeed? "index":"not-index";
        return (
            <div className={`header ${headerClass}`}>
             <Row>
                {/* <Col span={6}> */}
                    <span className="web-logo">Internship Program</span>
                {/* </Col> */}
                {/* <Col span={14} offset={4}> */}
                    <div className="nav"> 
                    <NavLink className="nav-menu announcement" to='/'>Announcement</NavLink>
                        <Divider className="divider" type="vertical" />
                        <NavLink className="nav-menu review" to='/Review'>Review</NavLink>
                        <Divider className="divider" type="vertical" />
                        <NavLink className="nav-menu faq" to='/FAQ'>FAQs</NavLink>
                        {
                            this.state.token_status === "student"? 
                            <span>
                                <Divider className="divider" type="vertical" />
                                <NavLink className="nav-menu student" to='/schedule'>My Assignment</NavLink>
                            </span> : this.state.token_status === "admin"? 
                            <span>
                                <Divider className="divider" type="vertical" />
                                <NavLink className="nav-menu admin" to='/admin'>Admin</NavLink>
                            </span> : <span></span>   
                        }
                        
                       {
                           this.state.token_username === ""? 
                           <NavLink className="login-btn" to='/Login'>Log in</NavLink>:
                           <span className="username"><span className="username">{this.state.token_firstname}</span> <span className="login-btn" onClick={this.logout}>log out</span></span>

                       } 
                       
                    </div> 
                    <div className="nav-small"> 
                        <NavLink className="nav-menu announcement" to='/'><Icon className="nav-small-icon" type="notification" /></NavLink>
                        <Divider className="divider" type="vertical" />
                        <NavLink className="nav-menu review" to='/Review'><Icon className="nav-small-icon" type="solution" /></NavLink>
                        <Divider className="divider" type="vertical" />
                        <NavLink className="nav-menu faq" to='/FAQ'><Icon  className="nav-small-icon"type="question" /></NavLink>
                        <Divider className="divider" type="vertical" />
                        {
                            this.state.token_status === "student"? 
                            <span>
                                <NavLink className="nav-menu student" to='/schedule'><Icon className="nav-small-icon" type="folder" /></NavLink>
                            </span> : this.state.token_status === "admin"? 
                            <span>
                                <NavLink className="nav-menu admin" to='/admin'><Icon className="nav-small-icon" type="setting" /></NavLink>
                            </span> : <span></span>   
                        }
                        {
                            this.state.token_username === ""? 
                            <NavLink className="" to='/Login'><Icon className="nav-small-icon" type="login" /></NavLink>:
                            <span className="" onClick={this.logout}><Icon className="nav-small-icon" type="logout" /></span>

                        } 
                    </div> 
                {/* </Col>  */}
       
             </Row>

             {/* <Menu right>
                     <Link to="/" className="menu-item">Announcement</Link> 
                     <Link to="/review" className="menu-item">Review</Link> 
                     <Link to="/FAQ" className="menu-item">FAQs</Link> 
                     <Link to="/review" className="menu-item">Review</Link> 
                    {
                    this.state.token_status === "student"? 
                     <Link to="/schedule" className="menu-item">My Assignment</Link> :
                    this.state.token_status === "admin"?
                     <Link to="/admin" className="menu-item">Schedule</Link> :
                    ""
                    }
                    {
                    this.state.token_username === ""? 
                     <Link to="/Login" className="menu-item">Log in</Link> :
                     <span onClick={ () => {this.closeMenu(); this.logout()}}>Log out</span> 
                    }
            </Menu> */}

        
          
            </div>  
        )
    }
}

export default Navigation