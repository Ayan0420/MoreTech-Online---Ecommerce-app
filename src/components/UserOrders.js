import React, { useContext, useEffect, useState } from 'react'
import { Accordion, Button, Col, Container, Row } from 'react-bootstrap'
import UserContext from '../userContext'
import { Link } from 'react-router-dom';
import Loading from './Loading';
import Swal from 'sweetalert2';
import AddProductreview from './AddProductreview';
import moment from 'moment';

export default function UserOrders() {
    
  const {user} = useContext(UserContext);
  
  //User Orders
  const [orders, setOrders] = useState([]);

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/orders/my-orders`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then(data => {
      setIsLoading(false);
      setOrders(data);
    });
  }, [])
  

  return (
    <>
        <div className='border border-1 bg-white p-3'>
            <h3 className='mb-3'>Order History</h3>
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
                    <Accordion.Item eventKey={`${index}`}>
                      <Accordion.Header className='d-flex'>
                        <span>Purchase Date: {moment(order.purchasedOn).format('MMMM DD, YYYY (kk:MM)')}</span>
                        <span className='ms-auto'>Order ID: {order._id}</span>
                      </Accordion.Header>
                      <Accordion.Body>
                        <p>Products Purchased:</p>
                        <ul>
                          <li>
                            {
                              order.products.map(product => {
                                return (
                                    <>
                                      <p className='my-0'>Product Name: <Link to={`/product/${product.productId._id}`} target='_blank'>{product.productId.productName}</Link></p>
                                      <p className='my-0'>Price: ₱ {product.productId.price}</p>
                                      <p className='my-0'>Quantity: {product.quantity}</p>
                                      <p className='my-0'>Subtotal: ₱ {product.subTotal}</p>
                                      <div className='text-end'>
                                        <AddProductreview productId={product.productId._id}/>
                                      </div>
                                    </>
                                    )
                                  })
                            }
                          </li>
                        </ul>

                        <p className='fw-bold my-0'>Total: ₱ {order.totalAmount}</p>
                        <p className='my-0'>Status: {order.status}</p>
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
