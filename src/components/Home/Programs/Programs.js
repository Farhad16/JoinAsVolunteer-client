import React, { useEffect, useState } from 'react';
import Program from '../Program/Program';
import './Programs.css'
import { useForm } from 'react-hook-form';
import axios from 'axios';


const Programs = () => {
	const [programs, setPrograms] = useState([]);

	const { handleSubmit, register } = useForm();
	const [search, setSearch] = useState('');
	const [message, setMessage] = useState('');
	const [isLoading, setIsLoading] = useState(true);


	useEffect(() => {
		axios.get('http://localhost:5000/programs', {
			params: {
				keyword: search
			}
		})
			.then(response => {
				if (response) {
					setPrograms(response.data)
					setIsLoading(false)
				} else {
					setMessage('No result found')
				}

			})
	}, [search])


	const handleSeacrh = (e) => {
		setSearch(e.target.value);
	}



	return (
		<section className="programs justify-content-center" id="programs">
			<h2 className="font-weight-bold text-center pt-5">We arrange different <span style={{ color: '#7AB259' }}>programs</span></h2>
			<div className="d-flex justify-content-center pt-5">
				<form className="form-inline">
					<input type="text" onChange={handleSeacrh} className="form-control mr-sm-2" placeholder="Search Program..." />
				</form>
			</div>

			<div className="d-flex justify-content-center">
				<div className="max-width row my-5">
					{
						isLoading ?
							<div className="col-md-12 d-flex justify-content-center">
								<div className="spinner-border" role="status">
									<span className="sr-only">Loading...</span>
								</div>
							</div>
							: programs.map((program) => <Program key={program._id} program={program}></Program>)
					}
				</div>
			</div>
		</section>

	);
};

export default Programs;