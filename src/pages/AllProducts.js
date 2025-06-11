import React from 'react'
import { Container } from 'react-bootstrap'
import Footer from '../components/Footer'
import ProductSectionAllProducts from '../components/ProductSectionAllProducts'

export default function AllProducts() {


    
  return (
    <>
    
    <Container >
        <h3 className='mt-3 mt-md-4 mb-3 fw-bold bg-white p-3 text-center'>All Products</h3>
        <ProductSectionAllProducts />
    </Container>
    <Footer />
    </>
  )
}
