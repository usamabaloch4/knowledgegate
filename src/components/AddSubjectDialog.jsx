import React, {useState, useEffect} from 'react'
import axios from 'axios';

const AddSubjectDialog = ({classid, pageUpdate, update, baseUrl}) => {

    const [formError, setFormError]     = useState([]);
    const [teachers, setTeachers]       = useState([]);

    useEffect(() => {
        axios.get(baseUrl+"/teachers").then(response => {
            setTeachers(response.data);
        });
    }, [1]);

    const addSubject = (e) => {
        e.preventDefault();

        var title =  document.getElementById("title").value;
        var teacherid =  document.getElementById("teacherid").value;

        axios.post(baseUrl+"/subject/create", {"classid": classid, "title": title, 'teacherid': teacherid})
            .then(response => {
                var rdata = response.data;
                if(rdata.status == 'error')
                {
                    setFormError(rdata.data);
                }
                else if(rdata.status == 'success')
                {
                    setFormError([]);
                    pageUpdate(update +1);
                    document.getElementById("mdlClose").click();
                    document.getElementById("classform").reset();

                }
        });
    }


    return (
        <div>
            <div className="modal fade" id="addSubjectModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Add New Subject</h5>
                        <button type="button" id="mdlClose" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {formError.length < 1 ? '' :
                            <div className="alert alert-danger">
                                {formError.title || formError.teacherid}
                            </div>
                        }
                        <form method="post" action="" onSubmit={addSubject} name="classform" id="classform">
                            <div className="mb-3 row">
                                <div className="col-sm-6">
                                    <label>Subject Title</label>
                                    <input type="text" id="title" className="form-control" />
                                </div>
                                <div className="col-sm-6">
                                    <label>Select Teacher</label>
                                    <select name="" id="teacherid" className="form-control">
                                        <option value="">------- Please Choose -------</option>
                                        {teachers.length < 1 ? "" : teachers.map((row) => 
                                            <option value={row.id}>{row.forename+ ' '+ row.surname}</option>
                                        )}
                                    </select>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" form="classform" onClick={addSubject} className="btn btn-primary">Save changes</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddSubjectDialog
