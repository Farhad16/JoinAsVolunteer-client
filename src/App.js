import React, { createContext, useEffect, useState } from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './components/Home/Home/Home';
import CustomerOrder from './components/CustomerDashboard/VolunteerRegister/VolunteerRegister';
import CustomerServiceList from './components/CustomerDashboard/VolunteerAlreadyRegister/VolunteerAlreadyRegister';
import AdminControlServices from './components/AdminDashboard/AdminControlServices/AdminControlServices';
import AddService from './components/AdminDashboard/AddService/AddService';
import MakeAdmin from './components/AdminDashboard/MakeAdmin/MakeAdmin';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import NotFound from './components/NotFound/NotFound';
import Login from './components/Login/Login';
import AccessPurposeAdmin from './components/AdminDashboard/AccessPurposeAdmin/AccessPurposeAdmin';
import Navbar from './components/Home/Navbar/Navbar';


export const UserContext = createContext()

function App() {
  const [loggedInUser, setLoggedInUser] = useState({
    title: ''
  });

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
            <CustomerOrder />
          </PrivateRoute>
          <PrivateRoute path="/view/registration">
            <CustomerServiceList />
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
    </UserContext.Provider>
  );
}

export default App;
