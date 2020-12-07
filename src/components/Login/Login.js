import React, { useContext } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import './Login.css'
import logo from '../images/logos/logo.png'
import google from '../images/logos/googleLogo.png'
import { Link, useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';


// firebase.initializeApp(firebaseConfig);

const Login = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const googleSignIn = () => {

        if (firebase.apps.length === 0) {
            firebase.initializeApp(firebaseConfig);
        }

        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(result => {
                setLoggedInUser(result.user);
                storeAuthToken();
            }).catch(error => {
                console.log(error.message);
            });
    }

    const storeAuthToken = () => {
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
            .then(function (idToken) {
                sessionStorage.setItem('token', idToken);
                history.replace(from);
            }).catch(function (error) {
                // Handle error
            });
    }


    return (
        <div className="loginSection row">
            <div className="login text-center col-md-12">
                <Link to="/"><img src={logo} alt="" /></Link>
                <div className="loginForm">
                    <div className="google">
                        <h5>Login With</h5>
                        <button onClick={googleSignIn}><img src={google} alt="" />Continue with Google</button>
                        <p>Dont't have an account? <a href="https://accounts.google.com/signup/v2/webcreateaccount?hl=en&flowName=GlifWebSignIn&flowEntry=SignUp" target="_blank">Create an account</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;