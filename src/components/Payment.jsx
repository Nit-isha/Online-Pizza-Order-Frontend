import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import { useUser } from '../hooks/useUser';
import useUserInfo from '../hooks/useUserInfo';

export default function Payment() {
    const [cart, setCart] = useLocalStorage("cart", []);
    const info = useUserInfo();
    const { token } = useUser()
    let navigate = useNavigate();
    const [transactionMode, setTransactionMode] = useState();
    const [orderType, setOrderType] = useState();
    let subTotal = 0;

    cart.map(pizza => { subTotal += pizza.pizzaCost });
    function confirmOrder() {
        fetch("http://localhost:9001/orders/neworder", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({
                "transactionMode": transactionMode,
                "orderType": orderType,
                // "couponName": "null",
                "pizzaList": cart
            })
        }).then(() => alert("Order placed Succesfully"));
    }

    return (
        <>
            {token &&
                <div>
                    <button id="backToCart" onClick={() => navigate("/cart")}>Back to Cart</button>
                    <div className="custname">Hello {info?.customerName}!!</div>
                    <div className="address">
                        <strong>Delivery Address</strong> <br />
                        {info?.customerAddress}<br />
                        <button onClick={() => navigate("/user/update")}>Change</button> <br />
                        {info?.customerMobile}
                    </div>
                    <div className="transactionMode">
                        <strong>Transaction Mode</strong> <br />
                        <select name="transactionMode" id="transactionMode" onChange={(e) => setTransactionMode(e.target.value)}>
                            <option value="Cash On Delivery">Cash On Delivery</option>
                            <option value="Credit Card">Credit Card</option>
                            <option value="Debit Card">Debit Card</option>
                            <option value="Net Banking">Net Banking</option>
                            <option value="UPI and Wallets">UPI and Wallets</option>
                        </select>
                    </div>
                    <div className="orderType">
                        <strong>Order Type</strong><br />
                        <select name="orderType" id="orderType" onChange={(e) => setOrderType(e.target.value)}>
                            <option value="Home Delivery">Home Delivery</option>
                            <option value="Pick-up">Pick-up</option>
                            <option value="Dine-in">Dine-in</option>
                            <option value="Table Ordering">Table Ordering</option>
                        </select>
                    </div>
                    <div className="quantity">
                        <strong>Quantity</strong><br />
                        {cart.length + 1}
                    </div>
                    <div className="totalCost">
                        <strong>Sub Total</strong><br />
                        {subTotal}
                    </div>
                    <div className="couponName">
                        <strong>Coupon applied</strong><br />
                        none
                    </div>
                    <button type='submit' onClick={confirmOrder}>Confirm Order</button>
                </div>
            }
            {!token &&
                <div>
                    <button id="backToCart" onClick={() => navigate("/cart")}>Back to Cart</button>
                    <div className="custname">Hey there!</div>
                    <div className="address">
                        <strong>Delivery Address</strong> <br />
                        Login to use your saved address <br />
                        <button onClick={() => navigate("/login")}>LOGIN</button>
                    </div>
                    <div className="transactionMode">
                        <strong>Transaction Mode</strong> <br />
                        <select name="transactionMode" id="transactionMode" onChange={(e) => setTransactionMode(e.target.value)}>
                            <option value="Cash On Delivery">Cash On Delivery</option>
                            <option value="Credit Card">Credit Card</option>
                            <option value="Debit Card">Debit Card</option>
                            <option value="Net Banking">Net Banking</option>
                            <option value="UPI and Wallets">UPI and Wallets</option>
                        </select>
                    </div>
                    <div className="orderType">
                        <strong>Order Type</strong><br />
                        <select name="orderType" id="orderType" onChange={(e) => setOrderType(e.target.value)}>
                            <option value="Home Delivery">Home Delivery</option>
                            <option value="Pick-up">Pick-up</option>
                            <option value="Dine-in">Dine-in</option>
                            <option value="Table Ordering">Table Ordering</option>
                        </select>
                    </div>
                    <div className="quantity">
                        <strong>Quantity</strong><br />
                        {cart.length + 1}
                    </div>
                    <div className="totalCost">
                        <strong>Sub Total</strong><br />
                        {subTotal}
                    </div>
                    <div className="couponName">
                        <strong>Coupon applied</strong><br />
                        none
                    </div>
                    <button type='submit' disabled="true">Confirm Order</button>
                </div>
            }

        </>
    )
}
