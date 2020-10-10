import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute(props) {
	const { component: Component, ...rest } = props;
	const auth = useSelector((state) => state.auth);

	return (
		<Route
			{...rest}
			render={(props) => (auth.isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />)}
		/>
	);
}

export default PrivateRoute;
