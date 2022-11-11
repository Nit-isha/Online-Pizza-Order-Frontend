import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useUser } from "../hooks/useUser";
import { toast } from 'react-toastify';

export default function Login() {
    const { token, login } = useUser();
    const [validateUser, setValidateUser] = useState();
    let navigate = useNavigate();

    return (
        <div className="login">
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
                    <input type="button" value="Back" onClick={() => navigate(-1)} /><br />
                    <label htmlFor="userName">User Name</label>
                    <input type="text" name="userName" id="userName" required autoFocus />
                    <br />

                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" required />
                    <br />
                    <input type="submit" value="Login" /><br />
                    <input type="button" value="Explore menu" onClick={() => navigate("/menu")} />
                    <br />
                    <p id='validateUser'>{validateUser}</p>
                    Create an account{" "}
                    <input type="button" value="Signup" onClick={() => navigate("/register")} />
                </form>
            }

        </div >
    )
}
