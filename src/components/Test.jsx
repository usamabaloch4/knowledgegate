import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom';
import axios from 'axios';
import AddSubjectDialog from './AddSubjectDialog';
import Select from "react-select";
import $ from 'jquery';

const Class = (props) => {

    const baseUrl = props.baseUrl;

    const classid = props.match.params.id;
    const [data, setData]                   = useState([]);
    const [pageupdate, setPageupdate]       = useState(1);
    const [allStudents, setAllStudents]     = useState([]);
    const [studentstoenroll, setStudents]   = useState();

    useEffect(() => {
        axios.get(baseUrl+"/test/"+classid).then(response => {
            setData(response.data);
            console.log(response.data);
        });
        
    }, [pageupdate]);


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

    const editResult = (index) => {
        $("#grade"+index+" strong").hide();
        $("#grade"+index+" .input-group").show();
    }

    const updateResult = (index) => {
        var newmarks = $("#ginput"+index).val();
        axios.post(baseUrl+'/result/update/'+data.results[index].rid, {'grade': newmarks}).then(res => {
            if(res.data.status === "success")
            {
                $("#grade"+index+" strong").html(newmarks).show();
                $("#grade"+index+" .input-group").hide();
            }
        });
    }
    
    return (
        <>
        <div className="page-title">
            <h4 className="">Test Details </h4>
            <small>
                <i className="mdi mdi-home"></i> Home <i className="mdi mdi-menu-right"></i>
                <i className="mdi mdi-clipboard-edit"></i> Tests <i className="mdi mdi-menu-right"></i> 3
            </small>
        </div>
        
        <div className="card">
            <div className="card-header dark">
                <div className="d-flex ch-edit-container">
                    <h1 className="flex-grow-1 ch-editable" id="pg_title">{data.title}</h1>
                </div>
                <small className="text-danger" id="update_error"></small>
                <h6>
                    <i className="mdi mdi-book-open-page-variant"></i> {data.subject} --  
                    <i className="mdi mdi-bank"></i> {data.class} -- 
                    <i className="mdi mdi-calendar"></i> {data.date}
                </h6>
            </div>
            <div className="card-body">

                <table className="table table-striped" >
                    <thead>
                        <tr>
                            <th>
                                S.No
                            </th>
                            <th>Student</th>
                            <th>Marks</th>
                            <th>Max Marks</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.results ? data.results.map((row, index) => (
                            <tr>
                                <td>{index +1}</td>
                                <td>{row.student}</td>
                                <td id={`grade`+index} width={200}>
                                    <strong>{row.grade}</strong>

                                    <div class="input-group input-group-sm mb-3 " style={{width: 180, display: 'none'}}>
                                        <input type="text" id={`ginput`+index} class="form-control" placeholder="New Marks" />
                                        <button class="btn btn-danger" type="button" onClick={()=> updateResult(index)}>Update</button>
                                    </div>
                                </td>
                                <td>{data.totalgrade}</td>
                                <td>
                                    <button className="ico-btn text-danger" onClick={() => editResult(index)} ><i className="mdi mdi-pencil"></i></button>
                                </td>
                            </tr>
                        )) : ''}
                    </tbody>
                </table>
                <div className="text-end">
                </div>
            </div>
        </div>

        <AddSubjectDialog classid={classid} pageUpdate={setPageupdate} baseUrl={baseUrl} update={pageupdate} />

        </>
    )
}

export default Class
