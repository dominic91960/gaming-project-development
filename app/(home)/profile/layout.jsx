import React from 'react'
import AuthChecker from '@/components/HOC/AuthChecker'

const layout = ({children}) => {
  return (
    <AuthChecker>
    <div>{children}</div>
    </AuthChecker>
  )
}

export default layout