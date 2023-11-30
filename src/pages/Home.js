import React from 'react'
import AppNavBar from '../components/AppNavbar'
import { Container } from 'react-bootstrap';
// import ProductCard from '../components/ProductCard'
import BannerCarousel from '../components/BannerCarousel'
import ProductSectionHome from '../components/ProductSectionHome';
import ProductSectionFeatured from '../components/ProductSectionFeatured';
import Footer from '../components/Footer';
import CategoryHome from '../components/CategoryHome';


export default function Home() {
  return (
    <>
      
      <Container>
        
        <h1 className='my-2 my-md-4 home-header text-primary bg-white p-3 text-center'>Get All Your TECH Needs in One Place!</h1>
        <BannerCarousel />

        <h3 className='mt-3 mt-md-5 mb-3 fw-bold bg-white p-3 text-center'>Categories</h3>
        <CategoryHome />

        <h3 className='mt-3 mt-md-5 mb-3 fw-bold bg-white p-3 text-center'>Featured Products</h3>
        <ProductSectionFeatured />
        <h3 className='mt-1 mt-md-5 mb-3 fw-bold bg-white p-3 text-center'>New Arrival!</h3>
        <ProductSectionHome />
        
      </ Container>
      <Footer />
    </>
  )
}
