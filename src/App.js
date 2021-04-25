import React, { Component} from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
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
