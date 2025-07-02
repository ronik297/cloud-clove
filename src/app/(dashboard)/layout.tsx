import { Children } from '@/props/types'
import React from 'react'

const DashboardLayout = ({ children } : Children) => {
  return (
    <div>{children}</div>
  )
}

export default DashboardLayout