import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faListAlt, faHdd, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../../../App';


const Sidebar = () => {
    const location = useLocation();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    return (
        <aside className="sidebar d-flex flex-column justify-content-between pb-3 px-3">
            <ul className="list-unstyled">
                <div className="pt-5">
                    <li>
                        <Link to="/volunteer/register"
                            className={location.pathname === "/volunteer/register" ? "text-dark pl-3 active" : "text-dark pl-3"}
                        >
                            <FontAwesomeIcon icon={faShoppingCart} />{" "}<span>Register</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/view/registration"
                            className={(location.pathname === "/view/registration" || location.pathname === "/dashboard") ? "text-dark pl-3 active" : "text-dark pl-3"}
                        >
                            <FontAwesomeIcon icon={faHdd} />{" "}<span>Register Programs</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/customer/review"
                            className={location.pathname === "/customer/review" ? "text-dark pl-3 active" : "text-dark pl-3"}
                        >
                            <FontAwesomeIcon icon={faListAlt} />{" "}<span>Suggestions</span>
                        </Link>
                    </li>
                </div>
            </ul>
            <div className="pb-5">
                <Link to="/" className="ml-3" onClick={() => { setLoggedInUser({}); sessionStorage.clear() }}>
                    <FontAwesomeIcon icon={faSignOutAlt} />{" "}<span >Logout</span>
                </Link>
            </div>
        </aside>
    );
};

export default Sidebar;