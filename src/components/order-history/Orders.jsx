import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/useUser'
import { FaRupeeSign } from 'react-icons/fa';
import '../../styles/Orders.css';
import Logout from '../../authentication/Logout';
import Menu from '../menu/Menu';

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const { token, url } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${url}/orders`, {
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
            {!token && <Menu />}
            {token &&
                <div className='orders-container'>
                    {orders !== [] &&
                        orders.map(order => {
                            const { bookingOrderId, transactionMode, quantity, totalCost, orderType } = order;
                            return (
                                <>
                                    <div className='orders-container-card'>
                                        <div className="orders-card-id">
                                            <span>Booking Id :</span>
                                            <div className='orders-card-id-value'>
                                                {bookingOrderId}
                                            </div>
                                        </div>
                                        <div className="orders-card-transaction-mode">
                                            <span>Transaction Mode :</span>
                                            <div className='orders-card-transaction-mode-value'>{transactionMode}</div>
                                        </div>
                                        <div className="orders-card-quantity">
                                            <span>Quantity :</span>
                                            <div className="orders-card-quantity-value">{quantity}</div>
                                        </div>
                                        <div className="orders-card-cost">
                                            <span>Cost :</span>
                                            <div className="orders-card-cost-value">
                                                <FaRupeeSign size={12} />{totalCost}
                                            </div>
                                        </div>
                                        <div className="orders-card-type">
                                            <span>Order type :</span>
                                            <div className="orders-card-type-value">{orderType}</div>
                                        </div>
                                        <button className='orders-card-get-details' onClick={() => navigate(`/orders/${bookingOrderId}`)}>Get Details</button>
                                        <br />
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
            }
            {token &&
                orders.length === 0 &&
                <div className="orders-no-order-container">
                    <img src="/images/noOrder.png"></img>
                    <div className="orders-no-order-message">No Orders Available</div>
                    <button className='orders-explore-menu-button' onClick={() => navigate("/menu")}>Explore Menu</button>
                </div>
            }
        </>
    )
}
