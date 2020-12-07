import React from 'react';
import './DisplayCustomerService.css'

const DisplayCustomerService = ({ service, i }) => {
    const { name, orderName, projectDetails, email, status, _id } = service;

    const handleChangeStatus = (e, id) => {
        const status = { status: e.target.value }

        fetch(`https://dry-bastion-62808.herokuapp.com/updateStatus/${id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(status)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
    }

    return (
        <tr>
            <td>{name}</td>
            <td>{email}</td>
            <td>{orderName}</td>
            <td>{projectDetails}</td>
            <td className="pl-3">
                {
                    status === 'Pending' ?
                        <select className="form-control text-danger border-0" onChange={(event) => { handleChangeStatus(event, _id) }}>
                            <option className="status-pending" value={status}>{status}</option>
                            <option className="status-ongoing" value="On going">On going</option>
                            <option className="status-done" value="Done">Done</option>
                        </select>
                        : (
                            status === 'Done' ? <select className="form-control text-success border-0" onChange={(event) => { handleChangeStatus(event, _id) }}>
                                <option className="status-done" value={status}>{status}</option>
                                <option className="status-ongoing" value="On going">On going</option>
                                <option className="status-pending" value="Pending">Pending</option>
                            </select>
                                :
                                <select className="form-control text-warning border-0" onChange={(event) => { handleChangeStatus(event, _id) }}>
                                    <option className="status-ongoing" value={status}>{status}</option>
                                    <option className="status-pending" value="Pending">Pending</option>
                                    <option className="status-done" value="Done">Done</option>
                                </select>
                        )
                }
            </td>
        </tr>
    );
};

export default DisplayCustomerService;