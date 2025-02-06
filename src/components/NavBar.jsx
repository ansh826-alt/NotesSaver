import React from 'react'
import { NavLink } from 'react-router-dom'
import './NavBar.css'
import "./styles.css"



const NavBar = () => {
  return (
    <div className='navbar'>
      <NavLink to={'/'}>
        Home
      </NavLink>
      <NavLink to={'/pastes'}>
        Paste
      </NavLink>
    </div>
  )
}

export default NavBar
