
import { useContext, useState } from 'react';

import {InputGroup, Form, Button, Nav, Navbar, Container, Offcanvas} from 'react-bootstrap'


import {Link} from 'react-router-dom';
import UserContext from '../userContext';
import Cart from "./Cart"

export default function AppNavBar() {

  // const [user, setUser] = useState(localStorage.getItem('email'));
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {user} = useContext(UserContext);

  return (
    <>
    <Navbar className="nav navbar-dark pb-0 secondary-nav" bg="primary">
      <Container>
        <Nav>
          <span className='text-light'><i className="fa-solid fa-map-location"></i></span>
          <span className='text-light ms-2' >Gingoog City, Misamis Oriental, Philippines, 9014</span>
        </Nav>
        
        <Nav className="py-0 ms-auto">
        {(user.id !== null) ?
          ((user.isAdmin == true) ?
            <>
              <Nav.Link as={Link} to='/admin-active-products' className="py-0">Admin Dashboard</Nav.Link>
              <span className="text-light">|</span>
              <Nav.Link as={Link} to='/logout' className="py-0">Logout</Nav.Link>
              <span className="text-light">|</span>
              <Nav.Link as={Link} to='/user-orders' className="py-0">My Account</Nav.Link>
            </>
            :
            <>
              <Nav.Link as={Link} to='/logout' className="py-0">Logout</Nav.Link>
              <span className="text-light">|</span>
              <Nav.Link as={Link} to='/user-orders' className="py-0">My Account</Nav.Link>
            </>
            )
          :
          <>
          <Nav.Link as={Link} to='/login' className="py-0">Login</Nav.Link>
          <span className="text-light">|</span>
          <Nav.Link as={Link} to='/register' className="py-0">Register</Nav.Link>
          </>
        }
        </Nav>
      </Container>
      
    </Navbar>
    
    <Navbar className="nav navbar-dark px-3 pb-2 pt-1 mt-0" bg="primary" expand="sm">
        <Container>

                  {/* "as={Link}" attribute will change the current tag to the "Link" component*/}
        <Navbar.Brand as={Link} to='/'><img className='logo' src="../imgs/logo.png" alt="" /></Navbar.Brand>


        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

            {/* <div className='d-flex justfy-content-between'>
            </div> */}
            <Nav className="me-auto text-center align-items-center">
                <Nav.Link as={Link} to='/' >Home</Nav.Link>
                <Nav.Link as={Link} to='/products'>Products</Nav.Link>
                <Nav.Link as={Link} to='/categories'>Categories</Nav.Link>
                <Nav.Link as={Link} to='/categories'>Hot!</Nav.Link>
            </Nav>

            <InputGroup className="mx-4 text-center align-self-center" >
                <Form.Control
                placeholder="Search Products"
                aria-label="Search Products"
                aria-describedby="basic-addon2"
                />
                <Button variant="outline-secondary" id="button-addon2">
                <i className="fa-solid fa-magnifying-glass"></i>
                </Button>
            </InputGroup>

        </Navbar.Collapse>
            <Nav>

              <Nav.Link as={Link} onClick={handleShow}><i className="fa-solid fa-cart-shopping fs-3"></i></Nav.Link>

            </Nav>
        </Container>
    </Navbar>
              <Offcanvas show={show} onHide={handleClose} placement='end'>
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>My Cart</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Cart />
                </Offcanvas.Body>
              </Offcanvas>
    </>
  )
}
