import React from 'react';
import {Link} from 'react-router-dom';
const Users = ({userType}) => {
    const data = [
        [1, "usama", "Teacher", "18.07.1995"],
        [2, "irfan", "Teacher", "18.07.1995"],
        [3, "ali", "student", "18.07.1995"],
        [4, "usman", "student", "18.07.1995"],
        [5, "farhan", "student", "18.07.1995"],
        [6, "zeeshan", "student", "18.07.1995"],
        [7, "meezan", "student", "18.07.1995"],
    ];

    return (
        <>
        <div className="page-title">
        <h4 className="">Users</h4>
        <small>
            <i className="mdi mdi-home"></i> Home <i className="mdi mdi-menu-right"></i>
            <i className="mdi mdi-account-group"></i> Users 
             </small>
        </div>
        
        <div className="card">
            <div className="card-header">
                <h5>Total Users: {userType} <Link to="/adduser" className="btn btn-sm btn-primary float-end"><i className="mdi mdi-plus"></i> Add New</Link></h5>
            </div>
            <div className="card-body">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>S.no</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data.map((row) => (
                        <tr>
                            <td>{row[0]}</td>
                            <td>{row[1]}</td>
                            <td>{row[2]}</td>
                            <td>{row[3]}</td>
                            <td>
                                <a href="#" className="text-success"><i className="mdi mdi-pencil"></i></a>
                                <a href="" className="text-danger"><i className="mdi mdi-delete"></i></a>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
        </>
    )
}

export default Users
