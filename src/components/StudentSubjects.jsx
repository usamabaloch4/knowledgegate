import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';
const StudentSubjects = ({uid, baseUrl}) => {
    const [data, setData] = useState([]);
    const [pageUpdate, setPageUpdate] = useState('yes');
    const [pageError, setPageError] = useState("");

    useEffect(() => {
        axios.get(baseUrl+"/subject/filter/student/"+uid).then(response => {
            setData(response.data);
            console.log(data);
        });
    }, [pageUpdate]);

    const download = () => {

        let anchor = document.createElement("a");
        document.body.appendChild(anchor);
        let file = baseUrl+"/subject/filter/student/"+uid+"/true";

        let headers = new Headers();
        headers.append('Authorization', 'Bearer '+ localStorage.getItem('webtoken'));

        fetch(file, { headers })
            .then(response => response.blob())
            .then(blobby => {
                let objectUrl = window.URL.createObjectURL(blobby);

                anchor.href = objectUrl;
                anchor.download = 'Subjects.csv';
                anchor.click();

                window.URL.revokeObjectURL(objectUrl);
            });
    }


    return (
        <>
        <div className="page-title">
            <h4 className="">Subjects</h4>
            <small>
                <i className="mdi mdi-home"></i> Home <i className="mdi mdi-menu-right"></i>
                <i className="mdi mdi-book-open-page-variant"></i> My Subjects 
             </small>
        </div>
        
        <div className="card">
            <div className="card-header">
                <h5>
                    My Subjects
                    <button className="btn btn-primary float-end" onClick={() => {download()}}><i className="mdi mdi-calendar-export"></i> Export</button>
                </h5>
            </div>
            <div className="card-body">
            <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>S.no</th>
                            <th>Subject Title</th>
                            <th>Taught By</th>
                            <th>Average Grade</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data.length > 0 ? data.map((row, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{row.title} {row.status == 0 ? <small className="text-danger">(Archived)</small> : ''}</td>
                            <td>{row.teacher}</td>
                            <td>{row.avggrade}</td>
                            <td>
                                <Link to={`/subject/`+row.id} className="ico-btn text-primary"><i className="mdi mdi-eye"></i> Browse</Link>
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

export default StudentSubjects
