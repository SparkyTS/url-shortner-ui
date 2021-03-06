import React from "react";
import {Redirect, Route, withRouter} from "react-router-dom";

import {getAccessTokenCookie} from "../utils/tokenHandler";
import Topbar from "../../app/header/Topbar";

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
    const isLoggedIn = getAccessTokenCookie()
    return (
        <Route
            {...rest}
            render={(props) => {
                if (!isLoggedIn) {
                    return <Redirect to="/auth" />;
                }
                // authorised so return component
                return <>
                    <Topbar/>
                    <div className={"container__wrap"}>
                        <Component {...props} />
                    </div>
                </>
            }}
        />
    );
};

export default withRouter(PrivateRoute);
