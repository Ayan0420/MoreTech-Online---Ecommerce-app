import { Col, Row } from "react-bootstrap"
import AddProductForm from "../../components/AddProductForm"
import AdminSidebar from "../../components/AdminSidebar"

import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import UserContext from "../../userContext"

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
        
            <h1 className="mt-5">Add New Product</h1>
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