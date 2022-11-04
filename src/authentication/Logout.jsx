import { useUser } from "../hooks/useUser";

import React from 'react'

export default function Logout() {
    const { token, logout } = useUser();
    return (
        <div className="logout">
            {token && <button onClick={() => { logout() }}>Logout</button>}
        </div>
    )
}
