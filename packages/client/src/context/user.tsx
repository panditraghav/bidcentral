import { getAuthHeaders } from "@/utils/headers";
import { SERVER_URL } from "@/utils/url";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";

type UserContextValue = { user: { userId: string, role: string } | null, isLoading: boolean, error: unknown }

export const UserContext = createContext<UserContextValue>({ user: null, isLoading: false, error: null })


export function UserProvider({ children }: { children: React.ReactNode }) {
    const { data, error, isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: () => fetch(
            `${SERVER_URL}/users/auth`,
            `${SERVER_URL}/api/users/auth`,
            {
                headers: {
                    ...getAuthHeaders()
                }
            }).then(res => res.json())
    })

    const value = {
        user: data?.userId ? data : null,
        isLoading,
        error
    }

    return (<
        UserContext.Provider
        value={value}
    >
        {children}
    </UserContext.Provider>)
}

export function useUser() {
    return useContext(UserContext)
}
