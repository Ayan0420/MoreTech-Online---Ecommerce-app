import { Col, Row } from "react-bootstrap"
import AdminSidebar from "../../components/AdminSidebar"
import UpdateProductForm from "../../components/UpdateProductForm"


export default function AdminDashboardUpdateProduct() {
  return (
    <Row className="vw-100">
        <AdminSidebar />
        <Col xs={9}>
          <h1 className="mt-5">Update Product</h1>
          <UpdateProductForm />
        </Col>
    </Row> 
  )
}
