import React from 'react'
import { useUser } from '../hooks/useUser';
import useUserInfo from '../hooks/useUserInfo';

export default function Payment() {
    const info = useUserInfo();
    const { token } = useUser()

    return (
        <>
            {token &&
                <div className="custname">Hello {info?.customerName}!!</div>

            }
        </>
    )
}
