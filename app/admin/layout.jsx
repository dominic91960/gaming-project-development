'use client'
import React, { useState, useEffect } from 'react';
import { CategoryProvider } from "@/context/CategoryContext";
import { SidebarProvider } from "@/context/SidebarContext";
import Spinner from "@/components/Spinner/Spinner";
import { AuthProvider } from "@/context/AuthContext";
import { OrderProvider } from "@/context/OrderContext";
import { WishlistProvider } from "@/context/WishListContext";
import { RoleProvider } from '@/context/RoleContext';
import axios from 'axios';

const Layout = ({ children }) => {
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const verifyAdmin = async () => {
            setIsAuthorized(false);
            const user = localStorage.getItem("user");
            const accessToken = localStorage.getItem("accessToken");

            if (user && accessToken) {
                try {
                    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-session`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    });

                    if (res.status === 200) {
                        const parsedUser = JSON.parse(user);
                        if (parsedUser.role.name === "ADMIN") {
                            setIsAuthorized(true);
                            return;
                        }else{
                            window.location.href = '/';
                            return;
                        }
                    }
                } catch (error) {
                    console.error("Verification failed:", error);
                }
            }

            // Clear storage and redirect on failure
            localStorage.clear();
            window.location.href = '/';
        };

        verifyAdmin();
    }, []); // Empty dependency array to ensure it runs only once

    return (
        <>
            {isAuthorized ? (
                <AuthProvider>
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
                </AuthProvider>
            ) : (
                <Spinner loading={!isAuthorized} />
            )}
        </>
    );
};

export default Layout;
