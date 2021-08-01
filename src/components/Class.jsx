import React, {useState, useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom';
import axios from 'axios';
import AddSubjectDialog from './AddSubjectDialog';
import Select from "react-select";
import $ from 'jquery';

const Class = (props) => {
    const history = useHistory();
    const baseUrl = props.baseUrl;

    const classid = props.match.params.id;
    const [data, setData]                   = useState([]);
    const [pageupdate, setPageupdate]       = useState(1);
    const [allStudents, setAllStudents]     = useState([]);
    const [studentstoenroll, setStudents]   = useState();

    useEffect(() => {
        axios.get(baseUrl+"/class/"+classid).then(response => {
            setData(response.data);
            // console.log(response.data);
        });
        axios.get(baseUrl+"/user/getstudentswithlabel").then(response => {
            setAllStudents(response.data);
            // console.log(response.data); 
        });
        
    }, [pageupdate]);

    const removeSubject = (subid) => {
        axios.get(baseUrl+"/subject/remove/"+subid).then(response => {
            setPageupdate(pageupdate +1);
        });
    }

    const toggleEnrollment = () => {
        $("#enrollmentarea").toggle(300);
    }

    const enrollStudents = () => {
        var slist = [];
        studentstoenroll.map((std, index) => {
            slist[index] = [std.value, classid];
        } );
        axios.post(baseUrl+"/class/enroll", {'enrollment': slist})
            .then(response => {
                var rdata = response.data;

                console.log(rdata);
                if(rdata.status === 'error')
                {

                }
                else if(rdata.status === 'success')
                {
                    setPageupdate(pageupdate + 1);
                    $("#enrollmentarea").toggle(300);
                }
        });
    }

    const customStyles = {
        option: (provided, state) => ({
          ...provided,
          borderBottom: '1px dotted #eee',
          color: state.isSelected ? 'red' : 'blue',
          padding: 10,
          fontSize: 12,
          color: "#333"
        }),
        control: () => ({
        display: "flex",
        fontsize: 12,
        border: "1px solid rgb(76, 154, 255)",
        borderRadius: 5
        }),
        input: () => ({
            // visibility: "hidden"
            background: 'white !important'
        }),
        placeholder: () => ({
            // fontsize: 9
            color: "#777",
            fontSize: 12,
            paddingLeft: 7
        }),
        multiValue: (provided, state) => {
          const opacity = state.isDisabled ? 0.5 : 1;
          const transition = 'opacity 300ms';
          const fontSize = '14px';
          const background = "rgb(76, 154, 255)";
      
          return { ...provided, opacity, transition, fontSize, background, color: "white"};
        },
        multiValueLabel: (styles) => ({
            ...styles,
            color: "white"
        })
    }

    const upddateClass = () => {
        var newname = document.getElementById("pg_title");
        var error = document.getElementById("update_error");
        axios.post(baseUrl+"/class/update/"+classid, {'title': newname.innerText})
            .then(response => {
                var rdata = response.data;

                console.log(rdata);
                if(rdata.status === 'error')
                {
                    error.innerHTML = '<strong>Warning:</strong> '+ rdata.errors.title;
                    newname.focus();
                    console.log(rdata);
                }
                else if(rdata.status === 'success')
                {
                    error.innerHTML = '';
                    // setPageupdate(pageupdate + 1);
                }
        });
    }
    const deleteClass = () => {
        axios.get(baseUrl+"/class/delete/?id="+classid).then(response => {
            if(response.data.status = 'success')
            {
                history.push("/classes");
            }
        });
    }

    return (
        <>
        <div className="page-title">
            <h4 className="">Class Details </h4>
            <small>
                <i className="mdi mdi-home"></i> Home <i className="mdi mdi-menu-right"></i>
                <i className="mdi mdi-bank-check"></i> Classes <i className="mdi mdi-menu-right"></i> Class 1
            </small>

            <small className="float-end st item-pad-5">
                <a href="#" data-bs-toggle="modal" data-bs-target="#addSubjectModal" className="text-success"><i className="mdi mdi-notebook-edit"></i> Add Subject</a> &nbsp;
                {/* <a href="" className="text-primary"><i className="mdi mdi-pencil"></i> Edit Class</a> &nbsp; */}
                <button className="ico-btn text-danger" onClick={deleteClass}><i className="mdi mdi-archive"></i> Delete Class</button>
            </small>
        </div>
        
        <div className="card">
            <div className="card-header dark">
                <div className="d-flex ch-edit-container">
                    <h1 contentEditable="true" className="flex-grow-1 ch-editable" id="pg_title">{data.title}</h1>
                    <button className="btn btn-warning" onClick={upddateClass}>
                        <i className="mdi mdi-grease-pencil"></i>    Update
                    </button>
                </div>
                <small className="text-danger" id="update_error"></small>
                <h6>Number of Students: {data.length > 0 ? data.students.length : ''}</h6>
            </div>
            <div className="card-body">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Class Subject</th>
                            <th>Teacher</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.subjects ? data.subjects.map((row) => (
                        
                            
                            <tr className={row.status ? '' : 'row-muted'}>
                                <td>{row.title} {!row.status ? <small className="text-danger">(Archived)</small> : '' }</td>
                                <td>{row.teacher}</td>
                                <td className="tc-actions">
                                    {(row.status && row.tests > 0) ?
                                    <button 
                                        className="ico-btn text-secondary" 
                                        onClick={() => removeSubject(row.id)}>
                                            <i className="mdi mdi-book-minus"></i> 
                                            <small>Archive Sujbect</small>
                                    </button> 
                                    :
                                    (row.status && row.tests < 1) ?
                                    <button 
                                        className="ico-btn text-danger" 
                                        onClick={() => removeSubject(row.id)}>
                                            <i className="mdi mdi-book-minus"></i> 
                                            <small>Delete Subject</small>
                                    </button> 
                                    : ''
                                    }
                                </td>
                            </tr>
                            
                        )) : ''}
                    </tbody>
                </table>

                <br/><br/>

                <table className="table table-striped" >
                    <thead>
                        <tr>
                            <th>
                                Enrolled Students

                                <button className="btn btn-sm btn-warning float-end" onClick={() => toggleEnrollment()}>
                                    <i className="mdi mdi-account-multiple-check"></i> Enroll New
                                </button>
                            </th>
                        </tr>
                        <tr style={{'display' : 'none'}} id="enrollmentarea">
                            <th>
                                <div className="row">
                                    <Select 
                                        className="col-sm-10" 
                                        options={allStudents} 
                                        styles={customStyles} 
                                        onChange={setStudents} 
                                        isMulti
                                        placeholder="Select Student...  "
                                    /> 
                                    <div className="col-sm-2 d-grid">
                                        <button className="btn-danger btn btn-lg" onClick={() => enrollStudents()}>
                                            <i className="mdi mdi-badge-account"></i> Enroll
                                        </button>
                                    </div>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.students ? data.students.map((row) => (
                            <tr>
                                <td>{row} {/*<small className="rmv-item float-end"><i className="mdi mdi-account-remove"></i> Disenroll</small>*/}</td>
                            </tr>
                        )) : ''}
                    </tbody>
                </table>
            </div>
        </div>

        <AddSubjectDialog classid={classid} pageUpdate={setPageupdate} baseUrl={baseUrl} update={pageupdate} />

        </>
    )
}

export default Class
