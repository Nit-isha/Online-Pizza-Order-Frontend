import { createContext, useContext, useState } from "react";
const userContext = createContext();

export const UserProvider = ({ children }) => {
    const [token, setToken] = useState(() => {
        return localStorage.getItem("token");
    });

    const login = (token) => {
        setToken(token);
        localStorage.setItem("token", token);
    }
    const logout = () => {
        setToken(null);
        localStorage.removeItem("token");
    }
    const url = "http://localhost:9001";

    return (
        <userContext.Provider value={{ token, setToken, login, logout, url }}>
            {children}
        </userContext.Provider>
    )
}

export const useUser = () => {
    return useContext(userContext)
}