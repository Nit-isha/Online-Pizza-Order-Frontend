import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';

export default function UpdatePassword() {
    let navigate = useNavigate();
    const { token } = useUser();

    return (
        <>
            <div>Update Password</div>
            <div className="update_pass">
                {
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        const data = new FormData(e.target);

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

                        }).then(() => navigate("/user/about"))
                    }}>

                        <label htmlFor="pass">New Password</label>
                        <input type="password" name="pass" id="pass" required autoFocus />
                        <br />

                        <input type="submit" value="Update" />
                        <br />
                        <input type="button" value="Back" onClick={() => navigate("/user/about")} />
                    </form>
                }
            </div>
        </>
    )
}
