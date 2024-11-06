'use client'
import React, {useState, useEffect} from 'react'
import { CategoryProvider } from "@/context/CategoryContext";
import { SidebarProvider } from "@/context/SidebarContext";
import Spinner from "@/components/Spinner/Spinner";
import { AuthProvider } from "@/context/AuthContext";
import { OrderProvider } from "@/context/OrderContext";
import { WishlistProvider } from "@/context/WishListContext";
import { RoleProvider } from '@/context/RoleContext';
import { useRouter } from 'next/navigation';

const layout = ({ children }) => {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);
    
  useEffect(() => {
    const verification = async () =>{
        setIsAuthorized(false);
      const user = localStorage.getItem("user");
      if (user && localStorage.getItem("accessToken")) {
        try {
          const res = await axios.get(
              process.env.NEXT_PUBLIC_BASE_URL + "/auth/verify-session",
              {
                  headers: {
                      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                  },
              }
          );
          if (res.status === 200) {
            console.log("Authorized");
              const parsedUser = JSON.parse(user);
              if (parsedUser.role.name === "ADMIN") {
                setIsAuthorized(true);
                return;
              }else{
                setIsAuthorized(false)
                window.location.href='/';
                return;
              }
          } else {
            throw new Error("Unauthorized");
          }
      } catch (error) {
          setIsAuthorized(false);
          localStorage.clear();
          window.location.href='/';
          return;
      }
      } else {
        setIsAuthorized(false);
        localStorage.clear();
        window.location.href='/';
        return;
      }

    }

    verification();
  }, []);
  return (
    <>
    {isAuthorized ? <AuthProvider>
      <CategoryProvider>
        <RoleProvider>
          <OrderProvider>
            <WishlistProvider>
              <SidebarProvider>
                <div>{children}</div>
              </SidebarProvider>
            </WishlistProvider>
          </OrderProvider>
        </RoleProvider>
      </CategoryProvider>
    </AuthProvider>: <Spinner loading={!isAuthorized} />}
    </>
  )
}

export default layout