import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Logout from '../authentication/Logout';
import { useUser } from "../hooks/useUser";

export default function Menu() {
    const [menu, setmenu] = useState([]);
    const { token } = useUser();

    useEffect(() => {
        fetch("http://localhost:9001/menu", { method: "GET" })
            .then((res) => res.json())
            .then((json) => setmenu(json))

    }, [])

    let navigate = useNavigate();
    const routeRegister = () => { navigate("/register") }
    const routeLogin = () => { navigate("/login") }

    return (
        <>
            <div>Menu</div>
            {!token && <button onClick={() => routeLogin()}>Login</button>}
            {!token && <button onClick={() => routeRegister()}>Signup</button>}
            <Logout />

            <div>
                {menu.map((pizza) => {
                    const { pizzaId, pizzaType, pizzaName, pizzaDescription, pizzaCost } = pizza;
                    return (
                        <article key={pizzaId}>
                            <div className="type">{pizzaType}</div>
                            <div className="name">{pizzaName}</div>
                            <div className="desc">{pizzaDescription}</div>
                            <div className="cost">{pizzaCost}</div>
                            <button>Add to cart</button>
                        </article>
                    )
                })}
            </div>
        </>
    )
}
