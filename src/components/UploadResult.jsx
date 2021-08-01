import React, {useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery';

const Class = (props) => {

    const baseUrl = props.baseUrl;

    const testid = props.match.params.id;
    const [data, setData]             = useState([]);
    const [pageupdate, setPageupdate] = useState(1);
    const [file, setFile]             = useState({});

    useEffect(() => {
        axios.get(baseUrl+"/test/"+testid).then(response => {
            setData(response.data);
        });
        
    }, [pageupdate]);

    const chooseFile = () => {
        document.getElementById("upfile").click();
    }

    const addFile = ({target: {files}}) => {
        var status = document.getElementById("file-status");
        if(files.length > 0)
        {
            status.innerText = files[0].name;
            setFile(files[0]);
        }
        else
        {
            status.innerText = "No file chosen";
        }
    }

    const uploadFile = () => {
        let form = new FormData();
        form.append('file', file);

        const options = {
            onUploadProgress: (progressEvent) => {
                const {loaded, total} = progressEvent;
                let percent = Math.floor(loaded * 100 / total);
                
                updateProgress(percent);
            }
        }

        axios.post(baseUrl+"/test/"+testid+"/uploadresult", form, options).then(
            res => {
                console.log(res);
            }
        );
    }

    const updateProgress = (percent) => {
        if(percent > 0)
        {
            $(".progress .status").hide();
            $(".progress-bar").css({width: percent+'%'});
            $(".progress-bar").html(percent+'%');
        }
    }

    const batchUpload = (e) => {
        document.getElementById("uploadForm").style.display = "block";
        document.getElementById("manualAdd").style.display = "none";
    }
    
    return (
        <>
        <div className="page-title">
            <h4 className="">Upload Result </h4>
            <small>
                <i className="mdi mdi-home"></i> Home <i className="mdi mdi-menu-right"></i>
                <i className="mdi mdi-clipboard-edit"></i> Tests <i className="mdi mdi-menu-right"></i> {data.title}
                <i className="mdi mdi-menu-right"></i> Upload Result
            </small>
        </div>
        
        <div className="card">
            <div className="card-header dark">
                <div className="d-flex ch-edit-container">
                    <h1 className="flex-grow-1 ch-editable" id="pg_title"><i className="mdi mdi-clipboard-edit"></i>  {data.title}</h1>
                </div>
                <small className="text-danger" id="update_error"></small>
                <h6>
                    <i className="mdi mdi-book-open-page-variant"></i> {data.subject} --  &nbsp;
                    <i className="mdi mdi-bank"></i> {data.class} -- &nbsp;
                    <i className="mdi mdi-calendar"></i> {data.date}
                </h6>
            </div>
            <div className="card-body">
                <div className="result-upload-form" id="uploadForm" style={{display: 'none'}}>
                    <figure>
                        <figcaption class="blockquote-footer">
                            You can download result CSV template 
                            
                            <Link to={{pathname: baseUrl+'/test/downloadresultsheet/'+testid}} target="_blank" download> from here</Link>
                        </figcaption>
                    </figure>

                    <input type="file" id='upfile' onChange={addFile} className="visually-hidden"/>

                    <label >Choose File (CSV)</label>
                    <div className="file-cont">
                        <div className="file-btn">
                            <button className="fbtn" onClick={chooseFile}>Choose File</button>
                        </div>
                        <div className="progress flex-grow-1">
                            <span className="status" id="file-status">No File Chosen</span>
                            <div class="progress-bar bg-warning" role="progressbar" style={{width: '0%'}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
                        </div>
                    </div>

                    <div className="text-center">
                        <div className="d-flex align-items-center justify-content-center">

                            <div className="d-grid col-sm-12">
                                <button className="btn btn-primary" onClick={uploadFile}>
                                    <i className="mdi mdi-file-upload"></i> Upload
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="manualAdd">
                    <div className="text-end">
                        <button className="btn btn-primary" onClick={batchUpload}><i className="mdi mdi-cloud-upload"></i> Batch Upload</button>
                    </div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <td>Student Id</td>
                                <td>Student Name</td>
                                <td>Obtained Marks</td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Usama Ayaz</td>
                                <td><input type="text" className="form-control" /></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        </>
    )
}

export default Class
