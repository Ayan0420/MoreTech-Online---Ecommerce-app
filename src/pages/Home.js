import React from 'react'
import AppNavBar from '../components/AppNavbar'
import { Container } from 'react-bootstrap';

export default function Home() {
  return (
    <>
      <AppNavBar />
      <Container className='vh-100'>
        <div>Home</div>
      </ Container>
    </>
  )
}
