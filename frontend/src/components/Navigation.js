import React from 'react'
import { NavLink } from 'react-router-dom'
import { Row, Col } from 'antd';


import '../css/Navigation.css';
import "antd/dist/antd.css";

class Navigation extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            classPath: "eiei"
        }
    }

    checkPath = () => {
        if(window.location.pathname === "/")
            console.log("/ woei")
        else
            console.log("/... woei")
    }

    componentDidMount = () => {
        this.checkPath()
    }
    componentDidUpdate = () => {
        this.checkPath()
    }

    render() {
        return (
            <div className="header not-index">
             <Row>
                <Col span={6}>
                    <span className="web-logo">Internship Program  </span>
                    {/* {location} */}
                </Col>
                <Col span={12} offset={5}>
                    <div className="nav"> 
                        <NavLink className="nav-menu" to='/'>Annoucement</NavLink>
                        <NavLink className="nav-menu" to='/Review'>Review</NavLink>
                        <NavLink className="nav-menu" to='/FAQ'>FAQs</NavLink>
                        <NavLink className="nav-menu" to='/Report'>My Assignment</NavLink>
                        <NavLink className="login-btn" to='/Login'>Log in</NavLink>
                    </div> 
                </Col> 
       
             </Row>
          
            </div>  
    )
    }
}

export default Navigation