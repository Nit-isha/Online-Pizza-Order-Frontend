import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useUser } from "../hooks/useUser";
import "../styles/Login.css";

export default function Login() {
    const { token, login, url } = useUser();
    const [validateUser, setValidateUser] = useState();
    let navigate = useNavigate();
    const location = useLocation();
    const [searchParam] = useSearchParams();

    useEffect(() => {
        if (token) {
            navigate("/menu");   //Redirecting to Menu page if already logged in
        }
    }, [token])

    return (
        <>
            {/* ------------ NavBar ------------ */}

            <div className="menu-navigation">
                <div id="menu-heading" onClick={() => navigate("/menu")} style={{ cursor: "pointer" }}><img src={"/logo192.png"}></img>Yolo's Pizza</div>
                <div className="menu-navigation-right">
                    <button onClick={() => navigate("/menu")}>Menu</button>
                    {!token && <button id="menu-signup-button" onClick={() => navigate("/register")}>Signup</button>}
                </div>
            </div>

            {/* ------------ Fetching login API ------------ */}

            <div className="login-container">
                {!token &&
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        const data = new FormData(e.target);   //Create actual data from form element

                        fetch(`${url}/login`, {
                            method: "POST",
                            body: JSON.stringify({
                                username: data.get("userName"),
                                password: data.get("password"),
                            }),
                            headers: {
                                "content-type": "application/json",
                            },
                        })
                            .then(res => {
                                if (!res.ok) {
                                    throw Error("Invalid Username or Password.");
                                }
                                else {
                                    return res.json();

                                }
                            })
                            .then(res => {
                                login(res.token);
                                if (searchParam.has("from")) {
                                    navigate(searchParam.get("from"));
                                    return;
                                }
                                navigate("/menu");
                                toast.success("Successfully Logged In!")
                            }).catch(err => setValidateUser(err.message))

                    }}>

                        {/* ------------ Login credentials ------------ */}

                        <div className='login-page-heading'>Login</div>
                        <label htmlFor="userName" id="login-label-username" >User Name</label>
                        <input type="text" name="userName" id="login-username" required autoFocus placeholder='username' />
                        <br />

                        <label htmlFor="password" id="login-label-password" >Password</label>
                        <input type="password" name="password" id="login-password" required placeholder='password' />
                        <br />
                        <input type="submit" value="Login" id="login-submit-button" /><br />
                        <br />
                        <p id='login-validate-user-error'>{validateUser}</p>
                        <span id='login-signup-button'>Create an account? {" "}</span>
                        <input type="button" value="Signup" id="login-sign-button" onClick={() => navigate("/register")} />
                    </form>
                }
            </div >
        </>
    )
}