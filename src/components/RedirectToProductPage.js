import React from 'react'
import { Navigate, useParams } from 'react-router-dom'

export default function RedirectToUsers() {
    const {productId} = useParams()
  return (
    <Navigate to={`/product/${productId}`} />
  )
}
