import React from 'react';
import { NavLink } from 'react-router-dom';

import './styles.scss'

const NavBar: React.FC = () => {
  return (
    <div className="navBar">
         <NavLink  to="/" className="navTitle">
           <span>Home</span>
         </NavLink>
         <NavLink  to="/about" className="navTitle">
           <span>About</span>
         </NavLink>
    </div>
    );
}

export default NavBar;