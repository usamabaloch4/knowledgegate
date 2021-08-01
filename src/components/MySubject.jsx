import React, {useState, useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom';
import {Link} from 'react-router-dom'
import axios from 'axios';
import $ from 'jquery';

const MySubject = (props) => {
    const history = useHistory();
    const baseUrl = props.baseUrl;

    const subid = props.match.params.id;
    const [data, setData]                   = useState([]);
    const [pageupdate, setPageupdate]       = useState(1);
    const [allStudents, setAllStudents]     = useState([]);
    const [studentstoenroll, setStudents]   = useState();

    useEffect(() => {
        axios.get(baseUrl+"/subject/"+subid).then(response => {
            setData(response.data);
        });        
    }, [pageupdate]);

 

    const updateMySubject = () => {
        var newname = document.getElementById("pg_title");
        var error = document.getElementById("update_error");
        axios.post(baseUrl+"/class/update/"+subid, {'title': newname.innerText})
            .then(response => {
                var rdata = response.data;

                console.log(rdata);
                if(rdata.status === 'error')
                {
                    error.innerHTML = '<strong>Warning:</strong> '+ rdata.errors.title;
                    newname.focus();
                    console.log(rdata);
                }
                else if(rdata.status === 'success')
                {
                    error.innerHTML = '';
                    // setPageupdate(pageupdate + 1);
                }
        });
    }


    return (
        <>
        <div className="page-title">
            <h4 className="">Subject </h4>
            <small>
                <i className="mdi mdi-home"></i> Home <i className="mdi mdi-menu-right"></i>
                <i className="mdi mdi-bank-check"></i> Subjects <i className="mdi mdi-menu-right"></i> {subid}
            </small>

            <small className="float-end st item-pad-5">
                {/* <a href="" className="text-primary"><i className="mdi mdi-pencil"></i> Edit Class</a> &nbsp; */}
            </small>
        </div>
        
        <div className="card">
            <div className="card-header dark">
                <div className="d-flex ch-edit-container">
                    <h1 className="flex-grow-1 ch-editable" id="pg_title">{data.title}</h1>
                </div>
                <small className="text-danger" id="update_error"></small>
                <h6>Taught In: {data.class}</h6>
            </div>
            <div className="card-body">

                <h5>Subject Tests <Link to="/tests/create" className="btn btn-primary float-end">
                    <i className="mdi mdi-clipboard-edit"></i> 
                    Create New
                </Link></h5>

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Schedule</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.tests ? data.tests.map((row) => (
                                <tr>
                                    <td>{row.id}</td>
                                    <td>{row.title}</td>
                                    <td>{row.date}</td>
                                    <td>
                                        {
                                            row.status === 0 ? 
                                            <span className="badge bg-warning">Result Not Confirmed</span> : 
                                            <span className="badge bg-success">Result Published</span>
                                        }
                                    </td>
                                    <td>
                                    <Link to={`/test/`+row.id} className="btn-success btn-sm btn">
                                        <i className="mdi mdi-clipboard-text-search"></i>   View Results
                                    </Link> &nbsp;
                                    {
                                        row.status === 0 ?
                                        <Link to={`/test/uploadresult/`+row.id} className="btn-warning btn-sm btn">
                                            <i className="mdi mdi-clipboard-check-multiple"></i>   Add Results
                                        </Link> : ''
                                    }
                                    </td>
                                </tr>
                            )) : ''
                        }
                    </tbody>
                </table>
                <br/><br/>
                <table className="table table-striped" >
                    <thead>
                        <tr>
                            <th>
                                Enrolled Students
                            </th>
                            <th>Average Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.students ? data.students.map((row) => (
                            <tr>
                                <td>{row.fullname}</td>
                                <td>{row.mean}</td>
                            </tr>
                        )) : ''}
                    </tbody>
                </table>
            </div>
        </div>
        </>
    )
}

export default MySubject
