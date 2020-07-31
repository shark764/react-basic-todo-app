import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => (
  <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <ul className="navbar-nav mr-auto">
        <li>
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/list" className="nav-link">
            Todos
          </Link>
        </li>
        <li>
          <Link to="/new" className="nav-link">
            New Task
          </Link>
        </li>
        <li>
          <Link to="/about" className="nav-link">
            About
          </Link>
        </li>
      </ul>
    </nav>
    <hr />
  </>
);

export default Menu;
