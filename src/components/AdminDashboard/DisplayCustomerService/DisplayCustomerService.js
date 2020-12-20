import React from 'react';

const DisplayCustomerService = ({ register, handleChangeStatus, handleDeleteRegistration }) => {
	const { title, displayName, email, status, _id } = register;




	return (
		<tr>
			<td>{displayName}</td>
			<td>{email}</td>
			<td>{title}</td>
			<td className="pl-3">
				{
					status === 'Pending' ?
						<select className="form-control text-info border-0" onChange={(event) => { handleChangeStatus(event, _id) }}>
							<option value={status}>{status}</option>
							<option value="Cancelled">Cancel</option>
							<option value="Done">Done</option>
						</select>
						: (
							status === 'Done' ? <select className="form-control text-info border-0" onChange={(event) => { handleChangeStatus(event, _id) }}>
								<option value={status}>{status}</option>
								<option value="Cancelled">Cancel</option>
								<option value="Pending">Pending</option>
							</select>
								:
								<select className="form-control text-info border-0" onChange={(event) => { handleChangeStatus(event, _id) }}>
									<option value={status}>{status}</option>
									<option value="Pending">Pending</option>
									<option value="Done">Done</option>
								</select>
						)
				}
			</td>
			<td>
				<button className="btn btn-danger" onClick={() => { handleDeleteRegistration(_id) }}>Delete</button>
			</td>
		</tr>
	);
};

export default DisplayCustomerService;