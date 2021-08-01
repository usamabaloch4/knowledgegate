import React, {useState, useEffect} from 'react'
import { useHistory } from "react-router-dom";
import {Link} from 'react-router-dom'
import axios from 'axios';
const EditTest = (props) => {
    const testid = props.match.params.id;
    const baseUrl = props.baseUrl;
    const history = useHistory();
    const [formData, setFormData] = useState({
        title: "",
        subject: "",
        date: "",
        totalgrade: ""
    });
    const [data, setData] = useState([]);
    const [pageUpdate, setPageUpdate] = useState('yes');
    const [pageError, setPageError] = useState("");
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        axios.get(baseUrl+"/test/getdetails/"+testid).then(response => {
            setFormData(response.data);
            console.log(data);
        });
    }, [pageUpdate]);

    const handle = (e) => {
        const newData = {...formData};

        newData[e.target.id] = e.target.value;

        setFormData(newData);
    }

    const postForm = (e) => {
        e.preventDefault();

        // const form = document.getElementById("userform");

        // var user = new FormData(form);
        axios.post(baseUrl+"/test/update/"+testid, formData)
            .then(response => {
                var rdata = response.data;
                if(rdata.status == 'error')
                {
                    var newErrors = {...formErrors};
                    newErrors = rdata.errors;
                    setFormErrors(newErrors);

                    console.log(newErrors);
                }
                else if(rdata.status == 'success')
                {
                    history.push("/tests");
                }
        });


    }


    return (
        <>
        <div className="page-title">
        <h4 className="">Edit Test</h4>
        <small>
            <i className="mdi mdi-home"></i> Home <i className="mdi mdi-menu-right"></i>
            <i className="mdi mdi-clipboard-edit"></i> Tests <i className="mdi mdi-menu-right"></i> Edit Test 
             </small>
        </div>
        
        <div className="card">
            <div className="card-header">
                <h5>Edit Test</h5>
            </div>
            <div className="card-body">
            <form action="" id="userform" onSubmit={postForm}>
                    <div className={`mb-3 row  ${formErrors.title === undefined ? '' : 'frm-error'}`}>
                        <label className="col-sm-12 col-form-label">Test Name</label>
                        <div className="col-sm-12">
                            <input type="text" id="title" onChange={(e) => handle(e)} className="form-control" value={formData.title}/>
                            <small>{formErrors.title}</small>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <div className={`col-sm-6 ${formErrors.subjectid === undefined ? '' : 'frm-error'}`}>
                            <label>Subject</label>
                            <input type="text" className="form-control" readOnly value={formData.subject}/>
                            <small>{formErrors.subjectid}</small>
                        </div>
                        <div className={`col-sm-6 ${formErrors.totalgrade === undefined ? '' : 'frm-error'}`}>
                            <label>Total Grades</label>
                            <input type="text" id="totalgrade" className="form-control" onChange={(e) => handle(e)} value={formData.totalgrade} />
                            <small>{formErrors.totalgrade}</small>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <div className={`col-sm-12 ${formErrors.date === undefined ? '' : 'frm-error'}`}>
                            <label>Schedule Date</label>
                            <input type="date" id="date" className="form-control" onChange={(e) => handle(e)} value={formData.date} />
                            <small>{formErrors.date}</small>
                        </div>
                    </div>
                    <div className="col-sm-12 d-grid">
                        <label> &nbsp; </label>
                        <button className="btn btn-primary btn-block">Update Test</button>
                    </div>
                </form>
            
            </div>
        </div>


        </>
    )
}

export default EditTest
