import React from 'react'
import { NavLink } from 'react-router-dom'

const Layout = ({children}) => {
  return (
  <div>
      <header>
    <nav>
      <NavLink to="/">Home Page</NavLink>
      <NavLink to="/cars">Cars</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/register">Register</NavLink>
    </nav>
    </header>
    <main>{children}</main>
  </div>
  )
}

export default Layout