import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../App';
import './Program.css'


const Program = ({ program }) => {
	const [loggedInUser, setLoggedInUser] = useContext(UserContext);
	const { name, title, img, image, area } = program;

	const setId = (title, img, image) => {
		loggedInUser.title = title;
		loggedInUser.img = img;
		loggedInUser.image = image;
	}

	return (
		<div className="col-md-4 col-sm-6 col-12 col-lg-4">
			<div className="program p-3 h-100">
				<Link to="volunteer/register" onClick={() => setId(title, img, image)}>
					<div className="m-3">
						{
							image ? <img className="img-style" src={`data:image/png;base64,${image.img}`} alt="" />
								:
								<img className="img-style" src={require(`../../images/${img}`)} alt="" />
						}
					</div>
					<div className="m-3">
						<h3 className="my-2 text-success">{name}</h3>
						<h6 className="my-2 text-dark">{title}</h6>
						<p className="my-2 text-dark ">
							<small className="font-weight-bold">
								Volunteer Location:{" "}
								{
									area.map((area, i) => <span key={i}>{area}{", "}</span>)
								}
							</small>
						</p>
						<button className="btn btn-success" onClick={() => setId(title, img, image)}>Register</button>
					</div>
				</Link>
			</div>
		</div>
	);
};

export default Program;