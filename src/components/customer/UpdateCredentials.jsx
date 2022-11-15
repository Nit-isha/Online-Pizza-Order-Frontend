import React from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Logout from '../../authentication/Logout';
import { useUser } from '../../hooks/useUser';
import useUserInfo from '../../hooks/useUserInfo';
import '../../styles/UpdateCredentials.css';


export default function Update() {
    let navigate = useNavigate();
    const { token } = useUser();
    const info = useUserInfo();

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

            <div className="update-container">
                <div className="Update-Personal-Information">Update Credentials</div>
                {
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        const data = new FormData(e.target);

                        fetch("http://localhost:9001/customer/updateDetails", {
                            method: "PUT",
                            headers: {
                                "content-type": "application/json",
                                "Accept": "application/json",
                                "Authorization": "Bearer " + token
                            },
                            body: JSON.stringify({
                                "customerName": data.get("name"),
                                "customerMobile": data.get("mobile"),
                                "customerEmail": data.get("email"),
                                "customerAddress": data.get("address")
                            }),

                        })
                            .then(() => navigate("/user/about"))
                            .then(() => toast.success("Credentials Updated Successfully."))
                    }}>

                        <label htmlFor="name" className="Update-credentials-label">Name</label>
                        <input type="text" name="name" id="update-credentials-name" defaultValue={info?.customerName} required autoFocus Placeholder="Enter name" />
                        <br />
                        <label htmlFor="mobile" className="Update-credentials-label">Mobile</label>
                        <input type="tel" name="mobile" id="update-credentials-mobile" defaultValue={info?.customerMobile} pattern="[6-9][0-9]{9}" required Placeholder="Enter mobile no" />
                        <br />
                        <label htmlFor="email" className="Update-credentials-label">Email</label>
                        <input type="email" name="email" id="update-credentials-email" defaultValue={info?.customerEmail} required Placeholder="Enter email" />
                        <br />
                        <label htmlFor="address" className="Update-credentials-label">Address</label>
                        <input type="text" name="address" id="update-credentials-address" defaultValue={info?.customerAddress} required Placeholder="Enter address" />
                        <br />
                        <input type="submit" value="Update" id="update-credentials-Update" />


                    </form>
                }
            </div>
        </>
    )
}
