import React from "react";
import { Route, Switch } from "react-router-dom";

import Login from "./components/Login";
import Home from "./components/Home";

function App() {
	return (
		<Switch>
			<Route path="/login" render={() => <Login />} />
			<Route path="/" render={() => <Home />} />
		</Switch>
	);
}

export default App;
