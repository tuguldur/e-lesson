import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { Global } from "@/context/global";
const Protected = ({ component: Component, ...rest }) => {
    const { data } = useContext(Global);
    const loggedIn = Boolean(data);
    return (
        <Route
            {...rest}
            render={(props) =>
                loggedIn ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/auth/login" />
                )
            }
        />
    );
};
export default Protected;
