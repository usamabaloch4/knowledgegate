import React from 'react'
import logo from '../images/logo.png';
import avatar from "../images/avatar.png";
import {Link, useHistory} from 'react-router-dom';

import axios from 'axios';

const TopBar = ({baseUrl, fname, logout}) => {
  const history = useHistory();

    return (
        <div className="top-bar">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container">
            <a className="navbar-brand" href="#">
              <img src={logo} alt="KnowledgeGate" />
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="navbar-right">
              <ul className="ms-auto d-flex align-items-center list-unstyled mb-0">
                <li className="nav-item dropdown">
                    <a className="nav-link user-options dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown">
                      <img src={avatar} /> {fname} <span className="caret"></span>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
                      <li><Link className="dropdown-item" to="/editprofile"><i className="mdi mdi-account-edit"></i> Edit Profile</Link></li>
                      <li><a className="dropdown-item" href="#" onClick={() => logout(history)}><i className="mdi mdi-logout"></i> Logout</a></li>
                    </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    )
}

export default TopBar
