import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import useUserInfo from '../../hooks/useUserInfo';

export default function Update() {
    let navigate = useNavigate();
    const { token } = useUser();
    const info = useUserInfo();

    return (
        <>
            <div>Update personal Information</div>
            <div className="update">
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

                        }).then(() => navigate("/user/about"))
                    }}>

                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" defaultValue={info?.customerName} required autoFocus />
                        <br />
                        <label htmlFor="mobile">Mobile</label>
                        <input type="tel" name="mobile" id="mobile" defaultValue={info?.customerMobile} pattern="[6-9][0-9]{9}" required />
                        <br />
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" defaultValue={info?.customerEmail} required />
                        <br />
                        <label htmlFor="address">Address</label>
                        <input type="text" name="address" id="address" defaultValue={info?.customerAddress} required />
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
