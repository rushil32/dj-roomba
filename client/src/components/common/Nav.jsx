import React from 'react';
import { Link } from 'react-router-dom';

import logo from "../../assets/logo-dark.svg";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <a className="navbar-brand" href="#">
        <img src={logo} alt="DJ Roomba" />
      </a>
      <div className="">
        <div className="navbar-nav">
          <Link className="nav-item nav-link active" to="/">
            <i className="material-icons">home</i>
          </Link>
          <Link className="nav-item nav-link" to="/">
            <i className="material-icons">exit_to_app</i>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
