import React, {useState, useEffect} from 'react'
import avatar from "../images/avatar.png";
import axios from "axios";

const BroadCastMsg = ({uid, baseUrl}) => {

    const [subList, setSubList] = useState([]);

    useEffect(() => {
        axios.get(baseUrl+"/subject/dropdownforteacher/"+uid).then(response => {
            setSubList(response.data);
        });
    }, []);


    const broadCast = (e) => {
        e.preventDefault();

        var groupid = document.getElementById("broadcastgroup").value;
        var msg = document.getElementById("broadcastmsg").value;

        axios.post(baseUrl+"/message/broadcast", {'from': uid, 'to': groupid, 'msg': msg}).then(response => {
            if(response.data.status === "success")
            {
                document.getElementById('closebc').click();
            }
        });
    }


    return (
        <>
            <div class="modal fade" id="broadcastModal" tabindex="-1">
            <div class="modal-dialog modal-md">
                <form method="post" action="" onSubmit={broadCast}>
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Broadcast Message</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div className="row">
                            <div className="col-sm-12">
                                <select name="" id="broadcastgroup" className="form-control">
                                    <option value="">--- Select Subject ---</option>
                                    {subList.length > 0 ? subList.map((row) => (
                                        <option value={row[0]}>{row[1]}</option>
                                    )) : ''}
                                </select>
                                <br/>
                            </div>
                            <div className="col-sm-12">
                                <textarea name="" id="broadcastmsg" className="form-control" placeholder="Enter Your Message Here..." rows="3"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" id="closebc" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary">Send Message</button>
                    </div>
                    </div>
                </form>
            </div>
            </div>
        </>
    )
}

export default BroadCastMsg
