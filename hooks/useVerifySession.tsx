'use strict';
import { useState, useEffect } from "react";
import axios from "axios";
       export const useVerifySession = async () => {
            console.log("Verifying session...", localStorage.getItem("accessToken"));
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
                    return true;
                } else {
                    // setIsVerified(false);
                    // return false;
                    throw new Error("Session verification failed");
                }
            } catch (error) {
                console.log(error);
                // setIsVerified(false);
                return false;
            }
        }