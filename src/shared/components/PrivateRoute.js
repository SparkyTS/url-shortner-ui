import React from "react";
import { Redirect, Route, withRouter } from "react-router-dom";

import {getAccessTokenCookie} from "../utils/tokenHandler";
import {useSelector} from "react-redux";

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
    const isLoggedIn = useSelector(({user}) => user.currentUser.name && getAccessTokenCookie())
    return (
        <Route
            {...rest}
            render={(props) => {
                if (!isLoggedIn) {
                    return <Redirect to="/auth" />;
                }
                // authorised so return component
                return <Component {...props} />;
            }}
        />
    );
};

export default withRouter(PrivateRoute);
