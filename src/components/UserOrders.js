import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { Accordion } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserContext from '../userContext';
import AddProductreview from './AddProductreview';
import Loading from './Loading';

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
                   
                          {
                            order.products.map((product, index) => {
                              return (
                                  <li key={index}>
                                    <p className='my-0'>Product Name: <Link to={`/product/${product.productId._id}`} target='_blank'>{product.productId.productName}</Link></p>
                                    <p className='my-0'>Price: ₱ {product.productId.price.toLocaleString()}</p>
                                    <p className='my-0'>Quantity: {product.quantity}</p>
                                    <p className='my-0'>Subtotal: ₱ {product.subTotal.toLocaleString()}</p>
                                    <div className='text-end mb-2'>
                                      <AddProductreview productId={product.productId._id}/>
                                    </div>
                                  </li>
                                  )
                                })
                          }
                         
                        </ul>

                        <p className='fw-bold my-0'>Total: ₱ {order.totalAmount.toLocaleString()}</p>
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
