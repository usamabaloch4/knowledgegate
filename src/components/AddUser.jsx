import React, {useState, useEffect} from 'react'
import { useHistory } from "react-router-dom";
import axios from 'axios';
const AddUser = ({baseUrl}) => {

    const history = useHistory();

    const [formData, setFormData] = useState({
        username: "",
        forename: "",
        surname: "",
        email: "",
        dob: "",
        role: "",
        classid: ""
    });
    const [formErrors, setFormErrors] = useState({});

    var pageupdate = 1;

    const postForm = (e) => {
        e.preventDefault();

        // const form = document.getElementById("userform");

        // var user = new FormData(form);
        axios.post(baseUrl+"/user/create", formData)
            .then(response => {
                var rdata = response.data;
                if(rdata.status == 'error')
                {
                    var newErrors = {...formErrors};
                    newErrors = rdata.errors;
                    setFormErrors(newErrors);

                    console.log(formErrors);
                }
                else if(rdata.status == 'success')
                {
                    history.push("/users");
                }
        });


    }

    const handle = (e) => {
        const newData = {...formData};

        newData[e.target.id] = e.target.value;

        setFormData(newData);
    }




    return (
        <>
        <div className="page-title">
        <h4 className="">Add User</h4>
        <small>
            <i className="mdi mdi-home"></i> Home <i className="mdi mdi-menu-right"></i>
            <i className="mdi mdi-account-group"></i> Users <i className="mdi mdi-menu-right"></i> Add User
             </small>
        </div>
        <div className="card">
            <div className="card-body">
                <form action="" id="userform" onSubmit={postForm}>
                    <div className={`mb-3 row  ${formErrors.username === undefined ? '' : 'frm-error'}`}>
                        <label className="col-sm-12 col-form-label">User Name</label>
                        <div className="col-sm-12">
                            <input type="text" id="username" onChange={(e) => handle(e)} className="form-control"/>
                            <small>{formErrors.username}</small>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <div className={`col-sm-6 ${formErrors.email === undefined ? '' : 'frm-error'}`}>
                            <label>Email</label>
                            <input type="text" id="email" className="form-control" onChange={(e) => handle(e)} />
                            <small>{formErrors.email}</small>
                        </div>
                        <div className={`col-sm-6 ${formErrors.password === undefined ? '' : 'frm-error'}`}>
                            <label>Password</label>
                            <input type="password" id="password" className="form-control" onChange={(e) => handle(e)} />
                            <small>{formErrors.password}</small>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <div className={`col-sm-6 ${formErrors.forename === undefined ? '' : 'frm-error'}`}>
                            <label>First Name</label>
                            <input type="text" id="forename" className="form-control" onChange={(e) => handle(e)} />
                            <small>{formErrors.forename}</small>
                        </div>
                        <div className={`col-sm-6 ${formErrors.surname === undefined ? '' : 'frm-error'}`}>
                            <label>Last Name</label>
                            <input type="text" id="surname" className="form-control" onChange={(e) => handle(e)} />
                            <small>{formErrors.surname}</small>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <div className={`col-sm-6 ${formErrors.role === undefined ? '' : 'frm-error'}`}>
                            <label>Role</label>
                            <select name="" id="role" className="form-control" onChange={(e) => handle(e)}>
                                <option value="">------- Please Choose -------</option>
                                <option value="1">Admin</option>
                                <option value="2">Teacher</option>
                                <option value="3">Student</option>
                            </select>  
                            <small>{formErrors.role}</small>  
                        </div>
                        <div className={`col-sm-6 ${formErrors.dob === undefined ? '' : 'frm-error'}`}>
                            <label>Date of Birth</label>
                            <input type="date" id="dob" className="form-control" onChange={(e) => handle(e)} />
                            <small>{formErrors.dob}</small>
                        </div>
                    </div>
                    <div className="col-sm-12 d-grid">
                        <label> &nbsp; </label>
                        <button className="btn btn-primary btn-block">Add User</button>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}

export default AddUser
