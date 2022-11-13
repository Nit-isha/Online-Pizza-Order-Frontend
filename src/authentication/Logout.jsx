import { useUser } from "../hooks/useUser";
import React from 'react'

export default function Logout() {
    const { token, logout } = useUser();
    return (
        <>
            {token && <button onClick={() => { logout() }}>Logout</button>}
        </>
    )
}
