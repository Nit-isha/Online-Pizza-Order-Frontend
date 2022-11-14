import { useUser } from "../hooks/useUser";
import React from 'react'

export default function Logout() {
    const { token, logout } = useUser();
    return (
        <>
            {/* ------------ Logout button ------------ */}

            {token && <button onClick={() => { logout() }}>Logout</button>}
        </>
    )
}
