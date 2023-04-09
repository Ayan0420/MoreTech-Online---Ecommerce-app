import React, { useContext, useEffect, useState } from 'react'
import { Accordion, Button, Col, Container, Row } from 'react-bootstrap'
import UserContext from '../userContext'

export default function UserOrders() {
    
    const {user} = useContext(UserContext);
  
  //User Orders
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/orders/my-orders`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then(data => {
      setOrders(data)
    });
  }, [])
  
  console.log(orders);
  return (
    <>
        <div className='border border-1 bg-white p-3'>
            <h3 className='mb-3'>Order History</h3>
            <Accordion>
              {
                orders.length == 0 ?
                <span>You have no orders.</span>
                :
                orders.map((order, index) => {
                  return (
                    <Accordion.Item eventKey={`${index}`}>
                      <Accordion.Header className='d-flex'>
                        <span>Purchased Date: {order.purchasedOn.slice(0, 10)}</span>
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
                                      <p className='my-0'>Product Name: {product.productId.productName}</p>
                                      <p className='my-0'>Price: ₱ {product.productId.price}</p>
                                      <p className='my-0'>Quantity: {product.quantity}</p>
                                      <p className='my-0'>Subtotal: ₱ {product.subTotal}</p>
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
                  )

                })
              }
              </Accordion>
        </div>


    </>
  )
}
