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

    return (
        <userContext.Provider value={{ token, setToken, login, logout }}>
            {children}
        </userContext.Provider>
    )
}

export const useUser = () => {
    return useContext(userContext)
}