import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage'
import { useUser } from '../hooks/useUser';

export default function Cart() {
    const [cart, setCart] = useLocalStorage("cart", []);
    const [check, setCheck] = useState(false);
    const [coupon, setCoupon] = useState([]);
    let subTotal = 0;
    let navigate = useNavigate();
    // const { token } = useUser();

    useEffect(() => {
        fetch("http://localhost:9001/coupon", { method: "GET" })
            .then(res => res.json())
            .then(json => setCoupon(json))
    }, [])

    return (
        <>
            <button onClick={() => navigate("/menu")}>Menu</button>
            <div className="content">
                {
                    cart.map(pizzaList => {
                        const { pizzaId, pizzaType, pizzaName, pizzaSize, pizzaDescription, pizzaCost } = pizzaList?.pizza;
                        subTotal += pizzaCost;
                        return (
                            <article key={pizzaId}>
                                <div className="name">{pizzaName}</div>
                                <div className="size">{pizzaSize}</div>
                                <div className="type">{pizzaType}</div>
                                <div className="desc">{pizzaDescription}</div>
                                <div className="cost">{pizzaCost}</div>
                            </article>
                        )
                    })
                }
            </div>
            <div className="coupon">
                <button onClick={() => setCheck(!check)}>Select offer / Apply coupon</button>
                {check &&
                    <>
                        <div className="heading">Have a Coupon Code?</div>
                        <input type="text" name='couponApplied' id='couponApplied' placeholder='Enter coupon code here' autoFocus />
                        <button>APPLY</button>
                        <div className="available">Available Offers</div>
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
                    <div className="subtotal">{subTotal}</div>
                    <label htmlFor="discount">Discount</label>
                    <div className="discount">-</div>
                    <label htmlFor="grandTotal">Grand Total</label>
                    <div className="grandTotal">{subTotal}</div>
                    <button onClick={() => navigate("/payment")}>Place Order</button>
                </div>
            </div>
        </>
    )
}
