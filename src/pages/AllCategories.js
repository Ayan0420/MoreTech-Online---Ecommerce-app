import React from 'react'
import AppNavBar from '../components/AppNavbar'
import { Container, Row, Col, Card } from 'react-bootstrap'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

export default function AllCategories() {
  return (
    <>
    <Container className='mt-3 mt-md-5 mb-5'>
      <Row className='mb-4'>

        <Col as={Link} to='/category/pc' xs={12} md={6} lg={4}>
          <Card className="bg-white text-primary border-0 product-card align-items-center">
            <Card.Img src="./imgs/cat/cat-pc.png" alt="Card image" />
            <Card.ImgOverlay className='d-flex justify-content-center align-items-center'>
              <Card.Title className='fs-2 fw-bold text-center rounded-4 category-name'>Personal Computers</Card.Title>
              
            </Card.ImgOverlay>
          </Card>
        </Col>

        <Col as={Link} to='/category/laptops' xs={12} md={6} lg={4}>
          <Card className="bg-white text-primary border-0 product-card align-items-center">
            <Card.Img src="./imgs/cat/cat-laptop.jpg" alt="Card image" />
            <Card.ImgOverlay className='d-flex justify-content-center align-items-center'>
              <Card.Title className='fs-2 fw-bold text-center rounded-4 category-name'>Laptops</Card.Title>
              
            </Card.ImgOverlay>
          </Card>
        </Col>

        <Col as={Link} to='/category/smartphones' xs={12} md={6} lg={4}>
          <Card className="bg-white text-primary border-0 product-card align-items-center">
            <Card.Img src="./imgs/cat/cat-phone.jpg" alt="Card image" />
            <Card.ImgOverlay className='d-flex justify-content-center align-items-center'>
              <Card.Title className='fs-2 fw-bold text-center rounded-4 category-name'>Smart Phones</Card.Title>
              
            </Card.ImgOverlay>
          </Card>
        </Col>

      </Row>
      <Row className='mb-4'>

        <Col as={Link} to='/category/tablets' xs={12} md={6} lg={4}>
          <Card className="bg-white text-primary border-0 product-card align-items-center">
            <Card.Img src="./imgs/cat/cat-tablet.png" alt="Card image" />
            <Card.ImgOverlay className='d-flex justify-content-center align-items-center'>
              <Card.Title className='fs-2 fw-bold text-center rounded-4 category-name'>Tablets</Card.Title>
              
            </Card.ImgOverlay>
          </Card>
        </Col>

        <Col as={Link} to='/category/consoles' xs={12} md={6} lg={4}>
          <Card className="bg-white text-primary border-0 product-card align-items-center">
            <Card.Img src="./imgs/cat/cat-consoles.webp" alt="Card image" />
            <Card.ImgOverlay className='d-flex justify-content-center align-items-center'>
              <Card.Title className='fs-2 fw-bold text-center rounded-4 category-name'>Gaming Consoles</Card.Title>
              
            </Card.ImgOverlay>
          </Card>
        </Col>

        <Col as={Link} to='/category/headsets' xs={12} md={6} lg={4}>
          <Card className="bg-white text-primary border-0 product-card align-items-center">
            <Card.Img src="./imgs/cat/cat-headset.avif" alt="Card image" />
            <Card.ImgOverlay className='d-flex justify-content-center align-items-center'>
              <Card.Title className='fs-2 fw-bold text-center rounded-4 category-name'>Headsets and Headphones</Card.Title>
              
            </Card.ImgOverlay>
          </Card>
        </Col>

      </Row>
      <Row className='mb-4'>

        <Col as={Link} to='/category/parts' xs={12} md={6} lg={4}>
          <Card className="bg-white text-primary border-0 product-card align-items-center">
            <Card.Img src="./imgs/cat/cat-parts.jpg" alt="Card image" />
            <Card.ImgOverlay className='d-flex justify-content-center align-items-center'>
              <Card.Title className='fs-2 fw-bold text-center rounded-4 category-name'>Computer Parts</Card.Title>
              
            </Card.ImgOverlay>
          </Card>
        </Col>

        <Col as={Link} to='/category/accessories' xs={12} md={6} lg={4} >
          <Card className="bg-white text-primary border-0 product-card align-items-center">
            <Card.Img src="./imgs/cat/cat-accessories.jpg" alt="Card image" />
            <Card.ImgOverlay className='d-flex justify-content-center align-items-center'>
              <Card.Title className='fs-2 fw-bold text-center rounded-4 category-name'>Accessories</Card.Title>
              
            </Card.ImgOverlay>
          </Card>
        </Col>

        <Col as={Link} to='/category/other' xs={12} md={6} lg={4} >
          <Card className="bg-white text-primary border-0 product-card align-items-center">
            <Card.Img src="./imgs/cat/cat-others.jpg" alt="Card image" />
            <Card.ImgOverlay className='d-flex justify-content-center align-items-center'>
              <Card.Title className='fs-2 fw-bold text-center rounded-4 category-name'>Others</Card.Title>
              
            </Card.ImgOverlay>
          </Card>
        </Col>

      </Row>
    </Container>
    <Footer />
    </>
  )
}
