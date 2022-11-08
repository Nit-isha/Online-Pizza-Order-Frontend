import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useUser } from "../hooks/useUser";

export default function Register() {
    const { token } = useUser();
    const [error, setError] = useState();
    let navigate = useNavigate();

    return (
        <div className="register">
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
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" required autoFocus />
                    <br />
                    <label htmlFor="mobile">Mobile</label>
                    <input
                        type="tel"
                        name="mobile"
                        id="mobile"
                        pattern="[6-9][0-9]{9}"
                        required
                    />
                    <br />
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" required />
                    <br />
                    <label htmlFor="address">Address</label>
                    <input type="text" name="address" id="address" required />
                    <br />
                    <label htmlFor="userName">User Name</label>
                    <input type="text" name="userName" id="userName" required />
                    <br />
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" required />
                    <br />
                    <input type="submit" value="Signup" />
                    <input type="button" value="Back" onClick={() => navigate("/menu")} />
                    <br />
                    <p id="error">{error}</p>
                    <br />
                    Have an account?{" "}
                    <input
                        type="button"
                        value="Login"
                        onClick={() => navigate("/login")}
                    />
                </form>
            }
        </div>
    )
}
