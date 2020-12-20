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
import Alert from './components/AdminDashboard/Alert/Alert';


export const UserContext = createContext()

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [admin, setAdmin] = useState(false);
  const email = loggedInUser.email;

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    axios.get(`http://localhost:5000/isAdmin/${email}`)
      .then(response => {
        console.log(response);
        if (response.data.length > 0) {
          setAdmin(true);
        }
      })
      .catch(function (error) {
        console.log(error);
      })
  }, [email, time])

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
              admin ?
                < Alert />
                :
                <VolunteerRegister />

            }

          </PrivateRoute>
          <PrivateRoute path="/dashboard">
            {
              admin ?
                < AdminControlServices />
                :
                <VolunteerAlreadyRegister />

            }
          </PrivateRoute>
          <PrivateRoute path="/view/registration">
            {
              admin ?
                < Alert />
                :
                <VolunteerAlreadyRegister />

            }
          </PrivateRoute>
          <PrivateRoute path="/admin/controlService">
            {
              admin ?
                <AdminControlServices />
                : <Alert />

            }
          </PrivateRoute>
          <PrivateRoute path="/admin/addService">
            {
              admin ?
                <AddService></AddService>
                : <Alert />

            }
          </PrivateRoute>
          <PrivateRoute path="/admin/makeAdmin">
            {
              admin ?
                <MakeAdmin />
                : <Alert />

            }
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
