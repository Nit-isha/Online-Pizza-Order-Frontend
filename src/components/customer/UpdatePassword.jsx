import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useUser } from '../../hooks/useUser';

export default function UpdatePassword() {
    let navigate = useNavigate();
    const { token } = useUser();
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");

    return (
        <>
            <div>Update Password</div>
            <div className="update_pass">
                {
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        const data = new FormData(e.target);

                        if (data.get("pass") === data.get("conpass")) {

                            fetch("http://localhost:9001/customer/update_pass", {
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

                        <label htmlFor="pass">New Password</label>
                        <input type="password" name="pass" id="pass" onChange={(e) => setPassword(e.target.value)} value={password} required />
                        <br />
                        <label htmlFor="conpass">Confirm Password</label>
                        <input type="password" name="conpass" id="conpass" onChange={(e) => setConfirmPass(e.target.value)} value={confirmPass} required />
                        <br />
                        <p id="check">
                            {
                                (password && confirmPass && password !== confirmPass) && "Password doesn't match."
                            }
                        </p>
                        <input type="submit" value="Update" disabled={!password || !confirmPass || password !== confirmPass} />
                        <br />
                        <input type="button" value="Back" onClick={() => navigate("/user/about")} />
                    </form>
                }
            </div>
        </>
    )
}
