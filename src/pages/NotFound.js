import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <Container className='text-center'>
        <h1 className='mt-5 pt-5'>Opps! The page you are accessing doesn't exist.</h1>
        <h4>404 Error</h4>
        <Button as={Link} to='/' className='mt-3'>Go back</Button>
    </Container>
  )
}
