import { useEffect, useState } from "react";

export default function useLocalStorage(key, initialValue) {

    const [state, setState] = useState(initialValue);
    const setValue = (value) => {
        setState(value);
        localStorage.setItem(key, JSON.stringify(value));
    }
    useEffect(() => {
        const itemValue = localStorage.getItem(key);
        setState(itemValue ? JSON.parse(itemValue) : initialValue)
    }, [])


    return [state, setValue];
}