"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { API_URL } from "@/_constants";
import { AuthContext, UserInfo } from "@/modules/auth_provider";

const Login = () => {
    const [email, setEmail] = useState<string>("");
    const [pwd, setPwd] = useState<string>("");
    const { auth } = useContext(AuthContext);

    const router = useRouter();

    useEffect(() => {
        if (auth) {
            router.push("/");
            return;
        }
    }, [auth, router]);

    const submitHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        try {
            const res = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, pwd }),
            });

            const data = await res.json();
            if (res.ok) {
                const user: UserInfo = {
                    username: data.username,
                    id: data.id,
                };

                localStorage.setItem("user_info", JSON.stringify(user));
                return router.push("/");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex items-center justify-center min-w-full min-h-screen">
            <form action="" className="flex flex-col md:w-1/5">
                <div className="text-3xl font-bold text-center">
                    <span className="text-blue">Welcome</span>
                </div>
                <input
                    type="email"
                    placeholder="email"
                    className="p-3 mt-8 rounded-md border-2 border-grey focus:outline-none focus:border-blue"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="password"
                    className="p-3 mt-4 rounded-md border-2 border-grey focus:outline-none focus:border-blue"
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                />
                <button
                    className="p-3 mt-6 rounded-md bg-blue font-bold text-white"
                    type="submit"
                    onClick={submitHandler}
                >
                    login
                </button>
            </form>
        </div>
    );
};

export default Login;
