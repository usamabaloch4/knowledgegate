import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';
const Tests = ({uid, baseUrl}) => {
    const [data, setData] = useState([]);
    const [pageUpdate, setPageUpdate] = useState('yes');
    const [pageError, setPageError] = useState("");

    useEffect(() => {
        axios.get(baseUrl+"/tests/filter/teacher/"+uid).then(response => {
            setData(response.data);
            console.log(data);
        });
    }, [pageUpdate]);

    const deleteTest = (index) => {
        axios.get(baseUrl+"/tests/delete/"+data[index].id).then(response => {
            setPageUpdate(pageUpdate +1);
        });
    }

    const download = () => {

        let anchor = document.createElement("a");
        document.body.appendChild(anchor);
        let file = baseUrl+"/tests/filter/teacher/"+uid+"/true";

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
        <h4 className="">Tests</h4>
        <small>
            <i className="mdi mdi-home"></i> Home <i className="mdi mdi-menu-right"></i>
            <i className="mdi mdi-clipboard-edit"></i> Tests 
             </small>
        </div>
        
        <div className="card">
            <div className="card-header">
                <h5>
                    Tests 
                    <Link to="/tests/create"  className="btn btn-sm btn-success float-end"><i className="mdi mdi-plus"></i> Add New</Link>
                    <button className="btn btn-primary float-end" style={{marginRight: 5}} onClick={() => {download()}}><i className="mdi mdi-calendar-export"></i> Export</button>
                </h5>
            </div>
            <div className="card-body">
            <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>S.no</th>
                            <th>Test Name</th>
                            <th>Subject</th>
                            <th>Class</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data.length > 0 ? data.map((row, index) => (
                        <tr key={index}>
                            <td>{row.id}</td>
                            <td>{row.title} </td>
                            <td>{row.subject}</td>
                            <td>{row.class}</td>
                            <td>
                                {
                                    row.status === 0 ? 
                                    <span className="badge bg-warning">Result Not Confirmed</span> : 
                                    <span className="badge bg-success">Result Published</span>
                                }
                            </td>
                            <td className="tc-actions bt">
                                <Link to={`/test/`+row.id} className="btn-success btn-sm btn">
                                    <i className="mdi mdi-clipboard-text-search"></i>   View Results
                                    </Link> &nbsp;
                                <Link to={`/test/edit/`+row.id} className="btn-danger btn-sm btn">
                                    <i className="mdi mdi-pencil"></i>   Edit Test
                                </Link> &nbsp;

                               <button className="btn-danger btn-sm btn" onClick={() => deleteTest(index)}>
                                    <i className="mdi mdi-delete"></i>   Delete
                                </button> &nbsp;
                                
                                {
                                    row.status === 0 ? (
                                    <Link to={`/test/uploadresult/`+row.id} className="btn-warning btn-sm btn">
                                        <i className="mdi mdi-clipboard-check-multiple"></i>   Add Results
                                    </Link> ): ''
                                }
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

export default Tests
