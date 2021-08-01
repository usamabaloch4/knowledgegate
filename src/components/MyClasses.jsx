import React from 'react'

const Classes = () => {
    const data = [
        [1, "Class 1", ["Physics", "Chemistry", "Maths"],  "10"],
        [2, "Class 2", ["Physics"],  "50"],
        [3, "Class 3", ["English", "Chemnistry"],  "30"],
    ];

    return (
        <>
        <div className="page-title">
        <h4 className="">Classes</h4>
        <small>
            <i className="mdi mdi-home"></i> Home <i className="mdi mdi-menu-right"></i>
            <i className="mdi mdi-bank-check"></i> Classes 
             </small>
        </div>
        
        <div className="card">
            <div className="card-header">
                <h5>My Classes</h5>
            </div>
            <div className="card-body">
               {data.map((row) => (
                   <div className="media mb-20 bb1 pad-v-15">
                       <h3 className="mb-0 pad-0"><i className="mdi mdi-bank-check"></i> {row[1]} <br/></h3>
                       <i className="mdi mdi-book-open-page-variant"></i>
                           {row[2].map((sub) => 
                            <span> {sub}, </span>
                           )}
                        <div className="clearfix"></div>
                   </div>
               ))}
            </div>
        </div>


        </>
    )
}

export default Classes
