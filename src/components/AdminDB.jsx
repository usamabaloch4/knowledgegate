import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import '../css/dashboard.css';
import axios from 'axios';

const AdminDB = ({uid, baseUrl}) => {

    const [summary, setSummary] = useState({
        students: 12,
        teachers: 2,
        subjects: 3,
        classes: 2
    });

    useEffect(() => {
        axios.get(baseUrl+"/user/getadminsummary/"+uid).then(response => {
            setSummary(response.data);
        });
    }, []);

    return (
        <>
        <div className="snipets">
            <div className="row">
                <div className="col-sm-4">
                    <div className="card bg-danger">
                        <div className="card-body">
                            <Link to="/students">
                            <h1 className="text-center"><i className="mdi mdi-account-tie-outline"></i></h1>
                            <div>
                                <h4>
                                    {summary.students} Students
                                    <span></span>
                                </h4>
                            </div>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="card bg-warning">
                        <div className="card-body">
                        <Link to="/teachers">
                            <h1 className="text-center"><i className="mdi mdi-account-tie-voice"></i></h1>
                            <div>
                                <h4>
                                    {summary.teachers} Teachers
                                    <span></span>
                                </h4>
                            </div>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="card bg-success">
                        <div className="card-body">
                        <Link to="/classes">
                            <h1 className="text-center"><i className="mdi mdi-bank-check"></i></h1>
                            <div>
                                <h4>
                                    {summary.classes} Classes
                                    <span></span>
                                </h4>
                            </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-4">
                    <div className="card bg-success">
                        <div className="card-body">
                            <Link to="/subjects">
                            <h1 className="text-center"><i className="mdi mdi-book-open-page-variant"></i></h1>
                            <div>
                                <h4>
                                    {summary.subjects} Subjects
                                    <span></span>
                                </h4>
                            </div>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="card bg-danger">
                        <div className="card-body">
                            <h1 className="text-center"><i className="mdi mdi-clipboard-edit"></i></h1>
                            <div>
                                <h4>
                                    3 Tests
                                    <span></span>
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="card bg-secondary">
                        <div className="card-body">
                            <h1 className="text-center"><i className="mdi mdi-bookshelf"></i></h1>
                            <div>
                                <h4>
                                    1 Archived
                                    <span></span>
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>



        </>
    )
}

export default AdminDB
