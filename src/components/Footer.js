import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div className='bg-primary text-white'>
        <Container> 
            <Row>
                <Col md={4} className='d-flex align-items-center'>
                    <p className='small-font mt-3'>Copyright 2022 MORETECH. All rights reserved.</p>
                </Col>
                <Col md={4} className='d-flex align-items-center justify-content-center'>
                    <p className='small-font mt-3'>This is a demo site. <Link to={'https://gitlab.com/b247-cabuntucan/s59-s64-capstone-3/capstone-3'} target='_blank'>Get the source</Link></p>
                </Col>
                <Col md={4}>
                    <p className='small-font mt-3 mb-0 text-end me-md-2'>Developer Socials:</p>
                    <p className='text-end'>
                        <Link to={'https://www.jerryclarkc.site/'} className="text-light" target='_blank'><i className='fa-solid fa-globe'></i></Link>
                        <Link to={'https://www.facebook.com/jerryclarkian.cabuntucan/'} className="text-light ms-2" target='_blank'><i className='fa-brands fa-facebook'></i></Link>
                        <Link to={'https://twitter.com/JerryClarkIan'} className="text-light ms-2" target='_blank'><i className='fa-brands fa-twitter'></i></Link>
                        <Link to={'https://www.linkedin.com/in/jerry-clark-ian-cabuntucan-277223228/'} className="text-light ms-2" target='_blank'><i className='fa-brands fa-linkedin'></i></Link>
                        <Link to={'https://gitlab.com/jerryclarkc0420'} className="text-light ms-2" target='_blank'><i className='fa-brands fa-gitlab'></i></Link>
                        <Link to={'https://github.com/Ayan0420'} className="text-light ms-2" target='_blank'><i className='fa-brands fa-github'></i></Link>
                    </p>
                </Col>
            </Row>
        </Container>    

    </div>
  )
}
