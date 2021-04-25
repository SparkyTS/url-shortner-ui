import React from "react";
import { Redirect, Route, withRouter } from "react-router-dom";

import {getAccessTokenCookie} from "../utils/tokenHandler";

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
    // const user_role = "any"
    const isLoggedIn = false;
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
