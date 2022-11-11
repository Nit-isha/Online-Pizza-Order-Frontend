import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/useUser'

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const { token } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:9001/orders", {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "Authorization": "Bearer " + token
            }
        })
            .then(res => res.json())
            .then(json => {
                json.reverse();
                setOrders(json);
            });
    }, [])

    return (
        <>
            {orders !== [] &&
                orders.map(order => {
                    const { bookingOrderId, orderDate, transactionMode, quantity, totalCost, couponName, orderType, pizzaList } = order;
                    return (
                        <div>
                            <button onClick={() => navigate("/menu")}>Menu</button>
                            <div className="id">Booking Id: {bookingOrderId}</div>
                            <div className="transmode">Transaction Mode: {transactionMode}</div>
                            <div className="quantity">Quantity: {quantity}</div>
                            <div className="cost">Cost: {totalCost}</div>
                            <div className="type">Order type: {orderType}</div>
                            <button onClick={() => navigate(`/orders/${bookingOrderId}`)}>Get Details</button>
                            <br />
                        </div>
                    )
                })
            }
            {orders.length === 0 &&
                <>
                    <div className="noOrder">No Orders Available</div>
                    <div>Please add some items from the menu.</div>
                    <button onClick={() => navigate("/menu")}>Explore Menu</button>

                </>
            }
        </>
    )
}
