import { useEffect, useState } from "react";
import { useUser } from "./useUser";

export default function useUserInfo() {
    const [userInfo, setUserInfo] = useState({});
    const { token, url } = useUser();

    useEffect(() => {
        fetch(`${url}/customer/about`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then((res) => res.json())
            .then((json) => setUserInfo(json))

    }, [token])

    return userInfo;
}
