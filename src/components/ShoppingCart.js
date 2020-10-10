import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { addQuantity, reduceQuantity, removeProduct, clearBasket } from "../slices/cart";
import { format } from "../util/format";

import "./ShoppingCart.css";

function ShoppingCart() {
	const dispatch = useDispatch();
	const { basket, totalQuantity, totalPrice } = useSelector((state) => state.cart);
	const history = useHistory();

	const handleAdd = (id) => {
		dispatch(addQuantity(id));
	};

	const handleReduce = (id, quantity) => {
		quantity > 1 && dispatch(reduceQuantity(id));
	};

	const handleRemove = (id, price, quantity) => {
		dispatch(removeProduct({ id: id, price: price, quantity: quantity }));
	};

	const handleCheckout = () => {
		dispatch(clearBasket());
		history.push("/");
	};

	return (
		<div className="shoppingCart">
			<div className="shoppingCart__left">
				<h1>Shopping Cart</h1>
				<span className="shoppingCart__priceText">Price</span>
				<hr />
				{basket.map(({ id, photo, name, price, quantity }) => (
					<Fragment key={id}>
						<div className="shoppingCart__item">
							<div className="shoppingCart__products">
								<img src={photo + "?v=" + id} alt="product" />
								<div>
									<p className="shoppingCart__name">{name}</p>
									<div className="shoppingCart__quantity">
										<span>Quantity</span>
										<button
											onClick={() => handleReduce(id, quantity)}
											className="shoppingCart__modify"
										>
											-
										</button>
										<button className="shoppingCart__amount">{quantity}</button>
										<button onClick={() => handleAdd(id)} className="shoppingCart__modify">
											+
										</button>
										<button
											onClick={() => handleRemove(id, price, quantity)}
											className="shoppingCart__remove"
										>
											Remove Item
										</button>
									</div>
								</div>
							</div>
							<div className="shoppingCart__price">{format(price)}</div>
						</div>
						<hr />
					</Fragment>
				))}
				<div className="shoppingCart__subTotal">
					<span className="shoppingCart__subTotalItem">{`Subtotal (${totalQuantity} items):`}</span>
					<span className="shoppingCart__subTotalPrice">{format(totalPrice)}</span>
				</div>
			</div>
			<div className="shoppingCart__right">
				<div className="shoppingCart__checkOut">
					<span className="shoppingCart__subTotalItem">{`Subtotal (${totalQuantity} items):`}</span>
					<span className="shoppingCart__subTotalPrice">{format(totalPrice)}</span>
					<button onClick={handleCheckout}>Proceed To Checkout</button>
				</div>
			</div>
		</div>
	);
}

export default ShoppingCart;
