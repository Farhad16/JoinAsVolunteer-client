import React, { useContext, useEffect, useState } from 'react';
import Sidebar from '../../Shared/Sidebar/Sidebar';

import DisplayRegisterEvent from '../DisplayRegisterEvent/DisplayRegisterEvent';
import { UserContext } from '../../../App';


const VolunteerAlreadyRegister = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [serviceData, setServiceData] = useState([]);

    const [email, setEmail] = useState(loggedInUser.email);

    useEffect(() => {
        fetch(`https://dry-bastion-62808.herokuapp.com/orders/${email}`)
            .then(res => res.json())
            .then(data => setServiceData(data));
    }, [])

    return (
        <div className="rightSide">
            <div className="row">
                <div className="col-md-2">
                    <Sidebar></Sidebar>
                </div>
                <div className="col-md-10">
                    <nav className="navbar mr-auto d-flex justify-content-between">
                        <p className="orderTitle">Order List</p>
                        <p className="customerName">{loggedInUser.displayName}</p>
                    </nav>
                    <div className="order-form">
                        <div className="pb-5">
                            <div className="row p-5">
                                {
                                    serviceData.length ? serviceData.map((service, i) => <DisplayRegisterEvent key={i} service={service}></DisplayRegisterEvent>)
                                        : <div className="col-md-12 d-flex justify-content-center">
                                            <span className="mr-3">Loading...</span>
                                            <div className="spinner-border" role="status">
                                                <span className="sr-only text-dark">Loading...</span>
                                            </div>
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VolunteerAlreadyRegister;