import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/404.css';

export default function PageNotFound() {
    let navigate = useNavigate();
    return (
        <div className='page-not-found-container'>
            <img src="/images/404.png"></img>
            <div className='page-not-found-message'>
                You entered the wrong page.
            </div>
            <button onClick={() => navigate("/menu")}>Emplore Menu</button>
        </div>
    )
}
