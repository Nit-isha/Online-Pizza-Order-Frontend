import Menu from '../menu/Menu';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logout from '../../authentication/Logout';
import { useUser } from '../../hooks/useUser';
import useUserInfo from '../../hooks/useUserInfo';
import '../../styles/About.css';

export default function About() {
    let navigate = useNavigate();
    const info = useUserInfo();
    const { token } = useUser();

    return (
        <>
            <div className="menu-navigation">
                <div id="menu-heading" onClick={() => navigate("/menu")} style={{ cursor: "pointer" }}><img src={"/logo192.png"}></img>Yolo's Pizza</div>
                <div className="menu-navigation-right">
                    <button onClick={() => navigate("/menu")}>Menu</button>
                    {!token && <button id="menu-login-button" onClick={() => navigate("/login?from=/cart")}>Login</button>}
                    {!token && <button id="menu-signup-button" onClick={() => navigate("/register")}>Signup</button>}
                    {token && <button id="menu-orders-button" onClick={() => navigate("/orders")}>Orders</button>}
                    <Logout />
                </div>
            </div>
            <div className='about-container'>
                <div className="about-personal-details-heading">Personal Details</div>
                {token &&
                    (() => {
                        const { customerName, customerMobile, customerEmail, customerAddress, username } = info;
                        return (
                            <article className='about-card'>
                                <div className="about-customer-name"><span id='about-span'>Name :</span>{customerName}</div>
                                <div className="about-customer-username"><span id='about-span'>Username :</span>{username}</div>
                                <div className="about-customer-mobile"><span id='about-span'>Mobile no. :</span>{customerMobile}</div>
                                <div className="about-customer-email"><span id='about-span'>Email :</span>{customerEmail}</div>
                                <div className="about-customer-address"><span id='about-span'>Address :</span>{customerAddress}</div>
                                <button className='about-update-credentials' onClick={() => navigate("/user/update")}>Update credentials</button>
                                <button className='about-update-username' onClick={() => navigate("/user/update_uname")}>Update username</button>
                                <button className='about-update-password' onClick={() => navigate("/user/update_pass")}>Update password</button>
                            </article>
                        )
                    })()
                }
            </div>
            {!token && navigate("/menu")}
        </>
    )
}
