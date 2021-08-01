import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery';
const Teachers = ({baseUrl}) => {
    const [data, setData] = useState([]);

    const roles = ['', 'Admin', 'Teacher', 'Student'];
    const [pageUpdate, setPageUpdate] = useState('yes');
    const [pageError, setPageError] = useState("");

    useEffect(() => {
        axios.get(baseUrl+"/teachers").then(response => {
            setData(response.data);
            console.log(data);
        });
    }, [pageUpdate]);

    const deleteTeacher = (index) => {
        var confirm = window.confirm("Are you sure to delete this teacher?");
        if(confirm)
        {
            axios.get(baseUrl+"/teacher/delete/"+data[index].id).then(response => {
                if(response.data.status == "success")
                {
                    setPageUpdate(pageUpdate+1);
                }
                else
                {
                    setPageError(response.data.error);
                }
            });
        }
    }

    const viewData = (item) => {
        $("#info_"+item).toggle(500);
    }


    const download = () => {

        let anchor = document.createElement("a");
        document.body.appendChild(anchor);
        let file = baseUrl+"/teachers/true";

        let headers = new Headers();
        headers.append('Authorization', 'Bearer '+ localStorage.getItem('webtoken'));

        fetch(file, { headers })
            .then(response => response.blob())
            .then(blobby => {
                let objectUrl = window.URL.createObjectURL(blobby);

                anchor.href = objectUrl;
                anchor.download = 'Teachers.csv';
                anchor.click();

                window.URL.revokeObjectURL(objectUrl);
            });
    }

    return (
        <>
        <div className="page-title">
        <h4 className="">Teachers</h4>
        <small>
            <i className="mdi mdi-home"></i> Home <i className="mdi mdi-menu-right"></i>
            <i className="mdi mdi-account-group"></i> Teachers 
             </small>
        </div>
        
        <div className="card">
            <div className="card-header">
                <h5>Total Teachers: {data.length} 
                    <Link to="/adduser" className="btn btn-sm btn-success float-end"><i className="mdi mdi-plus"></i> Add New</Link>
                    <button className="btn btn-primary float-end" style={{marginRight: 5}} onClick={() => {download()}}><i className="mdi mdi-calendar-export"></i> Export</button>
                </h5>
            </div>
            <div className="card-body">

            {/* {data.map((row, index) => (
                <div>
                    <h5>{row.forename} {row.surname} <br/> <small className="st">@{row.username}</small></h5>
                    <h6>Subjects</h6>

                    <hr/>
                </div>
            ))} */}

            {pageError == "" ? '' :
                <div className="alert alert-danger">{pageError}</div>
            }   

            <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>S.no</th>
                            <th>Username</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data.map((row, index) => (
                        <>
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{row.username}</td>
                            <td>{row.forename} {row.surname}</td>
                            <td>{row.email}</td>
                            <td className="tc-actions">
                                <button className="ico-btn text-success" onClick={() => viewData(index)} data-bs-toggle="tooltip" data-bs-placement="top" title="View Information">
                                    <i className="mdi mdi-information"></i>
                                </button>
                                <button className="ico-btn text-danger" onClick={() => deleteTeacher(index)}><i className="mdi mdi-delete"></i></button>
                            </td>
                        </tr>
                        <tr className="collapse" id={`info_`+index}>
                            <td colSpan="1">
                                <strong>Subject</strong> <br/>
                                {row.subjects !== undefined ? row.subjects.map((subs) =>
                                    <>
                                        <span>{subs[0]}</span><br/>
                                    </>
                                ) : ''}
                            </td>
                            <td colSpan="5">
                                <strong>Class</strong>
                                <br/>
                                {row.subjects !== undefined ? row.subjects.map((subs) =>
                                    <>
                                        <span>{subs[1]}</span><br/>
                                    </>
                                ): ''}
                            </td>
                        </tr>
                        </>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
        </>
    )
}

export default Teachers
