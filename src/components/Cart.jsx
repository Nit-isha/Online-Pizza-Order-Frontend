import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage'
import { FaRupeeSign } from 'react-icons/fa';
import { toast } from 'react-toastify';

export default function Cart() {
    const [cart, setCart] = useLocalStorage("cart", []);
    const [check, setCheck] = useState(false);
    const [coupon, setCoupon] = useState([]);
    const [discount, setDiscount] = useState(0);
    let subTotal = 0;
    let navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:9001/coupon", { method: "GET" })
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
            <button onClick={() => navigate("/menu")}>Menu</button>

            <div className="content">
                {
                    cart.map(pizzaList => {
                        const { pizzaId, pizzaType, pizzaName, pizzaSize, pizzaDescription, pizzaCost } = pizzaList;
                        subTotal += pizzaCost;
                        return (
                            <article key={pizzaId}>
                                <div className="name">{pizzaName}</div>
                                <div className="size">{pizzaSize}</div>
                                <div className="type">{pizzaType}</div>
                                <div className="desc">{pizzaDescription}</div>
                                <div className="cost"><FaRupeeSign />{pizzaCost}</div>
                                <button id={pizzaId} onClick={() => {
                                    removeFromCart(pizzaList);
                                    window.location.reload(false);
                                }}>Remove</button>
                            </article>
                        )
                    })
                }
            </div>
            {subTotal !== 0 &&
                <>
                    <div className="coupon">
                        <button onClick={() => setCheck(!check)}>Select offer / Apply coupon</button>
                        {check &&
                            <>
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    const data = new FormData(e.target);

                                    fetch("http://localhost:9001/coupon/validation", {
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
                                            setDiscount(res);
                                            if (res === 0) { toast.error("Coupon NOT Applicable.") }
                                            else { toast.success(`Coupon ${data.get("couponApplied")} applied.`) }
                                        })
                                        .catch(err => {
                                            toast.error(err.message)
                                        })
                                }}>
                                    <div className="heading">Have a Coupon Code?</div>
                                    <input type="text" name="couponApplied" id='couponApplied' placeholder='Enter coupon code here' autoFocus />
                                    <input type="submit" value="APPLY" />
                                    <div className="available">Available Offers</div>
                                </form>
                            </>
                        }
                        {check &&
                            coupon.map(coupon => {
                                const { couponName, couponDescription } = coupon;
                                return (
                                    <>
                                        <div>
                                            <div className="couponname">{couponName}</div>
                                            <div className="coupondesc">{couponDescription}</div>
                                        </div>
                                    </>
                                )
                            })
                        }
                    </div>
                    <div className="total">
                        < div >
                            <label htmlFor="subtotal">Sub Total</label>
                            <div className="subtotal"><FaRupeeSign />{subTotal}</div>
                            <label htmlFor="discount">Discount</label>
                            <div className="discount"><FaRupeeSign />{discount && discount}</div>
                            <label htmlFor="grandTotal">Grand Total</label>
                            <div className="grandTotal"><FaRupeeSign />{subTotal - discount}</div>
                            <button onClick={() => { navigate("/payment") }} disabled={subTotal === 0}>Place Order</button>
                        </div>
                    </div>
                </>
            }
            {subTotal === 0 &&
                <>
                    <div>Cart Looks empty!</div>
                    <button onClick={() => navigate("/menu")}>Explore Menu</button>
                </>
            }
        </>
    )
}
