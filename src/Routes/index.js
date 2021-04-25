import React, {Suspense} from "react";
import {Redirect, Switch, Route, BrowserRouter} from "react-router-dom";
import AuthPage from "../container/auth/AuthPage";
import Dashboard from "../container/dashboard";
import Loading from "../shared/components/MyLoader";
import PrivateRoute from "../shared/components/PrivateRoute";
// const UserProfilepage = lazy(() =>
//     import("./modules/UserProfile/UserProfilePage")
// );
export function Routes() {
    return (
        <Suspense fallback={<Loading/>}>
                <Switch>
                    <Route path="/auth" component={AuthPage}/>
                    <PrivateRoute path="/dashboard" component={Dashboard}/>
                    <Redirect exact from="/" to="/dashboard"/>
                </Switch>
        </Suspense>
    );
}

export default Routes;
