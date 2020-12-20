import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import AdminSidebar from '../../Shared/Sidebar/AdminSidebar';
import './AddProgram.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { UserContext } from '../../../App';


const AddProgram = () => {
	const [serviceInfo, setServiceInfo] = useState({});
	const [loggedInUser, setLoggedInUser] = useContext(UserContext);

	const [file, setFile] = useState(null);
	const { handleSubmit, register, errors } = useForm();

	const handleBlur = (e) => {
		const newInfo = { ...serviceInfo }
		newInfo[e.target.name] = e.target.value;
		setServiceInfo(newInfo)
	}

	const handleFileChange = (e) => {
		const newFile = e.target.files[0];
		setFile(newFile)
	}

	const onSubmit = (data, e) => {
		const formData = new FormData()
		formData.append('file', file);
		formData.append('title', serviceInfo.title);
		formData.append('description', serviceInfo.description);

		axios.post('http://localhost:5000/register', {
			eventRegister: formData
		}).then(response => {
			console.log(response);
			if (response.data === false) {
				alert("You are already registered");
				e.target.reset()
			} else {
				alert('Volunteer registration successfully done');
				e.target.reset()
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
				<div className="register-form scroll-bhave col-md-9">
					<div className="pt-3 d-flex justify-content-between px-5">
						<p className="orderTitle">Register As Volunteer</p>
						<p className="customerName">{loggedInUser.displayName}</p>
					</div>
					<div className="row p-5">
						<div className="col-md-8 text-white">
							<form action="" onSubmit={handleSubmit(onSubmit)}>
								<input type="text" name="name" placeholder="Program Name" onBlur={handleBlur} className="input-field mb-3" required /><br />
								<input type="text" name="title" placeholder="Program title" onBlur={handleBlur} className="input-field mb-3" required /><br />
								<input type="text" name="description" placeholder="Description" onBlur={handleBlur} className="input-field mb-3" required /><br />
								<input type="text" name="area" placeholder="please write this format- areaName1, areaName2 " onBlur={handleBlur} className="input-field mb-3" required /><br />
								<input type="text" name="address" placeholder="Address" onBlur={handleBlur} className="input-field mb-3" required /><br />
								<label className="text-dark">Select files: {" "}
									<input type="file" name="myfile" onChange={handleFileChange} />
								</label><br />
								<button className="btn btn-outline-success mt-2" type="submit">Register</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div >
	);
};

export default AddProgram;