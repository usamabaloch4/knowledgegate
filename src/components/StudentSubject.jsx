import React, {useState, useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom';
import {Link} from 'react-router-dom'
import axios from 'axios';
import $ from 'jquery';

const StudentSubject = (props) => {
    const history = useHistory();
    const baseUrl = props.baseUrl;

    const subid = props.match.params.id;
    const [data, setData]                   = useState([]);
    const [pageupdate, setPageupdate]       = useState(1);
    const [allStudents, setAllStudents]     = useState([]);
    const [studentstoenroll, setStudents]   = useState();

    useEffect(() => {
        axios.get(baseUrl+"/subject/detailsforstudent/"+subid+'/'+props.uid).then(response => {
            setData(response.data);
        });        
    }, [pageupdate]);


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
                <h6>From: {data.class}</h6>
            </div>
            <div className="card-body">

                <h5>Subject Tests</h5>
                {/* <hr/> */}

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Schedule</th>
                            <th>Obtained Grade</th>
                            <th>Total Grade</th>
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
                                        {row.status === 0 ? <span className="badge bg-warning">Result Not Published</span> : row.obtmarks}</td>
                                    <td>{row.grade}</td>
                                </tr>
                            )) : ''
                        }
                    </tbody>
                </table>
            </div>
        </div>
        </>
    )
}

export default StudentSubject
