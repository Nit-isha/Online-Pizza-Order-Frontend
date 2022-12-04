import { differenceInMinutes } from 'date-fns/esm';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from '../../hooks/useUser';
import { FaRupeeSign } from 'react-icons/fa';
import Logout from '../../authentication/Logout';
import "../../styles/OrderById.css";
import Menu from '../menu/Menu';

export default function OrderById() {
    const { orderId } = useParams();
    const { token, url } = useUser();
    const [order, setOrder] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${url}/orders/${orderId}`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "Authorization": "Bearer " + token
            }
        })
            .then(async res => {
                if (res.ok) {
                    return res.json();
                }
                else {
                    const error = await res.json();
                    throw Error(error.msg);
                }
            })
            .then(json => setOrder(json))
            .catch(err => {
                toast.error(err.message);
                navigate("/404");
            })
    }, [])

    const cancelOrder = (id) => {
        fetch(`${url}/orders/${id}`, {
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
                <div className="menu-navigation">
                    <div id="menu-heading" onClick={() => navigate("/menu")} style={{ cursor: "pointer" }}><img src={"/logo192.png"}></img>Yolo's Pizza</div>
                    <div className="menu-navigation-right">
                        <button onClick={() => navigate("/menu")}>Menu</button>
                        {!token && <button id="menu-login-button" onClick={() => navigate("/login")}>Login</button>}
                        {!token && <button id="menu-signup-button" onClick={() => navigate("/register")}>Signup</button>}
                        {token && <button id="menu-profile-button" onClick={() => navigate("/user/about")}>Profile</button>}
                        {token && <button id="menu-orders-button" onClick={() => navigate("/orders")}>Orders</button>}
                        <Logout />
                    </div>
                </div>
                {/* {token && <PageNotFound />} */}
                {token &&
                    <div className='orders-by-id-container'>
                        {time && <button className='orders-by-id-cancel-button' onClick={() => {
                            cancelOrder(bookingOrderId);
                            navigate("/orders");
                            // window.location.reload(false);
                            // toast.success("Order Cancelled Successfully.");
                        }}>Cancel Order</button>}

                        <div className="orders-by-id-booking-id"><span id='orders-by-id-span-heading'>Booking Id:</span> {bookingOrderId}</div>
                        <div className="orders-by-id-date"><span id='orders-by-id-span-heading'>Order Date:</span> {orderDate}</div>
                        <div className="orders-by-id-transaction-mode"><span id='orders-by-id-span-heading'>Transaction Mode:</span> {transactionMode}</div>
                        <div className="orders-by-id-quantity"><span id='orders-by-id-span-heading'>Quantity:</span> {quantity}</div>
                        <div className="orders-by-id-cost"><span id='orders-by-id-span-heading'>Cost:</span><FaRupeeSign size={12} />{totalCost}</div>
                        <div className="orders-by-id-coupon"><span id='orders-by-id-span-heading'>Coupon:</span> {couponName}</div>
                        <div className="orders-by-id-type"><span id='orders-by-id-span-heading'>Order type:</span> {orderType}</div><br />
                        {
                            order.pizzaList?.map(pizza => {
                                const { pizzaId, pizzaType, pizzaName, pizzaSize, pizzaDescription, pizzaCost } = pizza;
                                return (
                                    <div className='orders-by-id-pizza-container'>
                                        <div className="orders-by-id-pizza-type"><img src={`/images/${pizzaType}.jpg`}></img></div>
                                        <div className="orders-by-id-pizza-name">{pizzaName}</div>
                                        <div className="orders-by-id-pizza-cost"><FaRupeeSign size={12} />{pizzaCost}</div>
                                        <div className="orders-by-id-pizza-size">{pizzaSize}</div>
                                        <div className="orders-by-id-pizza-description">{pizzaDescription}</div>
                                    </div>
                                )
                            })
                        }

                    </div>
                }
                {!token && <Menu />}
            </>
        )
    }

}
