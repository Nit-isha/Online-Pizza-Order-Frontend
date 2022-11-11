import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Logout from '../../authentication/Logout';
import useLocalStorage from '../../hooks/useLocalStorage';
import { useUser } from "../../hooks/useUser";

export default function Menu() {
    const [menu, setmenu] = useState([]);
    const [cart, setCart] = useLocalStorage("cart", []);
    const [filter, setFilter] = useState();
    const [filterType, setFilterType] = useState();
    const [filterSize, setFilterSize] = useState();
    const { token } = useUser();
    let navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:9001/menu", { method: "GET" })
            .then((res) => res.json())
            .then((json) => { setmenu(json) })
    }, [])

    const filteredPizza = menu.filter((pizza) => {
        if (!filter || filter === "none") {
            return true;
        }
        if (pizza.pizzaCost >= parseInt(filter.split("_")[0]) && pizza.pizzaCost < parseInt(filter.split("_")[1])) {
            return true;
        }
    }).filter((pizza) => {
        if (pizza.pizzaType === filterType) { return true }
        if (!filterType || filterType === "none") { return true }
    }).filter((pizza) => {
        if (pizza.pizzaSize === filterSize) { return true }
        if (!filterSize || filterSize === "none") { return true }
    })

    const removeFromCart = (pizza) => {
        let index = cart.indexOf(pizza);
        if (index > -1) {
            cart.splice(index, 1);
            setCart(cart);
        }
    }

    return (
        <>
            <div>Menu</div>
            {!token && <button onClick={() => navigate("/login")}>Login</button>}
            {!token && <button onClick={() => navigate("/register")}>Signup</button>}
            {token && <button onClick={() => navigate("/user/about")}>About</button>}
            {token && <button onClick={() => navigate("/orders")}>Orders</button>}

            <Logout />

            <div className="filterPizza">
                {
                    <>
                        <form>
                            <label for="filterByCost">Filter by Price: </label>
                            <select name="filterByCost" id="filterByCost" onChange={(e) => setFilter(e.target.value)} value={filter}>
                                <option value="none">All</option>
                                <option value="0_300">below 300</option>
                                <option value="300_600">300 - 600</option>
                                <option value="600_900">600 - 900</option>
                                <option value="900_2000">900 and above</option>
                            </select>
                        </form>
                        <form>
                            <label for="filterByType">Filter by Type: </label>
                            <select name="filterByType" id="filterByType" onChange={(e) => setFilterType(e.target.value)} value={filterType}>
                                <option value="none">All</option>
                                <option value="Veg">Veg</option>
                                <option value="Non-Veg">Non-Veg</option>
                            </select>
                        </form>
                        <form>
                            <label for="filterBySize">Filter by Size: </label>
                            <select name="filterBySize" id="filterBySize" onChange={(e) => setFilterSize(e.target.value)} value={filterSize}>
                                <option value="none">All</option>
                                <option value="Regular">Regular</option>
                                <option value="Medium">Medium</option>
                                <option value="Large">Large</option>
                            </select>
                        </form>
                    </>
                }
            </div>
            <div>
                {
                    filteredPizza.map((pizza) => {
                        const { pizzaId, pizzaType, pizzaName, pizzaSize, pizzaDescription, pizzaCost } = pizza;
                        return (
                            <>
                                <article key={pizzaId}>

                                    <div className="image"><img src={`/images/${pizzaId}.jpg`}></img></div>
                                    <div className="pizzatype">{pizzaType}</div>
                                    <div className="pizzaname">{pizzaName}</div>
                                    <div className="pizzasize">{pizzaSize}</div>
                                    <div className="pizzadesc">{pizzaDescription}</div>
                                    <div className="pizzacost">{pizzaCost}</div>
                                    <button id={pizzaId} onClick={() => setCart([...cart, pizza])}>Add to cart</button>
                                </article>
                            </>
                        )
                    })
                }
            </div>
            <br />
            <div className='cartList'>
                {cart.map((pizzaSelected) => {
                    const { pizzaId: id, pizzaType: type, pizzaName: name, pizzaSize: size, pizzaCost: cost } = pizzaSelected;
                    return (
                        <article key={id}>
                            <div className="cartType">{type}</div>
                            <div className="cartName">{name}</div>
                            <div className="cartSize">{size}</div>
                            <div className="cartCost">{cost}</div>
                            <button id={id} onClick={() => {
                                removeFromCart(pizzaSelected);
                                window.location.reload(false);
                            }}>Remove</button>
                        </article>
                    )
                })}
                <button id='checkout' onClick={() => navigate("/cart")} disabled={cart.length === 0}>Checkout</button>
            </div>
        </>
    )
}
