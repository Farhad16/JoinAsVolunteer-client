import React from 'react';
import './DisplayRegisterEvent.css';


const DisplayRegisterEvent = ({ program, handleCancelRegistration }) => {
    const { title, image, status, img, _id, cancel } = program;

    return (
        <div className="col-md-4 mb-5">
            <div className="card program-list mb-3 h-100" style={{ maxWidth: "18rem" }}>
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        {
                            image
                                ? <img className="mr-3" src={`data:image/png;base64,${image.img}`} alt="not found" width="100%" height="150px" />
                                : <img className="mr-3" src={require(`../../images/${img}`)} alt="not found" width="100%" height="150px" />
                        }
                    </div>
                    <h6 className="card-text mt-2"> <span className="text-success">Program:</span> {title}</h6>
                    <p className="mt-3 d-flex justify-content-between">
                        <small className="font-weight-bold mr-3">Register Status: </small>
                        {
                            <small className={status === 'Pending' ? "pending  px-3 py-2" : (status === 'Done' ? "done px-3 py-2" : "cancel px-3 py-2")}>
                                {
                                    <span className={status === 'Cancelled' ? "cancelled" : ""}>{status}</span>
                                }
                            </small>
                        }
                    </p>
                    {
                        status === 'Done' ? " "
                            : <button className="btn btn-warning" onClick={() => handleCancelRegistration(_id)}>Remove</button>
                    }
                </div>
            </div>
        </div>
    );
};

export default DisplayRegisterEvent;