import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../../App';
import jwt_decode from "jwt-decode";


const PrivateRoute = ({ children, ...rest }) => {
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

        return tokenSecret.email;
    }

    return (
        <Route
            {...rest}
            render={({ location }) =>
                (loggedInUser.email || isLoggedIn()) ? (
                    children
                ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location }
                            }}
                        />
                    )
            }
        />
    );
};

export default PrivateRoute;