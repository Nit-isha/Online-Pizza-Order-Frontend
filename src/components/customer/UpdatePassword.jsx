import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Logout from '../../authentication/Logout';
import { useUser } from '../../hooks/useUser';
import '../../styles/UpdatePassword.css';


export default function UpdatePassword() {
    let navigate = useNavigate();
    const { token, url } = useUser();
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");

    return (
        <>
            <div className="menu-navigation">
                <div id="menu-heading" onClick={() => navigate("/menu")} style={{ cursor: "pointer" }}><img src={"/logo192.png"}></img>Yolo's Pizza</div>
                <div className="menu-navigation-right">
                    <button onClick={() => navigate("/menu")}>Menu</button>
                    {!token && <button id="menu-login-button" onClick={() => navigate("/login?from=/cart")}>Login</button>}
                    {token && <button id="menu-profile-button" onClick={() => navigate("/user/about")}>Profile</button>}
                    {!token && <button id="menu-signup-button" onClick={() => navigate("/register")}>Signup</button>}
                    {token && <button id="menu-orders-button" onClick={() => navigate("/orders")}>Orders</button>}
                    <Logout />
                </div>
            </div>

            <div className="update-password-container">
                <div className="Update-Password-Information">Update Password</div>
                {
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        const data = new FormData(e.target);

                        if (data.get("pass") === data.get("conpass")) {

                            fetch(`${url}/customer/update_pass`, {
                                method: "PUT",
                                headers: {
                                    "content-type": "application/json",
                                    "Accept": "application/json",
                                    "Authorization": "Bearer " + token
                                },
                                body: JSON.stringify({
                                    "password": data.get("pass")
                                }),

                            })
                                .then(() => navigate("/user/about"))
                                .then(() => toast.success("Password Updated Successfully."))
                        }
                    }}
                    >

                        <label htmlFor="pass" className="Update-Password-label">New Password</label>
                        <input
                            type="password"
                            name="pass"
                            id="update-password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                            Placeholder="Enter New Password"
                            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                            title='Must contain atleast: 1 uppercase, 1 lowercase, 1 number, 1 symbol and 8 letters.'
                        />
                        <br />
                        <label htmlFor="conpass" className="Update-Password-label">Confirm Password</label>
                        <input
                            type="password"
                            name="conpass"
                            id="confirm-password"
                            onChange={(e) => setConfirmPass(e.target.value)}
                            value={confirmPass}
                            required
                            Placeholder="Confirm password"
                            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                            title='Must contain atleast: 1 uppercase, 1 lowercase, 1 number, 1 symbol and 8 letters.'
                        />
                        <br />
                        <p id="check">
                            {
                                (password && confirmPass && password !== confirmPass) && "Password doesn't match."
                            }
                        </p>
                        <input type="submit" value="Update" id="password-submit-button" disabled={!password || !confirmPass || password !== confirmPass} />

                    </form>
                }
            </div>
        </>
    )
}
