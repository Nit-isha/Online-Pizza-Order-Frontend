import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage'
import { FaRupeeSign } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useUser } from '../hooks/useUser';
import Logout from '../authentication/Logout';
import '../styles/Cart.css';
import { useDispatch, useSelector } from 'react-redux';
import { setCouponName, setDiscount } from '../redux/paymentSlice';


export default function Cart() {
    const [cart, setCart] = useLocalStorage("cart", []);
    const [check, setCheck] = useState(false);
    const [coupon, setCoupon] = useState([]);
    const discount = useSelector((state) => state.payment.discount);
    const couponName = useSelector((state) => state.payment.couponName);
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const { token, url } = useUser();
    let subTotal = 0;

    useEffect(() => {
        fetch(`${url}/coupon`, { method: "GET" })
            .then(res => res.json())
            .then(json => setCoupon(json))
    }, [])

    const removeFromCart = (pizza) => {
        let index = cart.indexOf(pizza);
        if (index > -1) {
            cart.splice(index, 1);
            setCart(cart);
        }
    }

    return (
        <>
            {/* ------------ NavBar ------------ */}

            <div className="menu-navigation">
                <div id="menu-heading" onClick={() => navigate("/menu")} style={{ cursor: "pointer" }}><img src={"/logo192.png"}></img>Yolo's Pizza</div>
                <div className="menu-navigation-right">
                    <button onClick={() => navigate("/menu")}>Menu</button>
                    {!token && <button id="menu-login-button" onClick={() => navigate("/login?from=/cart")}>Login</button>}
                    {!token && <button id="menu-signup-button" onClick={() => navigate("/register")}>Signup</button>}
                    {token && <button id="menu-profile-button" onClick={() => navigate("/user/about")}>Profile</button>}
                    {token && <button id="menu-orders-button" onClick={() => navigate("/orders")}>Orders</button>}
                    <Logout />
                </div>
            </div>
            <div className='cart-flex-container'>

                {/* ------------ Selected Pizza Description ------------ */}

                <div className="cart-content">
                    {
                        cart.map(pizzaList => {
                            const { pizzaId, pizzaType, pizzaName, pizzaSize, pizzaDescription, pizzaCost } = pizzaList;
                            subTotal += pizzaCost;

                            return (
                                <article key={pizzaId} id="cart-mycart-pizza">
                                    <div className='cart-images'>
                                        <div className="cart-pizza-image"><img src={`/images/${pizzaId}.jpg`}></img></div>
                                        <div className="cart-pizza-type"><img src={`/images/${pizzaType}.jpg`}></img></div>
                                    </div>
                                    <div className='cart-mycart-description'>
                                        <div className="cart-pizza-name">{pizzaName}</div>
                                        <div className="cart-pizza-size">{pizzaSize}</div>
                                        <div className="cart-pizza-desc">{pizzaDescription}</div>
                                        <div className="cart-pizza-cost"><FaRupeeSign size={13} />{pizzaCost}</div>
                                    </div>
                                    <button className='cart-pizza-remove-button' id={pizzaId} onClick={() => {
                                        removeFromCart(pizzaList);
                                        window.location.reload(false);
                                    }}>Remove</button>
                                </article>
                            )
                        })
                    }
                </div>

                {/* ------------ Available Coupons ------------ */}

                {
                    subTotal !== 0 &&
                    <>
                        <div className="cart-coupon-content">
                            <button className='cart-apply-coupon-button' onClick={() => setCheck(!check)}>Select offer / Apply coupon</button>
                            {check &&
                                <>
                                    {/* ------------ Fetching coupon API ------------ */}

                                    <form onSubmit={(e) => {
                                        e.preventDefault();
                                        const data = new FormData(e.target);
                                        dispatch(setCouponName(data.get("couponApplied")));

                                        fetch(`${url}/coupon/validation`, {
                                            method: "POST",
                                            headers: {
                                                "content-type": "application/json",
                                                "Accept": "application/json"
                                            },
                                            body: JSON.stringify({
                                                "couponName": data.get("couponApplied"),
                                                "subTotal": subTotal
                                            })
                                        })
                                            .then(res => {
                                                if (!res.ok) {
                                                    throw Error("Invalid Coupon");
                                                }
                                                else {
                                                    return res.json();
                                                }
                                            })
                                            .then(res => {
                                                dispatch(setDiscount(res));
                                                if (res === 0) { toast.error("Coupon NOT Applicable.") }
                                                else { toast.success(`Coupon ${data.get("couponApplied")} applied.`) }
                                            })
                                            .catch(err => {
                                                toast.error(err.message)
                                            })
                                    }}>
                                        <div className='cart-coupon-content-desc'>
                                            <div className="cart-apply-coupon-heading">Have a Coupon Code?</div>
                                            <input type="text" name="couponApplied" id='cart-coupon-applied' placeholder='Enter coupon code here' autoFocus />
                                            <input type="submit" value="APPLY" id="cart-coupon-apply-submit" />
                                        </div>
                                    </form>
                                </>
                            }
                            {check &&
                                <>
                                    {/* ------------ Avaialble offers ------------ */}

                                    <div className='cart-available-offers'>Available Offers</div>
                                    <div className="cart-available-offers-content">
                                        {coupon.map(coupon => {
                                            const { couponName, couponDescription } = coupon;
                                            return (
                                                <>
                                                    <div className='cart-each-coupon'>
                                                        <div className="cart-couponname">{couponName}</div>
                                                        <div className="cart-coupondesc">{couponDescription}</div>
                                                    </div>
                                                </>
                                            )
                                        })}
                                    </div>
                                </>
                            }

                        </div>

                        {/* ------------ Total cost calculation ------------ */}

                        <div className="cart-total-content">
                            < div >
                                <label htmlFor="cart-total-subtotal" id='cart-total-subtotal'>Sub Total</label>
                                <div className="cart-total-subtotal"><FaRupeeSign size={12} />{subTotal}</div><br />
                                <label htmlFor="cart-total-discount" id='cart-total-discount'>Discount</label>
                                <div className="cart-total-discount"><FaRupeeSign size={12} />{discount && discount}</div><br />
                                <label htmlFor="cart-total-grandTotal" id='cart-total-grandTotal'>Grand Total</label>
                                <div className="cart-total-grandTotal"><FaRupeeSign size={12} />{subTotal - discount}</div><br />
                                <button className='cart-button-place-order' disabled={subTotal === 0} onClick={() => navigate("/payment")}>Proceed to Payment</button>
                                {/* <button className='cart-button-place-order' disabled={subTotal === 0}><Link to="/payment" id='cart-button-place-order-link' state={{ discount: discount, grandTotal: grandTotal, couponName: couponName }}>Proceed to Payment</Link></button> */}
                            </div>
                        </div>
                    </>
                }
                {
                    /* ------------ If cart is empty ------------ */

                    subTotal === 0 &&
                    <>
                        <div className='cart-empty-cart-container'>
                            <img src="/images/emptyCart.png" className='cart-image-cart-looks-empty' />
                            <div className='cart-message-cart-looks-empty'>Cart Looks empty!</div>
                            <button className='cart-button-empty-explore-menu' onClick={() => navigate("/menu")}>Explore Menu</button>
                        </div>
                    </>
                }
            </div>
        </>
    )
}
