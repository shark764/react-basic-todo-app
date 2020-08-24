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
          <Link to="/articles" className="nav-link">
            Articles
          </Link>
        </li>
        <li>
          <Link to="/todos" className="nav-link">
            Todos
          </Link>
        </li>
        <li>
          <Link to="/form" className="nav-link">
            Form Generator
          </Link>
        </li>
        <li>
          <Link to="/ref" className="nav-link">
            Ref Usage
          </Link>
        </li>
        <li>
          <Link to="/about" className="nav-link">
            About
          </Link>
        </li>
        <li>
          <Link to="/todo-list" className="nav-link">
            Todo List Example
          </Link>
        </li>
      </ul>
    </nav>
    <hr />
  </>
);

export default Menu;
