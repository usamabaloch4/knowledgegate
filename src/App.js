import './App.css';
import TopBar from "./theme/TopBar";
import SideBar from "./theme/SideBar";
import Users from "./components/Users";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";
import EditProfile from "./components/EditProfile";
import Students from "./components/Students";
import Teachers from "./components/Teachers";
import Classes from "./components/Classes";
import MyClasses from "./components/MyClasses";
import Class from "./components/Class";
import Messages from "./components/Messages";
import MySubjects from "./components/MySubjects";
import MySubject from "./components/MySubject";
import StudentSubject from "./components/StudentSubject";
import Subjects from "./components/Subjects";
import Login from "./components/Login";
import DashBoard from './components/DashBoard'
import Tests from './components/Tests'
import Test from './components/Test'
import EditTest from './components/EditTest'
import UploadResult from './components/UploadResult'
import CreateTest from './components/CreateTest'

import {useState, useEffect} from "react";
import axios from "axios";

import {BrowserRouter as Router, Redirect, Route, Switch, useHistory} from "react-router-dom";
import StudentSubjects from './components/StudentSubjects';
import StudentTests from './components/StudentTests';

function App() {
  const history = useHistory();

  const loggedType = parseInt(localStorage.getItem("loggedType"));
  const loggedId = parseInt(localStorage.getItem("loggedid"));
  const [isLoggedin, setLoggedIn] = useState((localStorage.getItem("loggedin") === 'true'));
  const logfname = localStorage.getItem("logfname");
  const loglname = localStorage.getItem("loglname");
  const [unreadCount, setUnreadCount] = useState(0);
  console.log(isLoggedin);

  const baseUrl = "http://localhost/schoolsys";
  var intrval = '';
  if(isLoggedin)
  {
    intrval = setInterval(() => {
      axios.get(baseUrl+'/message/getunreadcount/'+loggedId).then( response => {
        setUnreadCount(response.data);
        console.log(response.data);
      }
      );
    }, 20000);
  }

  useEffect(() => {
    axios.get(baseUrl+'/message/getunreadcount/'+loggedId).then( response => {
      setUnreadCount(response.data);
      console.log(response.data);
    }
    );
}, []);


  const logOut = (history) => {
    axios.get(baseUrl+'/site/logout').then( response => {
      localStorage.setItem("loggedin", false);
      localStorage.setItem("loddedid", "");
      localStorage.setItem("webtoken", "");
      setLoggedIn(false);
      clearInterval(intrval)
      history.push("/");
    });

    return false;
  }

  if(!isLoggedin)
  return (
    <Login baseUrl={baseUrl} setlogin={setLoggedIn}/>
  );

  return (
    <Router>
    <div className="app">
      <TopBar logout={logOut} fname={logfname} logout={logOut}/>
      <div className="container">
        <div className="wrapper d-flex">
          <SideBar userType={loggedType} fname={logfname} lname={loglname} unread={unreadCount}/>
          <div className="content flex-grow-1">
            <Switch>
              <Route 
                  path="/" 
                  exact  
                  render={(props) => <DashBoard userType={loggedType} baseUrl={baseUrl}/>}
              />
              <Route path="/editprofile" render={props => <EditProfile {...props} baseUrl={baseUrl} userid={loggedId}/>} />
              <Route path="/dashboard" render={props => <DashBoard baseUrl={baseUrl} />}/>
              <Route path="/adduser" render={props => <AddUser userType={loggedType} baseUrl={baseUrl} />}/>
              <Route path="/users/edit/:id" render={props => <EditUser userType={loggedType} baseUrl={baseUrl} {...props} />}/>
              <Route path="/users" render={props => <Users userType={loggedType} baseUrl={baseUrl} />}/>
              <Route path="/classes" render={props => <Classes  baseUrl={baseUrl} {...props}/>} />
              <Route path="/class/:id" render={(props) => <Class {...props} baseUrl={baseUrl}/>} />
              <Route path="/students" render={props => <Students {...props} baseUrl={baseUrl} />} />
              <Route path="/teachers" render={props => <Teachers {...props} baseUrl={baseUrl}/>} />
              <Route 
                  path="/subjects" 
                  render={props => { 
                    return(loggedType == 1 ? 
                    <Subjects {...props} baseUrl={baseUrl}/>
                     : 
                    loggedType == 2 ? 
                    <MySubjects {...props} baseUrl={baseUrl} uid={loggedId} /> : <StudentSubjects  {...props} baseUrl={baseUrl} uid={loggedId} />)}} />
              
              <Route 
                  path="/subject/:id" 
                  render={props => {
                    return(loggedType == 2 ? <MySubject {...props} baseUrl={baseUrl} uid={loggedId}/> : 
                      <StudentSubject {...props} baseUrl={baseUrl} uid={loggedId}/> )}} />
              <Route path="/test/edit/:id" render={props => <EditTest {...props} baseUrl={baseUrl} uid={loggedId}/>} />
              <Route path="/test/uploadresult/:id" render={props => <UploadResult {...props} baseUrl={baseUrl} uid={loggedId}/>} />
              <Route path="/test/:id" render={props => <Test {...props} baseUrl={baseUrl} uid={loggedId}/>} />
              <Route path="/tests/create" render={props => <CreateTest {...props} baseUrl={baseUrl} uid={loggedId}/>} />
              
              <Route path="/tests" render={props => {
                    return(
                        loggedType === 2 ? <Tests {...props} baseUrl={baseUrl} uid={loggedId}/>
                        :
                        loggedType === 3 ? <StudentTests {...props} baseUrl={baseUrl} uid={loggedId} /> : <Redirect to="/dashboard" />
                        )}} />
              
              
              <Route path="/messages" render={props => <Messages {...props} baseUrl={baseUrl} loggedId={loggedId} loggedType={loggedType}/>} />
            </Switch>
          </div>
        </div>
      </div>
    </div>
    </Router>
  );
}

export default App;
