import React from 'react'
import avatar from "../images/avatar.png";
import {Link} from 'react-router-dom';

const SideBar = ({userType, fname, lname, unread}) => {
    return (
        <div className="sidebar">
            
            <div className="user-info">
              <img src={avatar} />
              <h4>{fname} {lname}</h4>
              <hr/>
            </div>

            <div className="navigation">
              {getNav(userType, unread)}
            </div>

          </div>
    )
}

export default SideBar


const getNav = (userType, unread) => {
    if(userType === 1)
    return (
        <ul>
                <Link to="/dashboard">
                <li>
                    
                        <i className="mdi mdi-desktop-mac-dashboard"></i>
                        Dashboard
                </li>
                </Link>
            <Link to="/users">
            <li>
                    <i className="mdi mdi-account-group"></i>
                    Users
            </li>
            </Link>
            <Link to="/students">
            <li>
                    <i className="mdi mdi-account-tie-outline"></i>
                    Students
            </li>
            </Link>
            <Link to="/teachers">
            <li>
                    <i className="mdi mdi-account-tie-voice"></i>
                    Teachers
            </li>
            </Link>
            <Link to="/classes">
            <li>
                
                    <i className="mdi mdi-bank-check"></i>
                    Classes
            </li>
            </Link>
            <Link to="/subjects">
            <li>
                    <i className="mdi mdi-book-open-page-variant"></i>
                    Subjects
            </li>
            </Link>

        </ul>
    )
    else if(userType === 2)
        return (
            <ul>
                <Link to="/dashboard">
                <li>
                    
                        <i className="mdi mdi-desktop-mac-dashboard"></i>
                        Dashboard
                </li>
                </Link>
                <Link to="/subjects">
                <li>
                        <i className="mdi mdi-book-open-page-variant"></i>
                        My Subjects
                </li>
                </Link>
                <Link to="/tests">
                <li>
                        <i className="mdi mdi-clipboard-edit"></i>
                        My Tests
                </li>
                </Link>
                <Link to="/messages">
                <li>
                        <i className="mdi mdi-chat"></i>
                        Messages &nbsp;&nbsp;
                        <span className="badge rounded-pill bg-primary ">{unread}</span>
                </li>
                </Link>
            </ul>
        )
    else
        return (
            <ul>
                <Link to="/dashboard">
                <li>
                    
                        <i className="mdi mdi-desktop-mac-dashboard"></i>
                        Dashboard
                </li>
                </Link>
                <Link to="/subjects">
                <li>
                        <i className="mdi mdi-book-open-page-variant"></i>
                        Subjects
                </li>
                </Link>
                <Link to="/tests">
                <li>
                        <i className="mdi mdi-clipboard-edit"></i>
                        My Tests
                </li>
                </Link>
                <Link to="/messages">
                <li>
                        <i className="mdi mdi-chat"></i>
                        Messages &nbsp;&nbsp;
                        <span className="badge rounded-pill bg-primary ">{unread}</span>
                </li>
                </Link>
            </ul>
        )
    ;
}