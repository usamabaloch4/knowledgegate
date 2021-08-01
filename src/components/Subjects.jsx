import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';
import EditSubjectDialog from "./EditSubjectDialog";
import $ from "jquery";
const Subjects = ({baseUrl}) => {

    const [data, setData] = useState([]);
    const [nsubject, setSubject] = useState({title: '', teacherid: ''});
    const [formError, setFormError] = useState([]);    
    const [pageupdate, setPageUpdate] = useState(1);

    const [subid, setSubId] = useState(0);
    const [title, setTitle] = useState("");
    const [teacher, setTeacher] = useState("");

    useEffect(() => {
        
    }, [1]);

    useEffect(() => {
        axios.get(baseUrl+"/subject").then(response => {
            setData(response.data);
        });
    }, [pageupdate]);



    const createSubject = (e) => {
        e.preventDefault();

        var subjecttitle =  document.getElementById("subjecttitle");

        axios.post(baseUrl+"/subject/create", {"title": subjecttitle.value})
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
                    subjecttitle.value = "";
                    document.getElementById("mdlClose").click();

                }
        });
    }

    const editSubject = (id) => {
        axios.get(baseUrl+"/subject/getdetails/"+id).then(response => {
            console.log(response.data);
            setSubId(response.data.id);
            setTitle(response.data.title);
            setTeacher(response.data.teacher);
        });
    }

    const deleteSubject = (index) => {
        var subjectid = data[index].id;
        axios.get(baseUrl+"/subject/archive/?id="+subjectid).then(response => {
            if(response.data.status = 'success')
            {
               setPageUpdate(3);
            }
        });
    }

    const download = () => {

        let anchor = document.createElement("a");
        document.body.appendChild(anchor);
        let file = baseUrl+"/subject/index/true";

        let headers = new Headers();
        headers.append('Authorization', 'Bearer '+ localStorage.getItem('webtoken'));

        fetch(file, { headers })
            .then(response => response.blob())
            .then(blobby => {
                let objectUrl = window.URL.createObjectURL(blobby);

                anchor.href = objectUrl;
                anchor.download = 'My Subjects.csv';
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
            <i className="mdi mdi-bank-check"></i> Subjects 
             </small>
        </div>
        
        <div className="card">
            <div className="card-header">
                <h4 style={{marginBottom: 0}}>
                    Total Subjects: {data.length}
                    <button className="btn btn-primary float-end" onClick={() => {download()}}><i className="mdi mdi-calendar-export"></i> Export</button>
                </h4>
            </div>
            <div className="card-body">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>S.no</th>
                            <th>Subject Title</th>
                            <th>Class</th>
                            <th>Taught By</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data.map((row, index) => (
                        <tr key={index} className={row.status ? '' : 'row-muted'}>
                            <td>{index + 1}</td>
                            <td>{row.title} {row.status == 0 ? <small className="text-danger">(Archived)</small> : ''}</td>
                            <td><Link to={`/class/`+row.classid}>{row.class}</Link></td>
                            <td>{row.teacher}</td>
                            <td className="tc-actions">
                                {row.status == 1 ?
                                <>
                                <button className="text-secondary ico-btn" data-bs-toggle="modal" data-bs-target="#editSubjectModal" onClick={() => editSubject(row.id)} title="Edit">
                                    <i className="mdi mdi-pencil"></i>
                                </button>
                                
                                <button className="text-danger ico-btn" onClick={() => deleteSubject(index)} title="Archive">
                                    <i className="mdi mdi-book-minus"></i>
                                </button>
                                </>
                                : '' }
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>

        <EditSubjectDialog ctitle={title} settitle={setTitle} baseUrl={baseUrl} subid={subid} teacher={teacher} setteacher={setTeacher} update={pageupdate} setupdate={setPageUpdate} />


        </>
    )
}

export default Subjects
