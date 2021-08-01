import React, {useState, useEffect} from 'react'
import avatar from "../images/avatar.png";
import axios from "axios";
import BroadCastMsg from './BroadCastMsg';
import "../css/chat.css";
const Messages = ({baseUrl, loggedId, loggedType}) => {
    const [recipients, setRecipients] = useState([]);
    const [pageUpdate, setPageUpdate] = useState([]);
    const [chat, setChat] = useState(['loading']);
    const roles = ['', 'Admin', 'Teacher', 'Student'];

    const [activeRecipient, setActiveRecipient] = useState({});

    useEffect(() => {
        axios.get(baseUrl+"/message/getrecipients/"+loggedId).then(response => {
            setRecipients(response.data);
            setActiveRecipient(response.data[0]);
        });
    }, [pageUpdate]);

    const getChat = (index) => {
        setChat(['loading']);
        setActiveRecipient(recipients[index]);
        axios.get(baseUrl+"/message/getchat/"+loggedId+"/"+recipients[index].id).then(response => {
            setChat(response.data);
            
            var oldrcps = [...recipients];
            oldrcps[index].unread = 0;
            setRecipients(oldrcps);
            console.log(response.data);
        });
    }
    const refreshChat = () => {
        axios.get(baseUrl+"/message/getchat/"+loggedId+"/"+ activeRecipient.id).then(response => {
            setChat(response.data);
        });
    }

    const sendMsg = (e) =>
    {
        e.preventDefault();
        var msgbox = document.getElementById("msg_text");

        axios.post(baseUrl+"/message/create", {'from': loggedId, 'to': activeRecipient.id, 'msg': msgbox.value}).then(response => {
            if(response.data.status === "success")
            {
                msgbox.value = "";
                refreshChat();
            }
        });
    }

    return (
        <>
        <div className="page-title">
        <h4 className="">Messages</h4>
        <small>
            <i className="mdi mdi-home"></i> Home <i className="mdi mdi-menu-right"></i>
            <i className="mdi mdi-chat"></i> Messages 
             </small>
        </div>
        
        <div className="card pad-0">
            <div className="card-body pad-0 d-flex">
                <div className="card-sidebar">
                    {/* <div className="d-grid">
                        <button className="btn btn-primary"><i className="mdi mdi-chat"></i> Write New</button>
                    </div> 
                    <br/>*/}
                    <h5>Receipents 
                        <button className="ico-btn text-primary float-end" data-bs-toggle="modal" data-bs-target="#broadcastModal">
                            <i className="mdi mdi-broadcast"></i> </button>
                    </h5>
                    <hr/>

                    <div className="msg-search">
                        <input type="text" className="form-control" placeholder="Search Uername..."/>
                        <button><i className="mdi mdi-magnify"></i></button>
                    </div>
                    

                    <div className="msg-recipients">
                        {recipients.length > 0 ? recipients.map((row, index) => (
                            <div className={`mr-person `+ (row.unread > 0 ? 'unread' : '')} onClick={() => getChat(index)}>
                                <img src={avatar} alt=""/>
                                <h6>
                                    {row.fullname}
                                    <small>{roles[row.role]}</small>
                                </h6>
                                <div className="count">
                                    {row.unread > 0 ?
                                    <span className="badge badge-primary">{row.unread}</span>
                                    :''}
                                </div>
                            </div>
                        )) : 'test'}
                    </div>
                </div>
                <div className="card-content">
                    <div className="rec-info">
                        <img src={avatar} alt=""/>
                        <h5>
                            {activeRecipient !== undefined ?  activeRecipient.fullname : ''}
                            <small>{roles[(activeRecipient !== undefined ?  activeRecipient.role : '')]}</small>
                        </h5>
                    </div>
                    <div className={`chat `+ ((chat.length === 0 || chat[0] === "loading") ? 'empty' : '')}>
                        {
                            chat[0] === "loading" ? <h1 className="chat-status">Loading Messages...</h1> :

                            chat.length === 0 ? <h1 className="chat-status">No Messages...</h1> :
                        chat.map((row, index) => 
                            <div className={`chat-item `+ (row.from === loggedId ? 'self' : '')}>
                                <img src={avatar} alt=""/>
                                <p>
                                    {row.message}
                                </p>
                            </div>
                        )}
                        
                    </div>
                    <div className="new-msg">
                        <form action="" method="post" onSubmit={sendMsg}>
                            <textarea name="" id="msg_text" className="form-control" placeholder="Enter your message here..."></textarea>
                            <button className="btn btn-primary">Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        {loggedType === 2 ? <BroadCastMsg baseUrl={baseUrl} uid={loggedId} /> : ''}
        
        </>
    )
}

export default Messages
