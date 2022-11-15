import { useUser } from "../hooks/useUser";
import React from 'react'
import { toast } from "react-toastify";

export default function Logout() {
    const { token, logout } = useUser();
    return (
        <>
            {/* ------------ Logout button ------------ */}

            {token && <button onClick={() => { logout(); toast.success("Successfully Logged Out!") }}>Logout</button>}

        </>
    )
}
