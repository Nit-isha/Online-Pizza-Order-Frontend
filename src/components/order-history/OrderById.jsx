import { differenceInMinutes } from 'date-fns/esm';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from '../../hooks/useUser';
import { FaRupeeSign } from 'react-icons/fa';

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

    const cancelOrder = (id) => {
        fetch(`http://localhost:9001/orders/${id}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
                "Authorization": "Bearer " + token
            }
        })
            .then(async res => {
                if (res.ok) {
                    toast.success("Order cancelled Successfully");
                }
                else {
                    const error = await res.json();
                    throw Error(error.msg);
                }
            }).catch(err => toast.error(err.message));
    }

    if (order !== {}) {
        const { bookingOrderId, orderDate, transactionMode, quantity, totalCost, couponName, orderType } = order;
        if (orderDate) {
            const order_date = new Date(orderDate);
            var time = differenceInMinutes(new Date(), order_date) <= 15;
        }
        return (
            <>
                <button onClick={() => navigate("/menu")}>Menu</button>
                <button onClick={() => navigate("/orders")}>Back</button>
                <br />
                {time && <button onClick={() => {
                    cancelOrder(bookingOrderId);
                    navigate("/orders");
                    window.location.reload(false);
                }}>Cancel Order</button>}

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
                                <div className="pizzaCost">Pizza Cost: <FaRupeeSign />{pizzaCost}</div><br />
                            </div>
                        )
                    })
                }

            </>
        )
    }

}
