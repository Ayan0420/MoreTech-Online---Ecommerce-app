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
            <Card.Img src="https://nzxt.com/assets/cms/34299/1666138830-h5-flow-hero-white.png?auto=format&fit=crop&h=1000&w=1000" alt="Card image" />
            <Card.ImgOverlay className='d-flex justify-content-center align-items-center'>
              <Card.Title className='fs-2 fw-bold text-center rounded-4 category-name'>Personal Computers</Card.Title>
              
            </Card.ImgOverlay>
          </Card>
        </Col>

        <Col as={Link} to='/category/laptops' xs={12} md={6} lg={4}>
          <Card className="bg-white text-primary border-0 product-card align-items-center">
            <Card.Img src="https://consumer.huawei.com/content/dam/huawei-cbg-site/south-pacific/ph/mkt/plp/laptops/img/img-0914/matebook-16s-big.jpg" alt="Card image" />
            <Card.ImgOverlay className='d-flex justify-content-center align-items-center'>
              <Card.Title className='fs-2 fw-bold text-center rounded-4 category-name'>Laptops</Card.Title>
              
            </Card.ImgOverlay>
          </Card>
        </Col>

        <Col as={Link} to='/category/smartphones' xs={12} md={6} lg={4}>
          <Card className="bg-white text-primary border-0 product-card align-items-center">
            <Card.Img src="https://d1rlzxa98cyc61.cloudfront.net/catalog/product/cache/1801c418208f9607a371e61f8d9184d9/1/8/182912_2022.jpg" alt="Card image" />
            <Card.ImgOverlay className='d-flex justify-content-center align-items-center'>
              <Card.Title className='fs-2 fw-bold text-center rounded-4 category-name'>Smart Phones</Card.Title>
              
            </Card.ImgOverlay>
          </Card>
        </Col>

      </Row>
      <Row className='mb-4'>

        <Col as={Link} to='/category/tablets' xs={12} md={6} lg={4}>
          <Card className="bg-white text-primary border-0 product-card align-items-center">
            <Card.Img src="https://www.mikronis.hr/_shop/files/products/Huawei%20Mediapad%20T5.png?preset=product-fullsize&id=432" alt="Card image" />
            <Card.ImgOverlay className='d-flex justify-content-center align-items-center'>
              <Card.Title className='fs-2 fw-bold text-center rounded-4 category-name'>Tablets</Card.Title>
              
            </Card.ImgOverlay>
          </Card>
        </Col>

        <Col as={Link} to='/category/consoles' xs={12} md={6} lg={4}>
          <Card className="bg-white text-primary border-0 product-card align-items-center">
            <Card.Img src="https://spy.com/wp-content/uploads/2020/10/619BkvKW35L._SL1500_.jpg" alt="Card image" />
            <Card.ImgOverlay className='d-flex justify-content-center align-items-center'>
              <Card.Title className='fs-2 fw-bold text-center rounded-4 category-name'>Gaming Consoles</Card.Title>
              
            </Card.ImgOverlay>
          </Card>
        </Col>

        <Col as={Link} to='/category/headsets' xs={12} md={6} lg={4}>
          <Card className="bg-white text-primary border-0 product-card align-items-center">
            <Card.Img src="https://www.sony.com.ph/image/1cc1c23c2224adedbaaa8c3e656bef23?fmt=pjpeg&wid=330&bgcolor=FFFFFF&bgc=FFFFFF" alt="Card image" />
            <Card.ImgOverlay className='d-flex justify-content-center align-items-center'>
              <Card.Title className='fs-2 fw-bold text-center rounded-4 category-name'>Headsets and Headphones</Card.Title>
              
            </Card.ImgOverlay>
          </Card>
        </Col>

      </Row>
      <Row className='mb-4'>

        <Col as={Link} to='/category/parts' xs={12} md={6} lg={4}>
          <Card className="bg-white text-primary border-0 product-card align-items-center">
            <Card.Img src="https://gameone.ph/media/catalog/product/cache/7a2235b416a1900151232a782f707140/a/s/asus-tuf-rtx4080-o16gb-oc-ed-gaming-graphics-card-10.jpg" alt="Card image" />
            <Card.ImgOverlay className='d-flex justify-content-center align-items-center'>
              <Card.Title className='fs-2 fw-bold text-center rounded-4 category-name'>Computer Parts</Card.Title>
              
            </Card.ImgOverlay>
          </Card>
        </Col>

        <Col as={Link} to='/category/accessories' xs={12} md={6} lg={4} >
          <Card className="bg-white text-primary border-0 product-card align-items-center">
            <Card.Img src="https://img.fruugo.com/product/8/86/312566868_max.jpg" alt="Card image" />
            <Card.ImgOverlay className='d-flex justify-content-center align-items-center'>
              <Card.Title className='fs-2 fw-bold text-center rounded-4 category-name'>Accessories</Card.Title>
              
            </Card.ImgOverlay>
          </Card>
        </Col>

        <Col as={Link} to='/category/other' xs={12} md={6} lg={4} >
          <Card className="bg-white text-primary border-0 product-card align-items-center">
            <Card.Img src="https://cdn.shopify.com/s/files/1/0605/9710/8945/collections/computer-accessories-onbeli.jpg?v=1657265530" alt="Card image" />
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
