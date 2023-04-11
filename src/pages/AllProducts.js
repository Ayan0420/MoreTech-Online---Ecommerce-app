import React from 'react'
import AppNavBar from '../components/AppNavbar'
import ProductSectionAllProducts from '../components/ProductSectionAllProducts'
import { Container } from 'react-bootstrap'
import Footer from '../components/Footer'

export default function AllProducts() {


    
  return (
    <>
    <div className='sticky-top'>
        <AppNavBar />
    </div>
    <Container >
        <h3 className='mt-5 mb-3 fw-bold bg-white p-3 text-center'>All Products</h3>
        <ProductSectionAllProducts />
    </Container>
    <Footer />
    </>
  )
}
