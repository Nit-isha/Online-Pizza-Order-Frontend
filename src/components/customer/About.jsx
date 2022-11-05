import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';

export default function About() {
    const [userDetails, setUserDetails] = useState({})
    const { token } = useUser();
    let navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:9001/customer/about", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then((res) => res.json())
            .then((json) => setUserDetails(json))

    }, [token])

    return (
        <>
            <div className="about">Personal Details</div>
            <button onClick={() => navigate("/menu")}>Home</button>
            <div>
                {
                    (() => {
                        const { customerName, customerMobile, customerEmail, customerAddress, username } = userDetails;
                        return (
                            <article>
                                <div className="name">Name : {customerName}</div>
                                <div className="usernam">Username : {username}</div>
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
