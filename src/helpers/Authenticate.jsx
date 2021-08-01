import React from 'react'
import Users from "../components/Users";
import AddUser from "../components/AddUser";
import Students from "../components/Students";
import Teachers from "../components/Teachers";
import Classes from "../components/Classes";
import Class from "../components/Class";
import Messages from "../components/Messages";
const Authenticate = ({userType, route}) => {

    const access = [
        [],
        //Admin
        ['classes', 'users', 'teachers', 'subjects', 'messages', 'class', ],
        ['subjects', 'results', 'teachers', 'profile', 'messages', 'classes']
        ['subjects', 'results', 'teachers', 'profile', 'messages']
    ];

    const components = [{
        classes: <Classes />,
        users : <Users />
    }];
    
}

export default Authenticate
