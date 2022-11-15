import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import { useUser } from '../hooks/useUser';
import { toast } from 'react-toastify';
import useUserInfo from '../hooks/useUserInfo';
import { FaRupeeSign, FaAddressBook } from 'react-icons/fa';
import { IoCall } from 'react-icons/io5';
import '../styles/Payment.css';
import Logout from '../authentication/Logout';
import { useDispatch, useSelector } from 'react-redux';
import { setCouponName, setDiscount } from '../redux/paymentSlice';

export default function Payment({ props }) {
    const [cart, setCart] = useLocalStorage("cart", []);
    const info = useUserInfo();
    const { token } = useUser()
    let navigate = useNavigate();
    const location = useLocation();
    // const { discount, grandTotal, couponName } = location.state;
    const [transactionMode, setTransactionMode] = useState("Cash On Delivery");
    const [orderType, setOrderType] = useState("Home Delivery");
    const discount = useSelector((state) => state.payment.discount);
    const couponName = useSelector((state) => state.payment.couponName);
    const dispatch = useDispatch();
    let subTotal = 0;

    /* ------------ Function for ordering pizza ------------ */

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
                "couponName": couponName,
                "pizzaList": cart
            })
        })
            .then(() => toast.success("Order Placed Succesfully"))
            .then(() => localStorage.removeItem("cart"))
            .then(() => {
                navigate("/menu");
                dispatch(setCouponName(null));
                dispatch(setDiscount(0));
            })

    }

    return (
        <>
            {/* ------------ NavBar ------------ */}
            <div className="menu-navigation">
                <div id="menu-heading" onClick={() => navigate("/menu")} style={{ cursor: "pointer" }}><img src={"/logo192.png"}></img>Yolo's Pizza</div>
                <div className="menu-navigation-right">
                    <button onClick={() => navigate("/menu")}>Menu</button>
                    <button id="backToCart" onClick={() => navigate("/cart")}>My Cart</button>
                    {!token && <button id="menu-login-button" onClick={() => navigate("/login?from=/payment")}>Login</button>}
                    {!token && <button id="menu-signup-button" onClick={() => navigate("/register")}>Signup</button>}
                    {token && <button id="menu-profile-button" onClick={() => navigate("/user/about")}>Profile</button>}
                    {token && <button id="menu-orders-button" onClick={() => navigate("/orders")}>Orders</button>}
                    <Logout />
                </div>
            </div>

            {/* ----------- Confirmation Page ----------- */}

            {cart.length !== 0 && <div className='payment-container'>

                {token && cart.length !== 0 &&
                    <div className='payment-logged-in-container'>

                        {/* ----------- User address and mobile no. ----------- */}

                        <div className="payment-greet-customer-name">Hello {info?.customerName}!! &#128516;</div>
                        <div className="payment-customer-address">
                            <span>Delivery Address</span><br />
                            <div id='payment-div-details'>
                                <span><FaAddressBook /></span>{info?.customerAddress}<br />
                                <span><IoCall size={12} /></span>{info?.customerMobile}<br />
                                <button className='payment-update-customer-address' onClick={() => navigate("/user/update")}>Update Address</button> <br />
                            </div>
                        </div>

                        {/* ----------- Selecting Mode and Order type ----------- */}

                        <div className="payment-transaction-mode">
                            <span>Transaction Mode </span><br />
                            <select name="transactionMode" id="transactionMode" onChange={(e) => setTransactionMode(e.target.value)}>
                                <option value="Cash On Delivery">Cash On Delivery</option>
                                <option value="Credit Card">Credit Card</option>
                                <option value="Debit Card">Debit Card</option>
                                <option value="Net Banking">Net Banking</option>
                                <option value="UPI and Wallets">UPI and Wallets</option>
                            </select>
                        </div>
                        <div className="payment-order-type">
                            <span>Order Type</span><br />
                            <select name="orderType" id="orderType" onChange={(e) => setOrderType(e.target.value)}>
                                <option value="Home Delivery">Home Delivery</option>
                                <option value="Pick-up">Pick-up</option>
                                <option value="Dine-in">Dine-in</option>
                                <option value="Table Ordering">Table Ordering</option>
                            </select>
                        </div>

                        {/* ----------- Final total amount billin ----------- */}

                        <div className="payment-quantity">
                            <span>Quantity</span>
                            <div className='payment-quantity-value'>
                                {cart.length + 1} pizza
                            </div>
                        </div>
                        <div className="payment-total-cost">
                            <span>Sub Total</span>
                            <div className='payment-total-value'>
                                <FaRupeeSign size={13} />{subTotal}
                            </div>
                        </div>
                        <div className="payment-discount">
                            <span>Discount</span>
                            <div className='payment-discount-value'>
                                <FaRupeeSign size={13} />
                                {discount}
                            </div>
                        </div>
                        <div className="payment-grand-total-cost">
                            <span>Grand Total</span>
                            <div className='payment-grand-total-value'>
                                <FaRupeeSign size={13} />
                                {/* {grandTotal} */}
                                {subTotal - discount}
                            </div>
                        </div>
                        <button type='submit' className='payment-place-order-button' onClick={confirmOrder}>Confirm Order</button>
                    </div>
                }
                {!token &&
                    <div>
                        {/* ----------- Login Button if not logged in ----------- */}

                        <div className="payment-greet-customer-name">Hey there! &#128516;</div>
                        <div className="payment-customer-address">
                            <span>Delivery Address</span> <br />
                            <div id='payment-div-details'>
                                Login to use your saved address <br />
                                <button className='payment-update-customer-address' onClick={() => navigate("/login?from=/payment")}>LOGIN</button>
                            </div>
                        </div>
                        <div className="payment-transaction-mode">
                            <span>Transaction Mode</span> <br />
                            <select name="transactionMode" id="transactionMode" onChange={(e) => setTransactionMode(e.target.value)}>
                                <option value="Cash On Delivery">Cash On Delivery</option>
                                <option value="Credit Card">Credit Card</option>
                                <option value="Debit Card">Debit Card</option>
                                <option value="Net Banking">Net Banking</option>
                                <option value="UPI and Wallets">UPI and Wallets</option>
                            </select>
                        </div>
                        <div className="payment-order-type">
                            <span>Order Type</span><br />
                            <select name="orderType" id="orderType" onChange={(e) => setOrderType(e.target.value)}>
                                <option value="Home Delivery">Home Delivery</option>
                                <option value="Pick-up">Pick-up</option>
                                <option value="Dine-in">Dine-in</option>
                                <option value="Table Ordering">Table Ordering</option>
                            </select>
                        </div>
                        <div className="payment-quantity">
                            <span>Quantity</span>
                            <div className='payment-quantity-value'>
                                {cart.length} pizza
                            </div>
                        </div>
                        <div className="payment-quantity">
                            <span>Coupon Name</span>
                            <div className='payment-quantity-value'>
                                {couponName}
                            </div>
                        </div>
                        <div className="payment-total-cost">
                            <span>Sub Total</span>
                            <div className='payment-total-value'>
                                <FaRupeeSign size={13} />{subTotal}
                            </div>
                        </div>
                        <div className="payment-discount">
                            <span>Discount</span>
                            <div className='payment-discount-value'>
                                <FaRupeeSign size={13} />
                                {discount}
                            </div>
                        </div>
                        <div className="payment-grand-total-cost">
                            <span>Grand Total</span>
                            <div className='payment-grand-total-value'>
                                <FaRupeeSign size={13} />
                                {subTotal - discount}
                            </div>
                        </div>
                        <button type='submit' className='payment-place-order-button' disabled="true">Confirm Order</button>
                    </div>
                }
            </div>}
            {
                /* ------------- If Cart is Empty ------------ */
                subTotal === 0 &&
                <>
                    <div className='cart-empty-cart-container'>
                        <img src="/images/emptyCart.png" className='cart-image-cart-looks-empty' />
                        <div className='cart-message-cart-looks-empty'>Cart Looks empty!</div>
                        <button className='cart-button-empty-explore-menu' onClick={() => navigate("/menu")}>Explore Menu</button>
                    </div>
                </>
            }
        </>
    )
}
