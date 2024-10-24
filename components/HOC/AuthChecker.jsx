'use client'
import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import Spinner from '../Spinner/Spinner'

const AuthChecker = ({ children }) => {
  const { user } = useContext(AuthContext)
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      router.push('/')
    } else {
      setLoading(false)
    }
  }, [user, router])

  if (loading) {
    return <Spinner />
  }

  return (
    <div>{children}</div>
  )
}

export default AuthChecker