import React from 'react'
import { NavLink } from 'react-router-dom'
import { Row, Col,Divider } from 'antd';


import '../css/Navigation.css';
import "antd/dist/antd.css";

class Navigation extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            checkFeed: true,
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
                <Col span={13} offset={5}>
                    <div className="nav"> 
                        <NavLink className="nav-menu" to='/'>Annoucement</NavLink>
                        <Divider className="divider" type="vertical" />
                        <NavLink className="nav-menu" to='/Review'>Review</NavLink>
                        <Divider className="divider" type="vertical" />
                        <NavLink className="nav-menu" to='/FAQ'>FAQs</NavLink>
                        <Divider className="divider" type="vertical" />
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