import React from 'react';
import { NavLink } from 'react-router-dom';
import css from './Layout.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthIsSignedIn, selectAuthUserData } from '../redux/auth/selectors.js';
import { apiLogout } from '../redux/auth/operations.js';

const navLinkClass = ({ isActive }) => 
  isActive ? `${css['nav-link']} ${css.active}` : css['nav-link'];

const Layout = ({ children }) => {
  const dispatch = useDispatch()
const isSignedIn = useSelector(selectAuthIsSignedIn)  
const userData = useSelector(selectAuthUserData)

const handleLogout = () => {
dispatch(apiLogout())
}

  return (
    <div className={css.layout}>
    <header className={css.header}>
      <nav className={css.nav}>
        {isSignedIn ? (
          <>
            <div className={css.navLinks}>
              <NavLink to="/" className={navLinkClass}>Home Page</NavLink>
              <NavLink to="/cars" className={navLinkClass}>Cars</NavLink>
              <NavLink to="/contacts" className={navLinkClass}>Contacts</NavLink>
            </div>
            <div className={css.userGreeting}>
              <p>Hello, {userData.name}</p>
              <button onClick={handleLogout} type='button'>Logout</button>
            </div>
          </>
        ) : (
          <div className={css.navLinks}>
            <NavLink to="/login" className={navLinkClass}>Login</NavLink>
            <NavLink to="/register" className={navLinkClass}>Register</NavLink>
          </div>
        )}
      </nav>
    </header>
    <main className={css.main}>{children}</main>
  </div>
  );
}

export default Layout;
