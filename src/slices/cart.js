import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	basket: [],
	totalQuantity: 0,
	totalPrice: 0,
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addProduct: (state, { payload }) => {
			state.basket = [...state.basket, payload];
			state.totalQuantity += 1;
			state.totalPrice += payload.price;
		},
		removeProduct: (state, { payload }) => {
			const selectedProduct = state.basket.find((item) => item.id === payload.id);
			const index = state.basket.indexOf(selectedProduct);
			state.totalPrice -= payload.quantity * payload.price;
			state.totalQuantity -= payload.quantity;
			state.basket.splice(index, 1);
		},
		addQuantity: (state, { payload }) => {
			const selectedProduct = state.basket.find((item) => item.id === payload);
			const index = state.basket.indexOf(selectedProduct);
			state.basket[index].quantity += 1;
			state.totalQuantity += 1;
			state.totalPrice += selectedProduct.price;
		},
		reduceQuantity: (state, { payload }) => {
			const selectedProduct = state.basket.find((item) => item.id === payload);
			const index = state.basket.indexOf(selectedProduct);
			state.basket[index].quantity -= 1;
			state.totalQuantity -= 1;
			state.totalPrice -= selectedProduct.price;
		},
		clearBasket: (state) => {
			state.basket = [];
			state.totalQuantity = 0;
			state.totalPrice = 0;
		},
	},
});

export const { addProduct, removeProduct, addQuantity, reduceQuantity, clearBasket } = cartSlice.actions;

export default cartSlice.reducer;
