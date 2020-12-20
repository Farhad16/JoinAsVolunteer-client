import React from 'react';
import './DisplayCustomerService.css'

const DisplayCustomerService = ({ register, handleCancelRegistration }) => {
    const { title, displayName, email, status, _id } = register;

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
            <td>{displayName}</td>
            <td>{email}</td>
            <td>{title}</td>
            <td className="pl-3">
                {
                    status === 'Pending' ?
                        <select className="form-control text-danger border-0" onChange={(event) => { handleChangeStatus(event, _id) }}>
                            <option className="status-pending" value={status}>{status}</option>
                            <option className="status-done" value="Done">Done</option>
                        </select>
                        :
                        <select className="form-control text-success border-0" onChange={(event) => { handleChangeStatus(event, _id) }}>
                            <option className="status-done" value={status}>{status}</option>
                            <option className="status-pending" value="Pending">Pending</option>
                        </select>

                }
            </td>
            <td>
                <button className="btn btn-warning" onClick={() => { handleCancelRegistration(_id) }}>Cancel</button>
            </td>
        </tr>
    );
};

export default DisplayCustomerService;