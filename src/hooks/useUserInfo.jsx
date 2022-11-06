import { useEffect, useState } from "react";
import { useUser } from "./useUser";

export default function useUserInfo() {
    const [userInfo, setUserInfo] = useState({});
    const { token } = useUser();

    useEffect(() => {
        fetch("http://localhost:9001/customer/about", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then((res) => res.json())
            .then((json) => setUserInfo(json))

    }, [token])

    return userInfo;
}
