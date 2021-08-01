import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
const Users = ({userType, baseUrl}) => {
    const [data, setData] = useState([]);

    const roles = ['', 'Admin', 'Teacher', 'Student'];
    const [pageUpdate, setPageUpdate] = useState('yes');

    useEffect(() => {
        axios.get(baseUrl+"/user/index").then(response => {
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
        let file = baseUrl+"/user/index/true";

        let headers = new Headers();
        headers.append('Authorization', 'Bearer '+ localStorage.getItem('webtoken'));

        fetch(file, { headers })
            .then(response => response.blob())
            .then(blobby => {
                let objectUrl = window.URL.createObjectURL(blobby);

                anchor.href = objectUrl;
                anchor.download = 'Users.csv';
                anchor.click();

                window.URL.revokeObjectURL(objectUrl);
            });
    }

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
                <h5>
                    Total Users: {data.length} 
                    <Link to="/adduser" className="btn btn-sm btn-success float-end"><i className="mdi mdi-plus"></i> Add New</Link>
                    <button className="btn btn-primary float-end" style={{marginRight: 5}} onClick={() => {download()}}><i className="mdi mdi-calendar-export"></i> Export</button>
                </h5>
            </div>
            <div className="card-body">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>S.no</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data.length > 0 ? data.map((row, index) => (
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{row.forename} {row.surname}</td>
                            <td>{row.email}</td>
                            <td>{roles[row.role]}</td>
                            <td>
                                <Link to={`users/edit/`+ row.id} className="text-success ico-btn"><i className="mdi mdi-pencil"></i></Link>
                                <button className="text-danger ico-btn" onClick={()=> deleteUser(index)}><i className="mdi mdi-delete"></i></button>
                            </td>
                        </tr>
                    )) : ''}
                    </tbody>
                </table>
            </div>
        </div>
        </>
    )
}

export default Users
