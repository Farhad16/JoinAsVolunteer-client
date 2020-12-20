import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../App';
import AdminSidebar from '../../Shared/Sidebar/AdminSidebar';
import DisplayCustomerService from '../DisplayCustomerService/DisplayCustomerService';
import './AdminControlPrograms.css';
import axios from 'axios';

const AdminControlServices = () => {
	const [loggedInUser, setLoggedInUser] = useContext(UserContext);
	const [registerData, setRegisterData] = useState([])

	const email = loggedInUser.email;

	const [empty, setEmpty] = useState('');
	const [requestData, setRequestData] = useState(new Date());


	useEffect(() => {
		axios.get(`http://localhost:5000/register/${email}`)
			.then(response => {
				if (response.data) {
					setRegisterData(response.data);
					setEmpty(response.data)
				} else {
					setEmpty('');
				}
			})
			.catch(function (error) {
				console.log(error);
			})
	}, [email, requestData]);


	const handleCancelRegistration = (id) => {
		const url = `http://localhost:5000/cancelRegistration/${id}`
		axios.patch(url)
			.then(response => {
				console.log(response);
				if (response.status === 200) {
					alert("Registration cancel successfully");
					setRequestData(new Date())
				}
			})
			.catch(function (error) {
				console.log(error);
			})
	}

	return (
		<div className="rightSide">
			<div className="row">
				<div className="col-md-3">
					<AdminSidebar></AdminSidebar>
				</div>

				<div className="scroll-bhave col-md-9">
					<div className="scroll-bhave overflow-auto fontSize">
						<table className="table-style table table-striped">
							<thead>
								<tr className="table-secondary">
									<th scope="col">Name</th>
									<th scope="col">Email ID</th>
									<th scope="col">Program Name</th>
									<th scope="col" className="pl-3">Status</th>
									<th scope="col" className="pl-3">Cancel</th>
								</tr>
							</thead>
							<tbody>
								{
									registerData.length ? registerData.map((register, i) =>
										< DisplayCustomerService key={i} register={register} handleCancelRegistration={handleCancelRegistration} />)
										: (
											empty ? <h4>There is no registered volunteer</h4> :
												<div className="col-md-12 d-flex justify-content-center">
													<span className="mr-3">Loading...</span>
													<div className="spinner-border" role="status">
														<span className="sr-only text-dark">Loading...</span>
													</div>
												</div>
										)
								}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminControlServices;