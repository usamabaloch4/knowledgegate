import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import '../css/dashboard.css';
import axios from 'axios';

const TeacherDB = ({uid, baseUrl}) => {

    const [summary, setSummary] = useState({
        test: '12.03.2021',
        subjects: 3,
        classes: 2
    });

    useEffect(() => {
        axios.get(baseUrl+"/user/getteachersummary/"+uid).then(response => {
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
                            <h1 className="text-center"><i className="mdi mdi-bank-check"></i></h1>
                            <div>
                                <h4>
                                    3 Classes
                                    <span>I Teach In</span>
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="card bg-warning">
                        <div className="card-body">
                            <h1 className="text-center"><i className="mdi mdi-book-open-page-variant"></i></h1>
                            <div>
                                <h4>
                                    3 Subjects
                                    <span>I Teach</span>
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="card bg-success">
                        <div className="card-body">
                            <h1 className="text-center"><i className="mdi mdi-clipboard-edit"></i></h1>
                            <div>
                                <h4>
                                    03-03-2021
                                    <span>Scheduled Test</span>
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

export default TeacherDB
