import React from 'react';
import { NavLink } from 'react-router-dom';
import css from './Layout.module.css';
import { useSelector } from 'react-redux';
import { selectAuthIsSignedIn } from '../redux/auth/selectors.js';

const navLinkClass = ({ isActive }) => 
  isActive ? `${css['nav-link']} ${css.active}` : css['nav-link'];

const Layout = ({ children }) => {

const isSignedIn = useSelector(selectAuthIsSignedIn)  

  return (
    <div className={css.layout}>
      <header className={css.header}>
        <nav className={css.nav}>
          {isSignedIn ? (
            <>
               <NavLink to="/" className={navLinkClass}>Home Page</NavLink>
              <NavLink to="/cars" className={navLinkClass}>Cars</NavLink>
              <NavLink to="/contacts" className={navLinkClass}>Contacts </NavLink>
            </>
          ) : (
            <>
            <NavLink to="/login" className={navLinkClass}>Login</NavLink>
            <NavLink to="/register" className={navLinkClass}> Register</NavLink>
             
            </>
          )}
        </nav>
      </header>
      <main className={css.main}>{children}</main>
    </div>
  );
}

export default Layout;
