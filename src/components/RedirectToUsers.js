import React from 'react'
import { Navigate } from 'react-router-dom'

export default function RedirectToUsers() {
  return (
    <Navigate to={'/admin-registered-users'} />
  )
}
