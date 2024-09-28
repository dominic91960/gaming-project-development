"use client"

import React from 'react'
import { Toaster } from 'react-hot-toast'

const providers = ({children}) => {
  return (
    <div>
        <Toaster />
        {children}
    </div>
  )
}

export default providers
