import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	discount: 0,
	couponName: null,
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
	},
});

export const { setDiscount, setCouponName } = paymentSlice.actions;

export default paymentSlice.reducer;
