import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton"
import { useRecoilState } from 'recoil';
import { credit } from '@/stores/atoms/credit';
export default function ProtectedRoutes() {
    const [credits, setCredits] = useRecoilState(credit)
    const [isLoading, setIsLoading] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        async function checkToken() {
            try {
                const token = localStorage.getItem('token')
                if (!token) {
                    throw new Error("Token not found")
                };
                await axios.get(`${import.meta.env.VITE_URL}/user/token`,
                    {
                        headers: { Authorization: token }
                    }
                )
                const creditRes = await axios.get(`${import.meta.env.VITE_URL}/credit/credits`,
                    {
                        headers: { Authorization: token }
                    }
                )
                setCredits(creditRes.data.credits)
                setIsLoggedIn(true)
            } catch (error) {
                setIsLoggedIn(false)
            }
            finally {
                setIsLoading(false)
            }
        }
        checkToken()
    }, [])
    if (isLoading) {
        return (

            <div className="h-screen w-screen  bg-dark flex items-center justify-center">
                <Skeleton className='h-[95%] w-[95%] bg-stone-600' />
            </div>
        )
    }
    return isLoggedIn ?
        (<Outlet />)
        :
        <Navigate to={'/models'} />
}
