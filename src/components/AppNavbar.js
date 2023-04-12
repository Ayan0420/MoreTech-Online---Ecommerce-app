
import { useContext, useEffect, useState } from 'react';

import {InputGroup, Form, Button, Nav, Navbar, Container, Offcanvas} from 'react-bootstrap'


import {Link, useNavigate, } from 'react-router-dom';
import UserContext from '../userContext';
import Cart from "./Cart"

export default function AppNavBar() {

  const {user} = useContext(UserContext);
  const [show, setShow] = useState(false);

  const navigate = useNavigate()

  const [numberOfCartItems, setNumberOfCartItems] = useState(0)
  const [search, setSearch] = useState('')
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //to update the numberOfCartItems when we delete cart items
  const pulledDataFromCart = (data) => {
    setNumberOfCartItems(data)
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/cart/my-cart`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then(data => {
      if(data.response === false){
        return
      } else {
        setNumberOfCartItems(data.length);
      }
    });
  }, []) 


  function searchFunc(e){
    e.preventDefault();
    
    navigate(`/search?searchQuery=${search}`)
  }

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
              <Nav.Link as={Link} to='/profile' className="py-0">My Account</Nav.Link>
            </>
            :
            <>
              <Nav.Link as={Link} to='/logout' className="py-0">Logout</Nav.Link>
              <span className="text-light">|</span>
              <Nav.Link as={Link} to='/profile' className="py-0">My Account</Nav.Link>
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
                  {/* <Nav.Link as={Link} to='/categories'>Hot!</Nav.Link> */}
              </Nav>

              <InputGroup className="mx-4 text-center align-self-center" >
                  <Form.Control
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        searchFunc(e)
                      }
                }}
                  placeholder="Search Products"
                  aria-label="Search Products"
                  aria-describedby="basic-addon2"
                  />
                  <Button onClick={e => searchFunc(e)} variant="outline-secondary" id="button-addon2">
                  <i className="fa-solid fa-magnifying-glass"></i>
                  </Button>
              </InputGroup>

          </Navbar.Collapse>
              <Nav>

                <Link className='p-0 text-light cart-button position-relative me-3' onClick={handleShow}>
                  <i className="fa-solid fa-cart-shopping fs-3" title="Open Cart"></i>
                  <span className='position-absolute top-0 start-90 translate-middle badge rounded-pill bg-danger'>{numberOfCartItems}</span>
                </Link>

              </Nav>
        </Container>
    </Navbar>
    
              <Offcanvas show={show} onHide={handleClose} placement='end' className="">
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title className='fw-bold'>My Cart</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  { show ?
                  <Cart 
                  pulledDataFromCart={pulledDataFromCart}
                  />
                  :
                  <></> 
                  }

                </Offcanvas.Body>
              </Offcanvas>
    </>
  )
}
