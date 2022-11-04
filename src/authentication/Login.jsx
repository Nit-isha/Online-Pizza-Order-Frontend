import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useUser } from "../hooks/useUser";

export default function Login() {
    const { token, login } = useUser();

    let navigate = useNavigate();
    const routeRegister = () => { navigate("/register") }
    const routeMenu = () => { navigate("/menu") }

    return (
        <div className="login">
            {!token &&
                <form onSubmit={(e) => {
                    e.preventDefault();
                    const data = new FormData(e.target); //Create actual data from form element //promise
                    fetch("http://localhost:9001/login", {
                        method: "POST",
                        body: JSON.stringify({
                            username: data.get("userName"),
                            password: data.get("password"),
                        }),
                        headers: {
                            "content-type": "application/json",
                        },
                    }).then((res) => {
                        return res.json();
                    }).then((res) => {
                        login(res.token);
                        routeMenu();
                    })

                }}>
                    <label htmlFor="userName">User Name</label>
                    <input type="text" name="userName" id="userName" required autoFocus />
                    <br />
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" required />
                    <br />
                    <input type="submit" value="Login" />
                    <br />
                    Create an account{" "}
                    <input type="button" value="Signup" onClick={routeRegister} />
                </form>
            }
        </div>
    )
}