import { useEffect, useState } from "react";
import { AppContext } from "./AppContext";

export default function AppProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [user, setUser] = useState(null);
    // const {setLoading} = useState(true);

    async function getUser(token) {
        if (!token) {
            setUser(null);
            // setLoading(false);
            return;
        }

        try {
            const res = await fetch('/api/user', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (res.ok) {
                const data = await res.json();
                setUser(data);
            } else {
                // Token is invalid
                setUser(null);
                setToken(null);
                localStorage.removeItem("token");
            }
        } catch (error) {
            console.error("Failed to fetch user:", error);
            setUser(null);
        } finally {
            // setLoading(false);
        }
    }

    useEffect(() => {
        getUser(token);
    }, [token]);

    const value = {
        token,
        setToken: (newToken) => {
            setToken(newToken);
            if (newToken) {
                localStorage.setItem("token", newToken);
            } else {
                localStorage.removeItem("token");
                setUser(null);
            }
        },
        user,
        setUser
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}