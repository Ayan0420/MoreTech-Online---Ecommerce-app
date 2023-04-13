import { Col, Row } from "react-bootstrap"
import AdminSidebar from "../../components/AdminSidebar"
import UpdateProductForm from "../../components/UpdateProductForm"


export default function AdminDashboardUpdateUser() {
  return (
    <Row className="vw-100">
        <AdminSidebar />
        <Col xs={9}>
          <h1 className="mt-5">Update User Information</h1>
          <UpdateProductForm />
        </Col>
    </Row> 
  )
}
