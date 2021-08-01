import React, {useState, useEffect} from 'react'
import { useHistory } from "react-router-dom";
import axios from 'axios';
const EditProfile = ({baseUrl, userid}) => {

    const history = useHistory();
    const roles = ['', 'Admin', 'Teacher', 'Student'];


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
    const [classes, setClasses] = useState([]);
    var pageupdate = 1;

    useEffect(() => {
        axios.get(baseUrl+"/user/"+userid).then(response => {
            setFormData(response.data);
        });
    }, [pageupdate]);

    const postForm = (e) => {
        e.preventDefault();
        axios.post(baseUrl+"/user/update/"+userid, formData)
            .then(response => {
                var rdata = response.data;
                console.log(rdata);
                if(rdata.status == 'error')
                {
                    var newErrors = {...formErrors};
                    newErrors = rdata.errors;
                    setFormErrors(newErrors);

                    console.log(formErrors);
                }
                else if(rdata.status == 'success')
                {
                    history.push("/dashboard");
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
        <h4 className="">Edit {roles[formData.role]}</h4>
        <small>
            <i className="mdi mdi-home"></i> Home <i className="mdi mdi-menu-right"></i>
            <i className="mdi mdi-account-group"></i> {roles[formData.role]}s <i className="mdi mdi-menu-right"></i> Edit
             </small>
        </div>
        <div className="card">
            <div className="card-body">
                <form action="" id="userform" onSubmit={postForm}>
                    <div className={`mb-3 row  ${formErrors.username === undefined ? '' : 'frm-error'}`}>
                        <label className="col-sm-12 col-form-label">User Name</label>
                        <div className="col-sm-12">
                            <input type="text" id="username" readOnly onChange={(e) => handle(e)} className="form-control" value={formData.username}/>
                            <small>{formErrors.username}</small>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <div className={`col-sm-6 ${formErrors.email === undefined ? '' : 'frm-error'}`}>
                            <label>Email</label>
                            <input type="text" id="email" className="form-control" onChange={(e) => handle(e)} value={formData.email} />
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
                            <input type="text" id="forename" className="form-control" onChange={(e) => handle(e)} value={formData.forename} />
                            <small>{formErrors.forename}</small>
                        </div>
                        <div className={`col-sm-6 ${formErrors.surname === undefined ? '' : 'frm-error'}`}>
                            <label>Last Name</label>
                            <input type="text" id="surname" className="form-control" onChange={(e) => handle(e)} value={formData.surname} />
                            <small>{formErrors.surname}</small>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <div className={`col-sm-12 ${formErrors.dob === undefined ? '' : 'frm-error'}`}>
                            <label>Date of Birth</label>
                            <input type="date" id="dob" className="form-control" onChange={(e) => handle(e)} value={formData.dob} />
                            <small>{formErrors.dob}</small>
                        </div>
                    </div>
                    {formData.role == 3 ?
                    <div className="col-sm-12">
                            <label>Class</label>
                            <select name="" id="classid" className="form-control" onChange={(e) => handle(e)}>
                                {classes.map((row) => 
                                    <option value={row.id}  selected={row.id == formData.classid ? "selected" : ''}>{row.title}</option>
                                )}
                            </select>    
                        </div>
                    : ''}
                    <div className="col-sm-12 d-grid">
                        <label> &nbsp; </label>
                        <button className="btn btn-primary btn-block">Update User</button>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}

export default EditProfile
