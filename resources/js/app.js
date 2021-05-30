require("./bootstrap");
import "antd/dist/antd.css";
import React, { useMemo } from "react";
import ReactDOM from "react-dom";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import "../sass/style.scss";
// pages
import { Auth, Signup } from "./pages";
// context
import { Global } from "./context/global";
//components
import { Header } from "./components";
var dom = document.getElementById("app");
const App = (props) => {
    return (
        <div className="app">
            <Router>
                <Global.Provider
                    value={useMemo(
                        () => ({ data: props.initial }),
                        [props.initial]
                    )}
                >
                    <Header />
                    <Switch>
                        <Route
                            exact
                            path="/"
                            component={() => (
                                <div className="home">Hello world</div>
                            )}
                        />
                        <Route exact path="/auth/login" component={Auth} />
                        <Route exact path="/auth/signup" component={Signup} />
                        <Redirect to="/" />
                    </Switch>
                </Global.Provider>
            </Router>
        </div>
    );
};
ReactDOM.render(<App initial={JSON.parse(dom.dataset.page)} />, dom);
