import React, { createContext, useEffect, useState } from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './components/Home/Home/Home';
import VolunteerRegister from './components/CustomerDashboard/VolunteerRegister/VolunteerRegister';
import VolunteerAlreadyRegister from './components/CustomerDashboard/VolunteerAlreadyRegister/VolunteerAlreadyRegister';
import AdminControlServices from './components/AdminDashboard/AdminControlPrograms/AdminControlPrograms';
import AddService from './components/AdminDashboard/AddProgram/AddProgram';
import MakeAdmin from './components/AdminDashboard/MakeAdmin/MakeAdmin';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import NotFound from './components/NotFound/NotFound';
import Login from './components/Login/Login';
import AccessPurposeAdmin from './components/AdminDashboard/AccessPurposeAdmin/AccessPurposeAdmin';
import Navbar from './components/Home/Navbar/Navbar';
import axios from 'axios';
import AdminAlert from './components/AdminDashboard/AdminAlert/AdminAlert';


export const UserContext = createContext()

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const email = loggedInUser.email;


  useEffect(() => {
    axios.get(`http://localhost:5000/isAdmin/${email}`)
      .then(response => {
        console.log(response);
        if (response.data.length > 0) {
          setIsAdmin(true);
        }
      })
      .catch(function (error) {
        console.log(error);
      })
  }, [email]);

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Navbar></Navbar>
        <Switch>
          <Route exact path={["/home", "/"]}>
            <Home></Home>
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/volunteer/register">
            {
              isAdmin ?
                < AdminAlert />
                :
                <VolunteerRegister />

            }

          </PrivateRoute>

          <PrivateRoute path="/dashboard">
            {
              isAdmin ?
                < AdminControlServices />
                :
                <VolunteerAlreadyRegister />

            }
          </PrivateRoute>
          <PrivateRoute path="/view/registration">
            <VolunteerAlreadyRegister />
          </PrivateRoute>
          <PrivateRoute path="/admin/controlService">
            <AdminControlServices />
          </PrivateRoute>
          <PrivateRoute path="/admin/addService">
            <AddService></AddService>
          </PrivateRoute>
          <PrivateRoute path="/admin/makeAdmin">
            <MakeAdmin></MakeAdmin>
          </PrivateRoute>

          <Route path="/accessAdmin">
            <AccessPurposeAdmin></AccessPurposeAdmin>
          </Route>
          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider >
  );
}

export default App;
