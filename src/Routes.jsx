import React from 'react'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Users from "./components/Users";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";
import Students from "./components/Students";
import Teachers from "./components/Teachers";
import Classes from "./components/Classes";
import MyClasses from "./components/MyClasses";
import Class from "./components/Class";
import Messages from "./components/Messages";
import MySubjects from "./components/MySubjects";
import Subjects from "./components/Subjects";

const Routes = (props) => {
  const baseUrl = "http://localhost/schoolsys";

    return (
        <>
            <Route path="/" exact  render={props => <Users userType={props.loggedType} baseUrl={baseUrl}/>}/>
              <Route path="/adduser" render={props => <AddUser userType={props.loggedType} baseUrl={baseUrl} />}/>
       
        </>
    )
}

export default Routes
