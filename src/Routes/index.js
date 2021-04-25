import React, {lazy, Suspense} from "react";
import {Redirect, Switch, Route} from "react-router-dom";
import AuthPage from "../app/auth/AuthPage";
import Loading from "../shared/components/Loader";
import PrivateRoute from "../shared/components/PrivateRoute";

const DashBoardPage = lazy(() =>
    import("../app/dashboard")
);
export function Routes() {
    return (
        <Suspense fallback={<Loading/>}>
                <Switch>
                    <Route path="/auth" component={AuthPage}/>
                    <PrivateRoute path="/dashboard" component={DashBoardPage}/>
                    <Redirect exact from="/" to="/dashboard"/>
                </Switch>
        </Suspense>
    );
}

export default Routes;
