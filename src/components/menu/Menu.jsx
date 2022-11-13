import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Logout from '../../authentication/Logout';
import useLocalStorage from '../../hooks/useLocalStorage';
import { useUser } from "../../hooks/useUser";
import { FaRupeeSign } from 'react-icons/fa';
import '../../styles/Menu.css';

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
        <div className='menu-content'>
            <div className="menu-navigation">
                <div id="menu-heading"><img src={"/logo192.png"}></img>Yolo's Pizza</div>
                <div className="menu-navigation-right">
                    {!token && <button id="menu-login-button" onClick={() => navigate("/login")}>Login</button>}
                    {!token && <button id="menu-signup-button" onClick={() => navigate("/register")}>Signup</button>}
                    {token && <button id="menu-profile-button" onClick={() => navigate("/user/about")}>Profile</button>}
                    {token && <button id="menu-orders-button" onClick={() => navigate("/orders")}>Orders</button>}
                    <Logout />
                </div>
            </div>

            <div className="menu-content-left">

                <div className="menu-filter-pizza">
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
                <div className='menu-content-cards'>
                    {
                        filteredPizza.map((pizza) => {
                            const { pizzaId, pizzaType, pizzaName, pizzaSize, pizzaDescription, pizzaCost } = pizza;
                            return (
                                <>
                                    <article key={pizzaId} className="menu-content-card">
                                        <div className="menu-content-image"><img src={`/images/${pizzaId}.jpg`}></img></div>
                                        <div className="menu-content-pizza-type"><img src={`/images/${pizzaType}.jpg`}></img></div>
                                        <div className='menu-card-content-margin'>
                                            <div className="menu-content-name-cost">
                                                <div className="menu-content-pizza-name">{pizzaName}</div>
                                                <div className="menu-content-pizza-cost"><FaRupeeSign size={13} />{pizzaCost}</div>
                                            </div>
                                            <div className="menu-content-pizza-size">{pizzaSize}</div>
                                            <div className="menu-content-pizza-desc">{pizzaDescription}</div>
                                        </div>
                                        <button id={pizzaId} className="menu-content-add-to-cart" onClick={() => setCart([...cart, pizza])}>Add to cart</button>
                                    </article>
                                </>
                            )
                        })
                    }
                </div>
            </div>
            <div className='menu-cart-list'>
                {cart.map((pizzaSelected) => {
                    const { pizzaId: id, pizzaType: type, pizzaName: name, pizzaSize: size, pizzaCost: cost } = pizzaSelected;
                    return (
                        <article key={id} className="menu-article-cart">
                            <div className='cart-type-name'>
                                <div className="cart-type"><img src={`/images/${type}.jpg`}></img></div>
                                <div className="cart-name">{name}</div>
                            </div>
                            <div className="cart-size">{size}</div>
                            <div className='cart-cost-remove'>
                                <div className="cart-cost"><FaRupeeSign size={13} />{cost}</div>
                                <button id={id} className="menu-cart-remove" onClick={() => {
                                    removeFromCart(pizzaSelected);
                                    window.location.reload(false);
                                }}>Remove</button>
                            </div>
                        </article>
                    )
                })}
                {cart.length !== 0 ? <button id='menu-cart-checkout' onClick={() => navigate("/cart")} disabled={cart.length === 0}>Checkout</button> : <div className='menu-cart-empty-cart'><img src="/images/emptyCart.png"></img><div className='empty-cart-message'>Oops! Your cart looks empty.</div></div>}
            </div>
        </div>
    )
}
