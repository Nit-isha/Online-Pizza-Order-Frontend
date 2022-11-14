import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Logout from '../../authentication/Logout';
import { useUser } from '../../hooks/useUser';
import '../../styles/UpdateUsername.css';

export default function UpdateUsername() {
    let navigate = useNavigate();
    const { token, logout } = useUser();
    const [validateUserName, setValidateUserName] = useState();

    return (
        <>
            <div className="menu-navigation">
                <div id="menu-heading" onClick={() => navigate("/menu")} style={{ cursor: "pointer" }}><img src={"/logo192.png"}></img>Yolo's Pizza</div>
                <div className="menu-navigation-right">
                    <button onClick={() => navigate("/menu")}>Menu</button>
                    {!token && <button id="menu-login-button" onClick={() => navigate("/login?from=/cart")}>Login</button>}
                    {!token && <button id="menu-signup-button" onClick={() => navigate("/register")}>Signup</button>}
                    {token && <button id="menu-profile-button" onClick={() => navigate("/user/about")}>Profile</button>}
                    {token && <button id="menu-orders-button" onClick={() => navigate("/orders")}>Orders</button>}
                    <Logout />
                </div>
            </div>

            <div className="update-uname-container">
                <div className="Update-Username-Information">Update Username</div>
                {
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        const data = new FormData(e.target);

                        fetch("http://localhost:9001/customer/update_uname", {
                            method: "PUT",
                            headers: {
                                "content-type": "application/json",
                                "Accept": "application/json",
                                "Authorization": "Bearer " + token
                            },
                            body: JSON.stringify({
                                "username": data.get("username")
                            }),

                        })
                            .then(async res => {
                                if (res.ok) {
                                    console.log(res);
                                    logout();
                                    navigate("/menu");
                                    toast.success("Username Successfully Updated.");
                                    toast.info("Please login to continue.")
                                }
                                else {
                                    const error = await res.json();
                                    throw Error(error.msg);
                                }
                            })
                            .catch(err => {
                                setValidateUserName(err.message);
                                toast.error(err.message);
                            })
                    }}>

                        <label htmlFor="username" className="Update-Username-label">Username</label>
                        <input type="text" name="username" id="update-username" required autoFocus Placeholder="Enter Username" />
                        <br />
                        <p id='update-username-validate-name'>{validateUserName}</p>

                        <input type="submit" value="Update" id="username-submit-button" />

                    </form>
                }
            </div>
        </>
    )
}
