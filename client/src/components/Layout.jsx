import React from 'react';
import { NavLink } from 'react-router-dom';
import css from './Layout.module.css';

const navLinkClass = ({ isActive }) => 
  isActive ? `${css['nav-link']} ${css.active}` : css['nav-link'];
console.log(navLinkClass);

const Layout = ({ children }) => {
  return (
    <div className={css.layout}>
      <header className={css.header}>
        <nav className={css.nav}>
          <NavLink to="/" className={navLinkClass}>Home Page</NavLink>
          <NavLink to="/cars" className={navLinkClass}>Cars</NavLink>
          <NavLink to="/login" className={navLinkClass}>Login</NavLink>
          <NavLink to="/register" className={navLinkClass}>Register</NavLink>
        </nav>
      </header>
      <main className={css.main}>{children}</main>
    </div>
  );
}

export default Layout;
