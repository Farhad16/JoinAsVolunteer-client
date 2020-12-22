import React, { createContext, useEffect, useState } from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './components/Home/Home/Home';
import AdminControlRegistration from './components/AdminDashboard/AdminControlRegistration/AdminControlRegistration';
import AddService from './components/AdminDashboard/AddProgram/AddProgram';
import MakeAdmin from './components/AdminDashboard/MakeAdmin/MakeAdmin';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import NotFound from './components/NotFound/NotFound';
import Login from './components/Login/Login';
import Navbar from './components/Home/Navbar/Navbar';
import axios from 'axios';
import Alert from './components/AdminDashboard/Alert/Alert';
import VolunteerRegister from './components/VolunteerDashboard/VolunteerRegister/VolunteerRegister';
import VolunteerAlreadyRegister from './components/VolunteerDashboard/VolunteerAlreadyRegister/VolunteerAlreadyRegister';
import AdminControlProgram from './components/AdminDashboard/AdminControlProgram/AdminControlProgram';
import Programs from './components/Home/Programs/Programs';
import Footer from './components/Home/Footer/Footer';
import ScrollToTop from "react-scroll-to-top";

export const UserContext = createContext()

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [admin, setAdmin] = useState(false);
  const email = loggedInUser.email;

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    axios.get(`http://localhost:5000/isAdmin/${email}`)
      .then(response => {
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
        <ScrollToTop smooth color='#ffffff' fontWeight='bold' />
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
                < AdminControlRegistration />
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
          <PrivateRoute path="/admin/controlVolunteer/registraion">
            {
              admin ?
                <AdminControlRegistration />
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
          <PrivateRoute path="/admin/control/programs">
            {
              admin ?
                <AdminControlProgram />
                : <Alert />

            }
          </PrivateRoute>
          <Route path="/accessAdmin">
            <MakeAdmin />
          </Route>
          <Route path="/programs">
            <Programs />
          </Route>
          <Route path="/contact">
            <Footer />
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
