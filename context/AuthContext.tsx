import React, {
    createContext,
    useState,
    ReactNode,
    useContext,
    useEffect,
  } from "react";
  import axiosInstance from "@/axios/axiosInstance";
  
  type AuthContextProps = {
    user: any;
    isUserLoggedIn: () => boolean;
    getUserData: () => any | null;
    setUser: (user: any) => void;
  };
  
  export const AuthContext = createContext<AuthContextProps | undefined>(undefined);
  
  export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            setUser(JSON.parse(user));
        }
    }, []);
  
    useEffect(() => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }, []);
  
    const isUserLoggedIn = () => {
      return !!user;
    };
  
    const getUserData = () => {
      return user || null;
    };
  
    return (
      <AuthContext.Provider value={{ user, isUserLoggedIn, getUserData, setUser }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  // Custom hook to access AuthContext
  export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return context;
  };
  