import React from 'react';
import './DisplayRegisterEvent.css'

const DisplayRegisterEvent = ({ service }) => {
    const { orderName, projectDetails, image, status } = service;

    return (
        <div className="col-md-4 mb-5">
            <div className="card order-list mb-3 h-100" style={{ maxWidth: "18rem" }}>
                <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                        <img className="rounded-circle mr-3" src={`data:image/png;base64,${image.img}`} alt="" width="50px" height="50px" />
                        <h6 className="mr-3"><small className={status === 'Pending' ? "pending  px-3 py-2" : (status === 'Done' ? "done px-3 py-2" : "onGoing px-3 py-2")}>{status}</small></h6>
                    </div>
                    <h5 className="card-text">{orderName}</h5>
                    <p className="card-text"><small>{projectDetails}</small> </p>
                </div>
            </div>
        </div>
    );
};

export default DisplayRegisterEvent;