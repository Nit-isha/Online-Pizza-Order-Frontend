import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useUser } from '../../hooks/useUser';

export default function UpdateUsername() {
    let navigate = useNavigate();
    const { token, logout } = useUser();
    const [validateUserName, setValidateUserName] = useState();

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

                        })
                            .then(async res => {
                                if (res.ok) {
                                    console.log(res);
                                    logout();
                                    navigate("/menu");
                                    toast.success("Username Successfully Updated.");
                                    toast.info("Please login to continue.")
                                }
                                else {
                                    const error = await res.json();
                                    throw Error(error.msg);
                                }
                            })
                            .catch(err => {
                                setValidateUserName(err.message);
                                toast.error(err.message);
                            })
                    }}>

                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" id="username" required autoFocus />
                        <br />

                        <input type="submit" value="Update" />
                        <br />
                        <input type="button" value="Back" onClick={() => navigate("/user/about")} />
                        <br />
                        <p id='validateUserName'>{validateUserName}</p>
                    </form>
                }
            </div>
        </>
    )
}
