import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHdd, faUserPlus, faPlus, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../../../App';

const AdminSidebar = () => {
  const location = useLocation();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);


  return (
    <aside className="sidebar d-flex flex-column justify-content-between pb-3 px-3">
      <ul className="list-unstyled">
        <div className="pt-5">
          <li>
            <Link to="/admin/controlService"
              className={(location.pathname === "/admin/controlService" || location.pathname === "/dashboard") ? "text-dark pl-3 active" : "text-dark pl-3"}
            >
              <FontAwesomeIcon icon={faHdd} />{" "}<span>Control Panel</span>
            </Link>
          </li>

          <li>
            <Link to="/admin/addService"
              className={location.pathname === "/admin/addService" ? "text-dark pl-3 active" : "text-dark pl-3"}
            >
              <FontAwesomeIcon icon={faPlus} />{" "}<span>Add Program</span>
            </Link>
          </li>

          <li>
            <Link to="/admin/makeAdmin"
              className={location.pathname === "/admin/makeAdmin" ? "text-dark pl-3 active" : "text-dark pl-3"}
            >
              <FontAwesomeIcon icon={faUserPlus} />{" "}<span>Make Admin</span>
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

export default AdminSidebar;