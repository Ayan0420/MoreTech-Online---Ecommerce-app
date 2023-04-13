import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function CategoryHome() {
  return (
    <div>
        <Row className='mt-5'>
            <Col as={Link} to='/category/pc' className='text-decoration-none' xs={6} md={3}>
                <Card className='p-3 border-0 bg-primary text-white home-category-card'>
                    <Card.Title className='m-0 text-center'>Personal Computer/Mac</Card.Title>
                </Card>
            </Col>
            <Col as={Link} to='/category/laptops' className='text-decoration-none' xs={6} md={3}>
                <Card className='p-3 border-0 bg-primary text-white home-category-card'>
                    <Card.Title className='m-0 text-center'>Laptop Computers</Card.Title>
                </Card>
            </Col>
            <Col as={Link} to='/category/smartphones' className='text-decoration-none ' xs={6} md={3}>
                <Card className='p-3 border-0 bg-primary text-white home-category-card'>
                    <Card.Title className='m-0 text-center'>Smart Phones</Card.Title>
                </Card>
            </Col>
            <Col as={Link} to='/categories' className='text-decoration-none ' xs={6} md={3}>
                <Card className='p-3 border-0 bg-warning text-white home-category-card-see-more'>
                    <Card.Title className='m-0 text-center'>See More <i className='fa-solid fa-arrow-right'></i></Card.Title>
                </Card>
            </Col>
        </Row>
    </div>
  )
}
