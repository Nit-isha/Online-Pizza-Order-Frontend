import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	discount: 0,
	couponName: null,
	subTotal: 0,
};

export const paymentSlice = createSlice({
	name: "payment",
	initialState: initialState,
	reducers: {
		setDiscount: (state, action) => {
			state.discount = action.payload;
		},
		setCouponName: (state, action) => {
			state.couponName = action.payload;
		},
		setSubTotal: (state, action) => {
			state.subTotal = action.payload;
		},
	},
});

export const { setDiscount, setCouponName, setSubTotal } = paymentSlice.actions;

export default paymentSlice.reducer;
