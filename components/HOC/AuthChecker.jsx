'use client'
import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import Spinner from '../Spinner/Spinner'
import axiosInstance from '@/axios/axiosInstance'

const AuthChecker = ({ children }) => {
  const { user } = useContext(AuthContext)
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const verifySession = async () => {
      setLoading(true)
      try {
        const res = await axiosInstance.get('/auth/verify-session')
        if (res.status === 200) {
          return res.data
        }else {
          throw new Error('Session verification failed')
        }
      } catch (error) {
        console.log(error)
        router.push('/')
      }
    }

    verifySession().then(() => setLoading(false))

  }, [user, router])

  if (loading) {
    return <Spinner />
  }

  return (
    <div>{children}</div>
  )
}

export default AuthChecker