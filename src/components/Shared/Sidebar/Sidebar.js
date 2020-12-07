import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faListAlt, faHdd, faUserPlus, faPlus, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import logo from '../../images/logos/logo.png'
import { UserContext } from '../../../App';

const Sidebar = () => {

    const location = useLocation();

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        fetch('https://dry-bastion-62808.herokuapp.com/isAdmin', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ email: loggedInUser.email })
        })
            .then(res => res.json())
            .then(data => {
                setIsAdmin(data);
            });
    }, [])

    return (
        <aside className="sidebar d-flex flex-column justify-content-between pb-3 px-3">
            <ul className="list-unstyled">
                <li>
                    <Link to="/home" className="text-dark sidebar-logo">
                        <img src={logo} alt="" width="150px" />
                    </Link>
                </li>

                {isAdmin ? <div>
                    <li>
                        <Link to="/admin/controlService"
                            className={location.pathname === "/admin/controlService" ? "text-dark pl-3 active" : "text-dark pl-3"}
                        >
                            <FontAwesomeIcon icon={faHdd} /> <span>Service list</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/admin/addService"
                            className={location.pathname === "/admin/addService" ? "text-dark pl-3 active" : "text-dark pl-3"}
                        >
                            <FontAwesomeIcon icon={faPlus} /> <span>Add Service</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/admin/makeAdmin"
                            className={location.pathname === "/admin/makeAdmin" ? "text-dark pl-3 active" : "text-dark pl-3"}
                        >
                            <FontAwesomeIcon icon={faUserPlus} /> <span>Make Admin</span>
                        </Link>
                    </li>
                </div> :
                    <div>
                        <li>
                            <Link to="/volunteer/register"
                                className={location.pathname === "/volunteer/register" ? "text-dark pl-3 active" : "text-dark pl-3"}
                            >
                                <FontAwesomeIcon icon={faShoppingCart} /> <span>Register</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/view/registration"
                                className={location.pathname === "/view/registration" ? "text-dark pl-3 active" : "text-dark pl-3"}
                            >
                                <FontAwesomeIcon icon={faHdd} /> <span>Register Programs</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/customer/review"
                                className={location.pathname === "/customer/review" ? "text-dark pl-3 active" : "text-dark pl-3"}
                            >
                                <FontAwesomeIcon icon={faListAlt} /> <span>Review</span>
                            </Link>
                        </li>
                    </div>
                }
            </ul>
            <div>
                <Link to="/" className="logout ml-3" onClick={() => { setLoggedInUser({}); sessionStorage.clear() }}><FontAwesomeIcon icon={faSignOutAlt} /> <span className="logout-text">Logout</span></Link>
            </div>
        </aside>
    );
};

export default Sidebar;