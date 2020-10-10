import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../slices/auth";
import amazonDark from "../images/amazon_dark.png";
import "./Login.css";

function Login() {
	const dispatch = useDispatch();
	const history = useHistory();

	const handleSubmit = () => {
		dispatch(login());
		history.push("/");
	};

	return (
		<div className="login">
			<img className="login__logo" src={amazonDark} alt="amazon" />
			<div className="login__box">
				<h1>Sign-In</h1>
				<form onSubmit={handleSubmit} className="login__form">
					<input placeholder="Username" />
					<input placeholder="Password" />
					<button>Sign In</button>
				</form>
			</div>
		</div>
	);
}

export default Login;
