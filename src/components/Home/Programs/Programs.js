import React, { useEffect, useState } from 'react';
import Program from '../Program/Program';
import './Programs.css'

const Programs = () => {
	const [programs, setPrograms] = useState([]);

	useEffect(() => {
		fetch('http://localhost:5000/programs')
			.then(res => res.json())
			.then(data => setPrograms(data))
	}, [])

	return (
		<section className="programs justify-content-center" id="programs">
			<h2 className="font-weight-bold text-center pt-5">We arrange different <span style={{ color: '#7AB259' }}>programs</span></h2>
			<div className="d-flex justify-content-center pt-5">
				<form className="form-inline">
					<input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
					<button className="btn btn-outline-dark my-2 my-sm-0" type="submit">Search</button>
				</form>
			</div>
			<div className="d-flex justify-content-center">
				<div className="max-width row my-5">
					{
						programs.length ? programs.map((program) => <Program key={program._id} program={program}></Program>) :
							<div className="col-md-12 d-flex justify-content-center">
								<div className="spinner-border" role="status">
									<span className="sr-only">Loading...</span>
								</div>
							</div>
					}
				</div>
			</div>
		</section>

	);
};

export default Programs;