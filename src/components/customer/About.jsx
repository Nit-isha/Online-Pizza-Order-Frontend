import React from 'react';
import { useNavigate } from 'react-router-dom';
import useUserInfo from '../../hooks/useUserInfo';

export default function About() {
    let navigate = useNavigate();
    const info = useUserInfo();

    return (
        <>
            <div className="about">Personal Details</div>
            <button onClick={() => navigate("/menu")}>Home</button>
            <div>
                {
                    (() => {
                        const { customerName, customerMobile, customerEmail, customerAddress, username } = info;
                        return (
                            <article>
                                <div className="name">Name : {customerName}</div>
                                <div className="username">Username : {username}</div>
                                <div className="mobile">Mobile no. : {customerMobile}</div>
                                <div className="email">Email : {customerEmail}</div>
                                <div className="address">Address : {customerAddress}</div>
                                <button onClick={() => navigate("/user/update")}>Update credentials</button>
                                <button onClick={() => navigate("/user/update_uname")}>Update username</button>
                                <button onClick={() => navigate("/user/update_pass")}>Update password</button>
                            </article>
                        )
                    })()
                }
            </div>
        </>
    )
}
