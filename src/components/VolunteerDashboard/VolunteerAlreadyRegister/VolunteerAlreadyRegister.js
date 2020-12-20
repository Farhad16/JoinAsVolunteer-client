import React, { useContext, useEffect, useState } from 'react';
import Sidebar from '../../Shared/Sidebar/Sidebar';
import axios from 'axios';
import DisplayRegisterEvent from '../DisplayRegisterEvent/DisplayRegisterEvent';
import { UserContext } from '../../../App';


const VolunteerAlreadyRegister = () => {
	const [loggedInUser, setLoggedInUser] = useContext(UserContext);
	const [registerData, setRegisterData] = useState([]);
	const [empty, setEmpty] = useState('');

	const email = loggedInUser.email;

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
		const url = `http://localhost:5000/deleteRegistration/${id}`
		axios.delete(url)
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
		<div className="row">
			<div className="col-md-3">
				<Sidebar></Sidebar>
			</div>
			<div className="scroll-bhave col-md-9">
				<div className="register-form">
					<div className="pb-5">
						<div className="row p-5">
							{
								registerData.length ? registerData.map((program, i) => <DisplayRegisterEvent key={i} program={program} handleCancelRegistration={handleCancelRegistration}></DisplayRegisterEvent>)
									: (
										empty ? <h4>You are not registered yet</h4> :
											<div className="col-md-12 d-flex justify-content-center">
												<span className="mr-3">Loading...</span>
												<div className="spinner-border" role="status">
													<span className="sr-only text-dark">Loading...</span>
												</div>
											</div>
									)
							}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default VolunteerAlreadyRegister;