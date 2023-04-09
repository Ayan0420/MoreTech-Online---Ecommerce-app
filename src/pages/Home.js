import React from 'react'
import AppNavBar from '../components/AppNavbar'
import { Container } from 'react-bootstrap';
// import ProductCard from '../components/ProductCard'
import BannerCarousel from '../components/BannerCarousel'
import ProductSectionHome from '../components/ProductSectionHome';
export default function Home() {
  return (
    <>
      <div className='sticky-top'>
        <AppNavBar />
      </div>
    
      <Container>
        
        <h1 className='my-4 home-header text-primary bg-white p-3 text-center'>Get All Your TECH Needs in One Place!</h1>
        <BannerCarousel />

        <h3 className='mt-5 mb-3 fw-bold bg-white p-3 text-center'>New Arrival!</h3>
        <ProductSectionHome />
        
      </ Container>
    </>
  )
}
