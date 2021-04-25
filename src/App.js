import React, { Component, Fragment  } from "react";
import { connect, Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Loading from "./shared/components/MyLoader";
import Routes from "./Routes";
import store from "./redux/store";

class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <BrowserRouter basename="/">
                    <Routes />
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
