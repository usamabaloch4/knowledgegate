import React from 'react'
import '../css/dashboard.css';

const StudentDB = ({userId, role}) => {

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
                                    Class 3
                                    <span>I Study In</span>
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
                                    <span>I Have</span>
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
                                    <span>My Upcoming Test</span>
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

export default StudentDB
