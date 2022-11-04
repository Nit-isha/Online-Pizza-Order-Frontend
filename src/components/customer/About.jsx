import React, { useEffect, useState } from 'react'
// import { useUser } from '../hooks/useUser';

export default function About() {
    const [userDetails, setUserDetails] = useState({})
    // const { token } = useUser();

    useEffect(() => {
        const token = localStorage.getItem("token");
        fetch("http://localhost:9001/customer/about", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        })
            .then((res) => res.json())
            .then((json) => setUserDetails(json))

    }, [])

    return (
        <>
            <div className="about">Personal Details</div>
            <div>
                {
                    (() => {
                        const { customerName, customerMobile, customerEmail, customerAddress, username } = userDetails;
                        return (
                            <article>
                                <div className="name">Name : {customerName}</div>
                                <div className="usernam">Username : {username}</div>
                                <div className="mobile">Mobile num : {customerMobile}</div>
                                <div className="email">Email : {customerEmail}</div>
                                <div className="address">Address : {customerAddress}</div>
                            </article>
                        )
                    })()
                }
            </div>
        </>
    )
}
