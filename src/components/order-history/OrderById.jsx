import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useUser } from '../../hooks/useUser';

export default function OrderById() {
    const { orderId } = useParams();
    const { token } = useUser();
    const [order, setOrder] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:9001/orders/${orderId}`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "Authorization": "Bearer " + token
            }
        })
            .then(res => res.json())
            .then(json => setOrder(json))
    }, [])

    if (order !== {}) {
        const { bookingOrderId, orderDate, transactionMode, quantity, totalCost, couponName, orderType } = order;
        return (
            <>
                <button onClick={() => navigate("/menu")}>Menu</button>
                <button onClick={() => navigate("/orders")}>Back</button>

                <div className="id">Booking Id: {bookingOrderId}</div>
                <div className="date">Order Date: {orderDate}</div>
                <div className="transmode">Transaction Mode: {transactionMode}</div>
                <div className="quantity">Quantity: {quantity}</div>
                <div className="cost">Cost: {totalCost}</div>
                <div className="coupon">Coupon: {couponName}</div>
                <div className="type">Order type: {orderType}</div><br />
                {
                    order.pizzaList?.map(pizza => {
                        const { pizzaId, pizzaType, pizzaName, pizzaSize, pizzaDescription, pizzaCost } = pizza;
                        return (
                            <div>
                                <div className="pizzaId">Pizza ID: {pizzaId}</div><br />
                                <div className="pizzaType">Pizza Type: {pizzaType}</div><br />
                                <div className="pizzaName">Pizza Name: {pizzaName}</div><br />
                                <div className="pizzaSize">Pizza Size: {pizzaSize}</div><br />
                                <div className="pizzaDescription">Pizza Description: {pizzaDescription}</div><br />
                                <div className="pizzaCost">Pizza Cost: {pizzaCost}</div><br />
                            </div>
                        )
                    })
                }

            </>
        )
    }

}
