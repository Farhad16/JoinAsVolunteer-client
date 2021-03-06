import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../App';
import './Navbar.css';
import jwt_decode from "jwt-decode";



const Navbar = () => {
	const [loggedInUser, setLoggedInUser] = useContext(UserContext);

	const isLoggedIn = () => {
		const token = sessionStorage.getItem('token');
		if (!token) {
			return false;
		}
		const decodedToken = jwt_decode(token);

		const tokenSecret = { ...loggedInUser };
		tokenSecret.email = decodedToken.email;
		tokenSecret.displayName = decodedToken.name;
		tokenSecret.photoURL = decodedToken.picture;

		setLoggedInUser(tokenSecret)

		return loggedInUser.email;
	}


	return (
		<div className="navColor sticky-top">
			<nav className="navbar navbar-expand-lg navbar-light">
				<Link className="navbar-brand" to=""><span className="name">Volunt</span><span className="angle name">eer</span> </Link>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav ml-auto">
						<li className="nav-item">
							<a href="/" className="nav-link" >Home</a>
						</li>
						<li className="nav-item">
							<Link to="/dashboard" className="nav-link">Dashboard</Link>
						</li>
						<li className="nav-item">
							<a href="/programs" className="nav-link">Programs</a>
						</li>

						<li className="nav-item">
							<a href="/contact" className="nav-link">Contact Us</a>
						</li>

						{
							loggedInUser.email || isLoggedIn() ?
								<li className="nav-item">
									<Link to="/login" onClick={() => { setLoggedInUser({}); sessionStorage.clear() }} className="nav-link">Logout</Link>
								</li>

								:
								<li className="nav-item">
									<Link to="/login" className="nav-link">Login</Link>
								</li>
						}

						{
							loggedInUser.photoURL &&
							<li className="nav-item">
								<img className="rounded-circle" src={loggedInUser.photoURL} width="40px" height="40px" alt="" />
							</li>
						}

						<li className="nav-item">
							<a href="/accessAdmin" className="nav-link adminText">Admin</a>
						</li>

					</ul>
				</div>
			</nav >
		</div>
	);
};

export default Navbar;