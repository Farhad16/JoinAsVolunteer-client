import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import AdminSidebar from '../../Shared/Sidebar/AdminSidebar';
import './AddProgram.css';


const AddProgram = () => {
    const [serviceInfo, setServiceInfo] = useState({});
    const [file, setFile] = useState(null);

    const handleBlur = (e) => {
        const newInfo = { ...serviceInfo }
        newInfo[e.target.name] = e.target.value;
        setServiceInfo(newInfo)
    }

    const handleFileChange = (e) => {
        const newFile = e.target.files[0];
        setFile(newFile)
    }

    const handleSubmit = (e) => {
        const formData = new FormData()
        formData.append('file', file);
        formData.append('title', serviceInfo.title);
        formData.append('description', serviceInfo.description);

        fetch('https://dry-bastion-62808.herokuapp.com/addService', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    alert("Service added successfully")
                }
            })
            .catch(error => {
                console.error(error)
            })
    }

    return (
        <div className="rightSide">
            <div className="row">
                <div className="col-md-3">
                    <AdminSidebar></AdminSidebar>
                </div>
                <div className="col-md-9">
                    <nav className="navbar mr-auto d-flex justify-content-between">
                        <p className="orderTitle font-weight-bold">Service List</p>
                        <p className="customerName">Customer Name</p>
                    </nav>

                    <div className="customerList p-3 pb-5 h-100">
                        <form action="" onSubmit={handleSubmit}>
                            <div className="bg-white m-3 p-5">
                                <label htmlFor="" className="mb-3">
                                    Service Title <br />
                                    <input type="text" name="title" placeholder="Enter title" onBlur={handleBlur} className="addServiceInput titleInput pl-2 mt-2 mr-5" /><br />
                                </label>
                                <label htmlFor="file-upload" className="custom-file-upload">
                                    <FontAwesomeIcon icon={faCloudUploadAlt} /> <span>Upload Image</span>
                                </label> <br />
                                <input id="file-upload" onChange={handleFileChange} type="file" />

                                <label htmlFor="">
                                    Description <br />
                                    <input type="text" name="description" onBlur={handleBlur} placeholder="Enter description" className="addServiceInput decription-padding pl-2 mb-3" /><br />
                                </label>
                            </div>
                            <button className="btn btn-success btn-submit mr-3 mb-5" type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default AddProgram;