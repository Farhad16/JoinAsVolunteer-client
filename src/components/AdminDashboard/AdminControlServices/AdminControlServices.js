import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../App';
import Sidebar from '../../Shared/Sidebar/Sidebar';
import DisplayCustomerService from '../DisplayCustomerService/DisplayCustomerService';
import './AdminControlServices.css';


const AdminControlServices = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [serviceList, setServiceList] = useState([])
    const [email, setEmail] = useState(loggedInUser.email);

    useEffect(() => {
        fetch(`https://dry-bastion-62808.herokuapp.com/orders/${email}`)
            .then(res => res.json())
            .then(data => setServiceList(data));
    }, [email])


    return (
        <div className="rightSide">
            <div className="row">
                <div className="col-md-3">
                    <Sidebar></Sidebar>
                </div>
                <div className="col-md-9">
                    <nav className="navbar mr-auto d-flex justify-content-between">
                        <p className="orderTitle font-weight-bold">Service List</p>
                        <p className="customerName">{loggedInUser.displayName}</p>
                    </nav>

                    <div className="customerList p-3">
                        <div className="bg-white overflow-auto m-3 p-5">
                            <table className="table-style table table-borderless">
                                <thead>
                                    <tr className="backColor">
                                        <th scope="col">Name</th>
                                        <th scope="col">Email ID</th>
                                        <th scope="col">Service</th>
                                        <th scope="col">Project Details</th>
                                        <th scope="col" className="pl-3">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        serviceList.length ? serviceList.map((service, i) => <DisplayCustomerService key={i} service={service} ></DisplayCustomerService>)
                                            : <div className="col-md-12 d-flex justify-content-center">
                                                <div className="mr-3">Loading...</div>
                                                <span className="spinner-border" role="status">
                                                    <span className="sr-only text-dark">Loading...</span>
                                                </span>
                                            </div>

                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default AdminControlServices;