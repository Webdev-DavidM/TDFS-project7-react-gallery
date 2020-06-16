import React from 'react';
import { NavLink } from 'react-router-dom';
import '../index.css';
const Nav = () => {
  return (
    <nav className="main-nav">
      <ul>
        <li>
          <NavLink to="/beach">Beach</NavLink>
        </li>
        <li>
          <NavLink to="/park">Park</NavLink>
        </li>
        <li>
          <NavLink to="/city">City</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
