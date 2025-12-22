import React from 'react';
import { NavLink } from 'react-router-dom';
import css from './Layout.module.css';

const Layout = ({ children }) => {

  const getNavLinkClass = (isActive) => {
    return isActive ? `${css['nav-link']} ${css.active}` : css['nav-link'];
  }

  return (
    <div className={css.layout}>
      <header className={css.header}>
        <nav className={css.nav}>
          <NavLink to="/" className={({ isActive }) => getNavLinkClass(isActive)}>
            Home Page
          </NavLink>
          <NavLink to="/cars" className={({ isActive }) => getNavLinkClass(isActive)}>
            Cars
          </NavLink>
          <NavLink to="/login" className={({ isActive }) => getNavLinkClass(isActive)}>
            Login
          </NavLink>
          <NavLink to="/register" className={({ isActive }) => getNavLinkClass(isActive)}>
            Register
          </NavLink>
        </nav>
      </header>

      <main className={css.main}>{children}</main>
    </div>
  );
}

export default Layout;
