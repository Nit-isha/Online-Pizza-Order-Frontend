import React, { useEffect, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { useUser } from '../hooks/useUser';

export default function Cart() {
    const [cart, setCart] = useLocalStorage("cart", []);
    const [check, setCheck] = useState(false);
    const [coupon, setCoupon] = useState([]);
    const { token } = useUser();

    useEffect(() => {
        fetch("http://localhost:9001/coupon", {
            method: "GET",
            headers: {
                // "Authorization": "Bearer " + token
            }
        })
            .then(res => res.json())
            .then(json => setCoupon(json))
    }, [])

    const res = Array.from(new Set(cart)).map(obj =>
        ({ pizzobj: obj.pizza, quantity: cart.filter(i => i.pizza.pizzaId === obj.pizza.pizzaId).length }))
    console.log(res);
    return (
        <>
            <div className="content">
                {
                    cart.map(pizzaList => {
                        const { pizzaId, pizzaType, pizzaName, pizzaSize, pizzaDescription, pizzaCost } = pizzaList?.pizza;
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
        </>
    )
}
