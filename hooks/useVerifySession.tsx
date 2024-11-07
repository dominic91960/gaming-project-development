'use strict';
import { useState, useEffect } from "react";
import axios from "axios";
       export const useVerifySession = async () => {
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
                    throw new Error("Session verification failed");
                }
            } catch (error) {
                return false;
            }
        }