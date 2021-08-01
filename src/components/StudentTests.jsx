import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';
const StudentTests = ({uid, baseUrl}) => {
    const [data, setData] = useState([]);
    const [pageUpdate, setPageUpdate] = useState('yes');
    const [pageError, setPageError] = useState("");

    useEffect(() => {
        axios.get(baseUrl+"/tests/filter/student/"+uid).then(response => {
            setData(response.data);
            console.log(data);
        });
    }, [pageUpdate]);

    const download = () => {

        let anchor = document.createElement("a");
        document.body.appendChild(anchor);
        let file = baseUrl+"/tests/filter/student/"+uid+"/true";

        let headers = new Headers();
        headers.append('Authorization', 'Bearer '+ localStorage.getItem('webtoken'));

        fetch(file, { headers })
            .then(response => response.blob())
            .then(blobby => {
                let objectUrl = window.URL.createObjectURL(blobby);

                anchor.href = objectUrl;
                anchor.download = 'Test Results.csv';
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
                    My Test Results
                    <button className="btn btn-primary float-end" onClick={() => {download()}}><i className="mdi mdi-calendar-export"></i> Export</button>
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
                            <th>Obtained Grade</th>
                            <th>Max Grade</th>
                            <th>Test Date</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data.length > 0 ? data.map((row, index) => (
                        <tr key={index} className={row.status !== 1 ? 'row-muted' : ''}>
                            <td>{index + 1}</td>
                            <td>{row.title} </td>
                            <td>{row.subject}</td>
                            <td>{row.class}</td>
                            <td>{
                                row.status === 1 ? row.obtmarks : <small classname="text-danger">Not published yet</small>}</td>
                            <td>{row.totalgrade}</td>
                            <td>{row.date}</td>
                        </tr>
                    )) : ''}
                    </tbody>
                </table>
            </div>
        </div>


        </>
    )
}

export default StudentTests
