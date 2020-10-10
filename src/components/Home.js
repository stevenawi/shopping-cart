import React, { useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Switch, Route, useHistory } from "react-router-dom";
import { logout } from "../slices/auth";
import { clearBasket } from "../slices/cart";
import amazonLight from "../images/amazon_light.png";
import cart from "../images/cart.svg";
import Content from "./Content";
import ShoppingCart from "./ShoppingCart";
import PrivateRoute from "../routes/PrivateRoute";
import "./Home.css";

function Header() {
	const dispatch = useDispatch();
	const { isAuthenticated } = useSelector((state) => state.auth);
	const { totalQuantity } = useSelector((state) => state.cart);
	const history = useHistory();

	const [search, setSearch] = useState();

	const handleLogin = () => {
		if (isAuthenticated) {
			dispatch(logout());
			dispatch(clearBasket());
		} else {
			history.push("/login");
		}
	};

	return (
		<Fragment>
			<header className="header">
				<Link to="/">
					<img className="header__logo" src={amazonLight} alt="amazon" />
				</Link>
				<input
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className="header__input"
					placeholder="Search Product"
				/>
				<button className="header__login" onClick={handleLogin}>
					{isAuthenticated ? "Sign Out" : "Sign In"}
				</button>
				<Link to="/cart" className="header__cart">
					<img src={cart} alt="cart" />
					<span>{totalQuantity}</span>
				</Link>
			</header>
			<Switch>
				<Route exact path="/" render={() => <Content search={search} />} />
				<PrivateRoute path="/cart" component={ShoppingCart} />
			</Switch>
		</Fragment>
	);
}

export default Header;
