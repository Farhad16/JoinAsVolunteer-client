import React, { useContext, useState } from 'react';
import AdminSidebar from '../../Shared/Sidebar/AdminSidebar';
import './AddProgram.css';
import { UserContext } from '../../../App';


const AddProgram = () => {
	const [programInfo, setProgramInfo] = useState({});
	const [loggedInUser, setLoggedInUser] = useContext(UserContext);

	const [file, setFile] = useState(null);

	const handleBlur = (e) => {
		const newInfo = { ...programInfo }
		newInfo[e.target.name] = e.target.value;
		setProgramInfo(newInfo)
	}


	const handleFileChange = (e) => {
		const newFile = e.target.files[0];
		console.log(newFile);
		setFile(newFile)
	}

	const handleSubmit = (e) => {
		const formData = new FormData()
		formData.append('file', file);
		formData.append('name', programInfo.name);
		formData.append('title', programInfo.title);
		formData.append('description', programInfo.description);
		formData.append('area', programInfo.area);

		fetch('http://localhost:5000/addProgram', {
			method: 'POST',
			body: formData
		})
			.then(response => response.json())
			.then(data => {
				if (data) {
					alert("Program added successfully");
					e.target.reset()
				}
			})
			.catch(error => {
				console.error(error)
			})

		e.preventDefault();
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
							<form action="" onSubmit={handleSubmit}>
								<input type="text" name="name" placeholder="Program Name" onBlur={handleBlur} className="input-field mb-3" required /><br />
								<input type="text" name="title" placeholder="Program title" onBlur={handleBlur} className="input-field mb-3" required /><br />
								<input type="text" name="description" placeholder="Description" onBlur={handleBlur} className="input-field mb-3" required /><br />
								<input type="text" name="area" placeholder="Write place name and give a comma between them" onBlur={handleBlur} className="input-field mb-3" required /><br />
								<label className="text-dark">Select an image: {" "}
									<input type="file" onChange={handleFileChange} />
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