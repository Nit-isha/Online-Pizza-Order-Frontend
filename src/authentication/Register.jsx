import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useUser } from "../hooks/useUser";


export default function Register() {
    const { token } = useUser();

    let navigate = useNavigate();
    const routeChange = () => {
        let path = "/login";
        navigate(path);
    }
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
                        }).then(() => routeChange);
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
                    <br />
                    Have an account?{" "}
                    <input
                        type="button"
                        value="Login"
                        onClick={routeChange}
                    />
                </form>
            }
        </div>
    )
}
