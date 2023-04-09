import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import UserContext from '../userContext'

export default function UserInfo() {
    
    const {user} = useContext(UserContext);
  
  //Personal Info
  const [firstName, setFirstName] = useState("null");
  const [lastName, setLastName] = useState("null");
  const [email, setEmail] = useState("null");
  const [address, setAddress] = useState("null");
  const [mobileNo, setMobileNo] = useState("null");

  //My Orders

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then(data => {
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setEmail(data.email);
      setAddress(data.address);
      setMobileNo(data.mobileNo);
    });
  }, [])

  return (
    <>
        <div className='border border-1 bg-light p-3'>
            <h3 className='mb-3'>User Information</h3>
            <h5>Name: {firstName} {lastName}</h5>
            <h5>Email: {email}</h5>
            <h5>Address: {address}</h5>
            <h5>Contact Number: {mobileNo}</h5>
            <Button size='sm' variant='primary mt-3'>Request for Edit</Button>
        </div>


    </>
  )
}
