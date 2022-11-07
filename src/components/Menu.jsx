import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Logout from '../authentication/Logout';
import useLocalStorage from '../hooks/useLocalStorage';
import { useUser } from "../hooks/useUser";

export default function Menu() {
    const [menu, setmenu] = useState([]);
    const [cart, setCart] = useLocalStorage("cart", []);
    const { token } = useUser();
    let navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:9001/menu", { method: "GET" })
            .then((res) => res.json())
            .then((json) => setmenu(json))

    }, [])

    return (
        <>
            <div>Menu</div>
            {!token && <button onClick={() => navigate("/login")}>Login</button>}
            {!token && <button onClick={() => navigate("/register")}>Signup</button>}
            {token && <button onClick={() => navigate("/user/about")}>About</button>}
            <Logout />

            <div>
                {
                    menu.map((pizza) => {
                        const { pizzaId, pizzaType, pizzaName, pizzaSize, pizzaDescription, pizzaCost } = pizza;
                        return (
                            <>
                                <article key={pizzaId}>
                                    <div className="type">{pizzaType}</div>
                                    <div className="name">{pizzaName}</div>
                                    <div className="size">{pizzaSize}</div>
                                    <div className="desc">{pizzaDescription}</div>
                                    <div className="cost">{pizzaCost}</div>
                                    <button id={pizzaId} onClick={() => setCart([...cart, { pizza }])}>Add to cart</button>

                                </article>
                            </>
                        )
                    })
                }
            </div>
            <br />
            <div className='cart'>
                {
                    cart.map((pizzaSelected) => {
                        const { pizzaId, pizzaType, pizzaName, pizzaSize, pizzaCost } = pizzaSelected?.pizza;
                        return (
                            <article key={pizzaId}>
                                <div className="type">{pizzaType}</div>
                                <div className="name">{pizzaName}</div>
                                <div className="size">{pizzaSize}</div>
                                <div className="cost">{pizzaCost}</div>
                            </article>
                        )
                    })
                }
            </div>
        </>
    )
}
