import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';

export default function UpdateUsername() {
    let navigate = useNavigate();
    const { token, logout } = useUser();
    return (
        <>
            <div>Update Username</div>
            <div className="update_uname">
                {
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        const data = new FormData(e.target);

                        fetch("http://localhost:9001/customer/update_uname", {
                            method: "PUT",
                            headers: {
                                "content-type": "application/json",
                                "Accept": "application/json",
                                "Authorization": "Bearer " + token
                            },
                            body: JSON.stringify({
                                "username": data.get("username")
                            }),

                        }).then(logout).then(() => navigate("/menu"))
                    }}>

                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" id="username" required />
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
