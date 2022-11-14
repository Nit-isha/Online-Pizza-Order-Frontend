import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from "../hooks/useUser";
import Logout from './Logout';
import "../styles/Register.css";

export default function Register() {
    const { token } = useUser();
    const [error, setError] = useState();
    let navigate = useNavigate();

    return (
        <>
            <div className="menu-navigation">
                <div id="menu-heading" onClick={() => navigate("/menu")} style={{ cursor: "pointer" }}><img src={"/logo192.png"}></img>Yolo's Pizza</div>
                <div className="menu-navigation-right">
                    <button onClick={() => navigate("/menu")}>Menu</button>
                    {!token && <button id="menu-signup-button" onClick={() => navigate("/register")}>Signup</button>}
                    {token && <button id="menu-orders-button" onClick={() => navigate("/orders")}>Orders</button>}
                </div>
            </div>
            <div className="register-container">
                <div className="Register-Page">Register</div>
                {!token &&
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            const data = new FormData(e.target); //Create actual data from form element

                            fetch("http://localhost:9001/register", {
                                method: "POST",
                                body: JSON.stringify({
                                    customerName: data.get("name"),
                                    customerMobile: data.get("mobile"),
                                    customerEmail: data.get("email"),
                                    customerAddress: data.get("address"),
                                    username: data.get("userName"),
                                    password: data.get("password"),
                                }),
                                headers: {
                                    "content-type": "application/json",
                                },
                            })
                                .then(async res => {
                                    if (res.ok) {
                                        console.log(res);
                                        navigate("/login");
                                    }
                                    else {
                                        const error = await res.json();
                                        throw Error(error.msg);
                                    }
                                })
                                .catch(err => setError(err.message));
                        }}
                    >
                        <label htmlFor="name" className="register-label">Name</label>
                        <input type="text" name="name" id="register-name" required autoFocus Placeholder="enter name" />
                        <br />
                        <label htmlFor="mobile" className="register-label">Mobile</label>
                        <input
                            type="tel"
                            name="mobile"
                            id="register-mobile"
                            pattern="[6-9][0-9]{9}"
                            required
                            Placeholder="enter mobile"
                        />
                        <br />
                        <label htmlFor="email" className="register-label">Email</label>
                        <input type="email" name="email" id="register-email" required Placeholder="enter email" />
                        <br />
                        <label htmlFor="address" className="register-label" >Address</label>
                        <input type="text" name="address" id="register-address" required Placeholder="enter address" />
                        <br />
                        <label htmlFor="userName" className='register-label'>Username</label>
                        <input type="text" name="userName" id="register-userName" required Placeholder="enter username" />
                        <br />
                        <label htmlFor="password" className='register-label'>Password</label>
                        <input type="password" name="password" id="register-password" required Placeholder="enter password" />
                        <br />
                        <input type="submit" value="Signup" id="register-signup" />
                        <br />
                        <p id="register-invalid-error">{error}</p>
                        <br />
                        <span id='register-have-an-account'>Have an account?{" "}</span>
                        <input
                            type="button"
                            value="Login"
                            id="register-login-button"
                            onClick={() => navigate("/login")}
                        />
                    </form>
                }
            </div>
        </>
    )
}