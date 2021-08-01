import React, {useState} from 'react'
import avatar from "../images/avatar.png";
import "../css/login.css";
import axios from "axios";
import {BrowserRouter as Router,Route, Redirect} from 'react-router-dom';
const Login = ({baseUrl, setlogin}) => {
    const [formData, setFormData] = useState({username: '', password: ''});
    const [loggedin, setLoggedin] = useState(false);
    const [loginerror, setLoginError] = useState("");
    
    const authorize = () =>
    {
        axios.post(baseUrl+'/login', formData).then(
            response => {
                var rsp = response.data;
                if(rsp.status === "success")
                {
                    localStorage.setItem("loggedin", true);
                    localStorage.setItem("loggedid", rsp.data.id);
                    localStorage.setItem("loggedType", rsp.data.role);
                    localStorage.setItem("logfname", rsp.data.forename);
                    localStorage.setItem("loglname", rsp.data.surname);
                    localStorage.setItem("webtoken", rsp.data.access_token);

                    // console.log(rsp.data.token);
                    console.log(rsp);
                    setLoggedin(true);
                    setlogin(true);
                    setLoginError("");
                }
                else
                {
                    setLoginError("Username or password incorrect");
                }
            }
        ).catch(function(error){
            if(error.response.status === 422)
            {
                setLoginError("Username or password incorrect");
            }
        });
        console.log(loginerror);
    }

    const handle = (e) => {
        const newData = {...formData};
        newData[e.target.id] = e.target.value;
        setFormData(newData);
    }

    return (
        <div className="log-wrapper d-flex justify-content-center align-items-center align-self-strech">
            <div className="login-container">
                <div className="avatar">
                    <img src={avatar} />
                </div>
                <div className="login-form">
                    <input type="text" className="form-control" placeholder="username" id="username" onChange={handle}/>
                    <input type="password" className="form-control" placeholder="Password" id="password" onChange={handle}/>
                    <div className="d-grid">
                        <button className="btn btn-primary" onClick={authorize}>
                            <i className="mdi mdi-login"></i> Login
                        </button>
                    </div>
                    {
                        loginerror !== "" ? <small className="text-danger logerror">{loginerror}</small> : ''
                    }
                </div>
            </div>
        </div>
    )
}

export default Login
