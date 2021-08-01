import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';
const Classes = ({baseUrl}) => {

    const [data, setData] = useState([]);
    const [nclass, setClass] = useState({title: ''});
    const [formError, setFormError] = useState([]);    
    const [pageupdate, setPageUpdate] = useState(1);

    useEffect(() => {
        axios.get(baseUrl+"/class").then(response => {
            setData(response.data);
        });
    }, [pageupdate]);



    const createClass = (e) => {
        e.preventDefault();

        var classtitle =  document.getElementById("classtitle").value;

        setClass({title: classtitle});

        axios.post(baseUrl+"/class/create", {"title": classtitle}, {
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => {
                var rdata = response.data;
                if(rdata.status == 'error')
                {
                    setFormError(rdata.data);
                }
                else if(rdata.status == 'success')
                {
                    setFormError([]);
                    setPageUpdate(pageupdate + 1);
                    document.getElementById("mdlClose").click();
                }
        });
    }

    const deleteClass = (index) => {
        var classid = data[index].id;
        axios.get(baseUrl+"/class/delete/?id="+classid).then(response => {
            if(response.data.status = 'success')
            {
               setPageUpdate(3);
            }
        });
    }

    const download = () => {

        let anchor = document.createElement("a");
        document.body.appendChild(anchor);
        let file = baseUrl+"/class/index/true";

        let headers = new Headers();
        headers.append('Authorization', 'Bearer '+ localStorage.getItem('webtoken'));

        fetch(file, { headers })
            .then(response => response.blob())
            .then(blobby => {
                let objectUrl = window.URL.createObjectURL(blobby);

                anchor.href = objectUrl;
                anchor.download = 'Classes.csv';
                anchor.click();

                window.URL.revokeObjectURL(objectUrl);
            });
    }

    return (
        <>
        <div className="page-title">
        <h4 className="">Classes</h4>
        <small>
            <i className="mdi mdi-home"></i> Home <i className="mdi mdi-menu-right"></i>
            <i className="mdi mdi-bank-check"></i> Classes 
             </small>
        </div>
        
        <div className="card">
            <div className="card-header">
                <h5>Total Classes: {data.length} 
                    <a href="#" 
                    data-bs-toggle="modal" 
                    data-bs-target="#exampleModal" 
                    className="btn btn-sm btn-success float-end">
                        <i className="mdi mdi-plus"></i> Add New</a>

                    <button className="btn btn-primary float-end" style={{marginRight: 5}} onClick={() => {download()}}><i className="mdi mdi-calendar-export"></i> Export</button>
                </h5>
            </div>
            <div className="card-body">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>S.no</th>
                            <th>Class Title</th>
                            <th>Has Subjects</th>
                            <th>Has Students</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{row.title}</td>
                            <td>{row.subjects}</td>
                            <td>{row.students}</td>
                            <td className="tc-actions">
                                <Link className="ico-btn text-success" data-bs-toggle="tooltip" data-bs-placement="top" title="View Information" to={`/class/`+row.id}><i className="mdi mdi-information"></i></Link>
                                {/* <button className="ico-btn text-parimary"><i className="mdi mdi-bank-check"></i></button> */}
                                <button className="ico-btn text-danger" onClick={() => deleteClass(index)}><i className="mdi mdi-delete"></i></button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>



        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Add New Class</h5>
                    <button type="button" id="mdlClose" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    {formError.length < 1 ? '' :
                        <div className="alert alert-danger">
                            {formError.title || formError.teacherid}
                        </div>
                    }
                    <form method="post" action="" onSubmit={createClass} name="classform" id="classform">
                        <div className="mb-3 row">
                            <div className="col-sm-12">
                                <label>Class Name</label>
                                <input type="text" className="form-control" id="classtitle" />
                            </div>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" form="classform" onClick={createClass} className="btn btn-primary">Save changes</button>
                </div>
                </div>
            </div>
        </div>



        </>
    )
}

export default Classes
