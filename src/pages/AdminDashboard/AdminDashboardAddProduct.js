import { Col, Row, Container } from "react-bootstrap"
import AdminSidebar from "../../components/AdminSidebar"
import AddProductForm from "../../components/AddProductForm"

import { useNavigate } from "react-router-dom"
import UserContext from "../../userContext"
import Swal from "sweetalert2"
import { useContext, useEffect } from "react"

export default function AdminDashboardAddProduct() {

   //for admin check
   const navigate = useNavigate()
   const {user} = useContext(UserContext);

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
   }, [])

  return (
    <Row className="vw-100">
        <AdminSidebar />

        <Col xs={9}>
        
            <h1 className="mt-5">Add a New Product</h1>
            <AddProductForm />
  
        </Col>
    </Row>
  )
}






//template

{/* <Row className="vw-100">
    <AdminSidebar />
    <Col xs={9}>
        //content here...
    </Col>
</Row> */}