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
import { Auth, Signup, Forgot, Reset, Settings, Users } from "./pages";
// context
import { Global } from "./context/global";
//components
import { Header } from "./components";
import Protected from "./components/protected";

import "moment/locale/mn";
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
                        <Route exact path="/auth/forgot" component={Forgot} />
                        <Route
                            path="/reset-password/([0-9a-z]{64}|[?0-9a-zA-Z=%.])"
                            component={Reset}
                        />
                        <Protected
                            exact
                            path="/settings"
                            component={Settings}
                        />
                        <Protected exact path="/admin/user" component={Users} />
                        <Redirect to="/" />
                    </Switch>
                </Global.Provider>
            </Router>
        </div>
    );
};
ReactDOM.render(<App initial={JSON.parse(dom.dataset.page)} />, dom);
