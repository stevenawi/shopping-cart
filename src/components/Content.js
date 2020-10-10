import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { addProduct } from "../slices/cart";
import { format } from "../util/format";
import "./Content.css";

function Content({ search }) {
	const { basket } = useSelector((state) => state.cart);
	const dispatch = useDispatch();

	const [products, setProducts] = useState();

	const handleAddProduct = (product) => {
		const exist = basket.find((item) => item.id === product.id);
		!exist && dispatch(addProduct({ ...product, quantity: 1 }));
	};

	useEffect(() => {
		axios
			.get("http://localhost:3000/Products")
			.then((res) => setProducts(res.data))
			.catch((e) => console.log(e));
	}, []);

	return (
		<div className="content">
			<h1 className="content__title">Products</h1>
			<div className="content__card">
				{products &&
					products
						.filter(({ name }) => (search ? name.toLowerCase().includes(search.toLowerCase()) : true))
						.map((product) => (
							<div key={product.id} className="content__product">
								<img
									className="content__productPhoto"
									src={product.photo + "?v=" + product.id}
									alt="product"
								/>
								<span className="content__productPrice">{format(product.price)}</span>
								<span className="content__productName">{product.name}</span>
								<button className="content__button" onClick={() => handleAddProduct(product)}>
									{basket.some((item) => item.id === product.id) ? "Added to Cart" : "Add to Cart"}
								</button>
							</div>
						))}
			</div>
		</div>
	);
}

export default Content;
