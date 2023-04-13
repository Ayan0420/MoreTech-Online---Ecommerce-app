import React, { useContext, useEffect, useState } from 'react'
import { Accordion, Button, Col, Container, Row } from 'react-bootstrap'
import UserContext from '../userContext'
import { Link } from 'react-router-dom';
import Loading from './Loading';
// import Swal from 'sweetalert2';
import AddProductreview from './AddProductreview';
import moment from 'moment';

export default function UserOrders() {
    
  // const {user} = useContext(UserContext);
  
  //User Orders
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/orders`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then(data => {
      setIsLoading(false);

      setOrders(data);

      setProducts(data.map(item => {
        return item
      }).map(product => product.products))

    });
  }, [])
  

  return (
    <>
        <div className='border border-1 bg-white p-3'>
            {
              isLoading ?
              <Loading msg={"Loading all orders..."}/>
              :
              <Accordion>
              {
                orders.response === false ?
                <span>You have no orders.</span>
                :
                orders.map((order, index) => {
                  return (
                    <Accordion.Item eventKey={`${order._id}`}>
                      <Accordion.Header className='d-flex'>
                      
                            <span>Customer: {order.userId.firstName} {order.userId.lastName}</span>
                            <span className='mx-2'>|</span>
                            <span>Purchase Date: {moment(order.purchasedOn).format('MMMM DD, YYYY (kk:MM)')}</span>
                            <span className='mx-2'>|</span>
                            <span>Order ID: {order._id }</span>
                       
                      </Accordion.Header>
                      <Accordion.Body>
                        <Row>
                          <Col>
                            <p>Order ID: <span className='fw-bold'>{order._id }</span></p>
                            <h5>Customer Info:</h5>
                            <p className='ms-3 mb-0'>Name: <strong>{order.userId.firstName} {order.userId.lastName}</strong></p>
                            <p className='ms-3 mb-0'>User ID: <strong>{order.userId._id}</strong></p>
                            <p className='ms-3 mb-0'>Address: <strong>{order.userId.address}</strong></p>
                            <p className='ms-3 mb-3'>Contact Number: <strong>{order.userId.mobileNo}</strong></p>
                          </Col>
                        </Row>
                        <h5>Products Purchased:</h5>
                        <ul>
                         
                            {
                              products[index].map((product, index) => {
                                // console.log('product', product.productId._id)
                                return (
                                    <li>
                                      <p className='my-0'>Product Name: <Link to={`/product/${product.productId._id}`} target='_blank'>{product.productId.productName}</Link></p>
                                      <p className='my-0'>Price: ₱ {product.productId.price}</p>
                                      <p className='my-0'>Quantity: {product.quantity}</p>
                                      <p className='my-0'>Subtotal: ₱ {product.subTotal}</p>
                                      
                                    </li>
                                )
                              })
                            }
                        </ul>

                        <h5 className='fw-bold mb-2'>Total: ₱ {order.totalAmount}</h5>
                        <h5 className='my-0'>Status: <i>{order.status}</i></h5>
                      </Accordion.Body>
                    </Accordion.Item>
                  ) //end of return

                }) //end of map
              }
              </Accordion>
            }
        </div>


    </>
  )
}
