import React from 'react'
import { NavLink } from 'react-router-dom'
import { Row, Col } from 'antd';


import '../css/Navigation.css';
import "antd/dist/antd.css";


const Navigation = () => {
    return (
            <div class="header not-index">
             <Row>
                <Col span={6}>
                    <span class="web-logo">Internship Program</span>
                </Col>
                <Col span={12} offset={5}>
                    <div class="nav"> 
                        <NavLink class="nav-menu" to='/'>Annoucement</NavLink>
                        <NavLink class="nav-menu" to='/Review'>Review</NavLink>
                        <NavLink class="nav-menu" to='/FAQ'>FAQs</NavLink>
                        <NavLink class="nav-menu" to='/Report'>My Assignment</NavLink>
                        <NavLink class="login-btn" to='/Login'>Log in</NavLink>
                    </div> 
                </Col> 
       
             </Row>
          
            </div>  
    )
}

export default Navigation