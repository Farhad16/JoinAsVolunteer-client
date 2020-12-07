import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../../App';
import Sidebar from '../../Shared/Sidebar/Sidebar';
import './VolunteerRegister.css'


const VolunteerRegister = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const [eventRegister, setEventRegister] = useState({});

    const { handleSubmit, register, errors } = useForm();

    const [event, setEvent] = useState({
        date: '',
    });


    const currentTime = new Date().toDateString().slice(4, 16)
    event.date = currentTime;

    const handleBlur = (e) => {
        const newInfo = { ...eventRegister, ...loggedInUser }
        newInfo[e.target.name] = e.target.value;
        setEventRegister(newInfo)
    }

    const onSubmit = (data, e) => {
        fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(eventRegister)

        }).then(res => res.json())
            .then(result => {
                if (result) {
                    alert("Event Registered successfully");
                    e.target.reset();
                }
            })
    }


    return (
        <div className="row mt-3">
            <div className="col-md-3">
                <Sidebar></Sidebar>
            </div>
            <div className="register-form col-md-9">
                <div className="pt-3 d-flex justify-content-between px-5">
                    <p className="orderTitle">Register As Volunteer</p>
                    <p className="customerName">{loggedInUser.displayName}</p>
                </div>
                <div className="row p-5">
                    <div className="col-md-8 text-white">
                        <form action="" onSubmit={handleSubmit(onSubmit)}>
                            <input type="text" name="name" placeholder="Name" defaultValue={loggedInUser.displayName} onBlur={handleBlur} className="input-field mb-3" required /><br />
                            <input type="text" name="email" placeholder="Email" defaultValue={loggedInUser.email} onBlur={handleBlur} className="input-field mb-3" required /><br />
                            <input type="text" name="eventName" placeholder="Event Name" defaultValue={loggedInUser.title} onBlur={handleBlur} className="input-field mb-3" required /><br />
                            <input type="text" name="date" placeholder="Date" defaultValue={event.date} onBlur={handleBlur} className="input-field mb-3" required /><br />
                            <input type="text" name="phone" placeholder="Phone" onBlur={handleBlur} className="input-field mb-3" required /><br />
                            <input type="Address" name="address" placeholder="Address" onBlur={handleBlur} className="input-field mb-3" required /><br />
                            <button className="btn btn-outline-success mt-2" type="submit">Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VolunteerRegister;