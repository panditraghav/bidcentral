import { getAuthHeaders } from "@/utils/headers";
import { SERVER_URL } from "@/utils/url";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";

type UserContextValue = { userId: string } | null

export const UserContext = createContext<UserContextValue>(null)


export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserContextValue>(null)
    const { data, error } = useQuery({
        queryKey: ['user'],
        queryFn: () => fetch(
            `${SERVER_URL}/users/auth`,
            {
                headers: {
                    ...getAuthHeaders()
                }
            }).then(res => res.json())
    })

    useEffect(() => {
        console.log(data)
        if (data?.userId) {
            setUser(data)
        } else {
            setUser(null)
        }
        if (error) {
            setUser(null)
        }
    }, [data, error])

    return (<
        UserContext.Provider
        value={user}
    >
        {children}
    </UserContext.Provider>)
}

export function useUser() {
    return useContext(UserContext)
}
