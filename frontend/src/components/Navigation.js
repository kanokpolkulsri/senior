import React from 'react'
import { NavLink } from 'react-router-dom'

import '../css/Navigation.css';

const Navigation = () => {
    return (
            <div class="header row not-index">
                <div class="col-3">
                    <span class="web-logo">Internship Program</span>
                </div> 
                <div class="nav col-6 offset-2"> 
                    <NavLink class="nav-menu" to='/'>Annoucement</NavLink>
                    <NavLink class="nav-menu" to='/Review'>Review</NavLink>
                    <NavLink class="nav-menu" to='/FAQ'>FAQs</NavLink>
                    <NavLink class="nav-menu" to='/Report'>My Assignment</NavLink>
                    <NavLink class="login-btn" to='/Register'>Log in</NavLink>

                </div> 
            </div>  
    )
}

export default Navigation