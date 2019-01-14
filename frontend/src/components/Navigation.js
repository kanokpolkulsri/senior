import React from 'react'
import { NavLink } from 'react-router-dom'

const Navigation = () => {
    return (
        <div>
            <NavLink to='/'>Feed</NavLink>
            <NavLink to='/Register'>Register</NavLink>
            <NavLink to='/Report'>Report</NavLink>
            <NavLink to='/Review'>Review</NavLink>
        </div>
    )
}

export default Navigation