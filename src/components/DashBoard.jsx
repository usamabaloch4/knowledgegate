import React from 'react'
import '../css/dashboard.css';
import StudentDB from "./StudentDB";
import TeacherDB from "./TeacherDB";
import AdminDB from "./AdminDB";

const DashBoard = ({baseUrl}) => {
    const loggedType = parseInt(localStorage.getItem("loggedType"));
    const uid = parseInt(localStorage.getItem("loggedid"));
    const logfname = localStorage.getItem("logfname");
    const loglname = localStorage.getItem("loglname");
    const roles = ['', 'Admin', 'Teacher', 'Student']
    return (
        <>
        <div className="page-title">
            <h4 className="">Dashboard </h4>
            <small>
                <i className="mdi mdi-home"></i> Home <i className="mdi mdi-menu-right"></i>
                <i className="mdi mdi-monitor-dashboard"></i> Dashboard
            </small>

        </div>

        <hr/>
        <div className="text-center">
            <br/>   
            <h1 className="welcome">Welcome {roles[loggedType]}!</h1>
            <p>This is your personal space to manage and see available data.</p>
            <br/>
        </div>
        {
            loggedType === 1 ? <AdminDB uid={uid} baseUrl={baseUrl} /> : loggedType === 2 ? <TeacherDB uid={uid} baseUrl={baseUrl} /> : <StudentDB uid={uid} baseUrl={baseUrl} />
        }
       

        </>
    )
}

export default DashBoard
