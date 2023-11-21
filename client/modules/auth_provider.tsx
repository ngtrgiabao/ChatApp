"use client";

import { useRouter } from "next/navigation";
import React, { createContext, useEffect, useState } from "react";

export type UserInfo = {
    username: string;
    id: string;
};

export const AuthContext = createContext<{
    auth: boolean;
    setAuth: (auth: boolean) => void;
    user: UserInfo;
    setUser: (user: UserInfo) => void;
}>({
    auth: false,
    setAuth: () => {},
    user: { username: "", id: "" },
    setUser: () => {},
});

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [auth, setAuth] = useState<boolean>(false);
    const [user, setUser] = useState<UserInfo>({ username: "", id: "" });

    const router = useRouter();

    useEffect(() => {
        const userInfo = localStorage.getItem("user_info");

        if (!userInfo) {
            if (window.location.pathname != "/signup") {
                router.push("/login");
                return;
            }
        } else {
            const user: UserInfo = JSON.parse(userInfo);
            if (user) {
                setUser({
                    username: user.username,
                    id: user.id,
                });
            }
        }
    }, [auth, router]);

    return (
        <AuthContext.Provider
            value={{
                auth: auth,
                setAuth: setAuth,
                user: user,
                setUser: setUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
