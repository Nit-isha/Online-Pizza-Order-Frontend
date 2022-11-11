import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useUser } from "../hooks/useUser";

export default function Login() {
    const { token, login } = useUser();
    const [validateUser, setValidateUser] = useState();
    let navigate = useNavigate();

    return (
        <div className="login-container">
            {!token &&
                <form onSubmit={(e) => {
                    e.preventDefault();
                    const data = new FormData(e.target);   //Create actual data from form element

                    fetch("http://localhost:9001/login", {
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
                            navigate(-1);
                        }).catch(err => setValidateUser(err.message))

                }}>
                    <label htmlFor="userName" id="login-label-username" >User Name</label>
                    <input type="text" name="userName" id="login-username" required autoFocus />
                    <br />

                    <label htmlFor="password" id="login-label-password" >Password</label>
                    <input type="password" name="password" id="login-password" required />
                    <br />
                    <input type="submit" value="Login" id="login-submit-button" /><br />
                    <input type="button" value="Explore menu" id="login-navigate-button" onClick={() => navigate("/menu")} />
                    <br />
                    <p id='login-validate-user-error'>{validateUser}</p>
                    Create an account{" "}
                    <input type="button" value="Signup" id="login-sign-button" onClick={() => navigate("/register")} />
                </form>
            }

        </div >
    )
}
