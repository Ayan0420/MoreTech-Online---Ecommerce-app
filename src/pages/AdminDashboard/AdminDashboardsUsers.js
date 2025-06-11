import React, { useContext, useEffect, useState } from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import AdminActionButtons from '../../components/AdminActionButtons';
import AdminSidebar from '../../components/AdminSidebar';
import Loading from '../../components/Loading';
import UserContext from '../../userContext';

export default function AdminDashboardsUsers() {

  //for admin check
  const navigate = useNavigate()
  const {user} = useContext(UserContext);
  
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    //checks isAdmin
    if(user.isAdmin !== true) {
        Swal.fire({
            title: 'You do not have permission to access this page!',
            icon: 'error',
            confirmButtonColor: "#0d6efd",
            text: 'Please contact you admin.'
        });
        navigate('/');
    }

    fetch(`${process.env.REACT_APP_API_URL}/users/all`, {
      method: "GET",
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    
    .then(result => result.json())
    .then(data => {
      console.log(data)
        setIsLoading(false);
        if(data.length === 0) {
            setUsers([]);
        }

        setUsers(
            data.map(user => {
                return(
                    <tr key={user._id}>
                        {/* <td>{user._id}</td> */}
                        <td>{user._id}</td>
                        <td><strong>{user.firstName} {user.lastName}</strong></td>
                        <td>{user.email}</td>
                        <td>{user.address}</td>
                        <td>{user.mobileNo}</td>
                        <td>{user.isAdmin ? 'Yes' : 'No'}</td>
                        <td>{user.isSeller ? 'Yes' : 'No'}</td>
                        <td>
                            <AdminActionButtons 
                              forUsersPage={true} 
                              userId={user._id} 
                              isAdmin={user.isAdmin}
                              isSeller={user.isSeller}
                            />
                        </td>
                 </tr>
                )
            })
        )  
    })
  }, [])
  
  
  return (
    <Row className="vw-100">
        <AdminSidebar />

        <Col xs={9}>
            <h1 className="mt-5">Registered Users</h1>
            {
                (isLoading) ?
                    <Loading msg="Retrieving all active products..."/>
                :
                <>
                    <i className="d-block text-end">List of all users registered to the site.</i>

                    <Table striped className="mt-2 small-font">
                        <thead className="table-header">
                            <tr>
                                {/* <th >Product ID</th> */}
                                <th>UserID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Contact</th>
                                <th>isAdmin</th>
                                <th>isSeller</th>
                                <th>
                                    Set User
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users}
                        </tbody>
                    </Table>
                    {(users.length == 0) ?
                        <p>No active products found</p>
                        :
                        <></>
                    } 
                </>
                }
  
        </Col>
    </Row>
  )
}
