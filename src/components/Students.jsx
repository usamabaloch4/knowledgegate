import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom';

const Students = ({baseUrl}) => {
    const [data, setData] = useState([]);

    const roles = ['', 'Admin', 'Teacher', 'Student'];
    const [pageUpdate, setPageUpdate] = useState('yes');

    useEffect(() => {
        axios.get(baseUrl+"/students").then(response => {
            setData(response.data);
            console.log(data);
        });
    }, [pageUpdate]);

    const deleteUser = (index) => {
        var confirm = window.confirm("Are you sure to delete this user?");
        if(confirm)
        {
            axios.post(baseUrl+"/user/delete/?id="+data[index].id, JSON.stringify({id: data[index].id})).then(response => {
                if(response.data.status == "success")
                {
                    var dataHolder = data;
                    dataHolder = dataHolder.splice(index, 1);
                    setData(dataHolder);
                }
            });
        }
    }

    const download = () => {

        let anchor = document.createElement("a");
        document.body.appendChild(anchor);
        let file = baseUrl+"/students/true";

        let headers = new Headers();
        headers.append('Authorization', 'Bearer '+ localStorage.getItem('webtoken'));

        fetch(file, { headers })
            .then(response => response.blob())
            .then(blobby => {
                let objectUrl = window.URL.createObjectURL(blobby);

                anchor.href = objectUrl;
                anchor.download = 'Students.csv';
                anchor.click();

                window.URL.revokeObjectURL(objectUrl);
            });
    }

    return (
        <>
        <div className="page-title">
        <h4 className="">Studetns</h4>
        <small>
            <i className="mdi mdi-home"></i> Home <i className="mdi mdi-menu-right"></i>
            <i className="mdi mdi-account-group"></i> Users 
             </small>
        </div>
        
        <div className="card">
            <div className="card-header">
                <h5>Total Students: {data.length} 
                <Link to="/adduser" className="btn btn-sm btn-success float-end"><i className="mdi mdi-plus"></i> Add New</Link>
                <button className="btn btn-primary float-end" style={{marginRight: 5}} onClick={() => {download()}}><i className="mdi mdi-calendar-export"></i> Export</button>
            </h5>
            </div>
            <div className="card-body">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>S.no</th>
                            <th>Username</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Class</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{row.username}</td>
                            <td>{row.forename} {row.surname}</td>
                            <td>{row.email}</td>
                            <td>{row.class === '' ? <small className="text-danger">Not Enrolled</small> : row.class }</td>
                            <td className="tc-actions">
                                <Link to={`users/edit/`+row.id} className="text-primary" data-bs-toggle="tooltip" data-bs-placement="top" title="View Information"><i className="mdi mdi-pencil"></i></Link>
                                {/* <a href="#" className="text-parimary"><i className="mdi mdi-bank-check"></i></a> */}
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

export default Students
