import React, {
    createContext,
    useState,
    ReactNode,
    useContext,
    useEffect,
  } from "react";
  import axiosInstance from "@/axios/axiosInstance";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            setUser(JSON.parse(user));
        }
    }, []);
    
    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    );
}

export const AuthContext = createContext<any>(null);


