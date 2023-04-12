
import { Link } from "react-router-dom"
import { Button, Col, Row } from "react-bootstrap"

import AdminSidebar from "../../components/AdminSidebar"
import ProductView from "../../components/ProductView"
import ProductReviews from "../../components/ProductReviews"

export default function AdminDashboardViewProduct() {

  return (
    <Row className="vw-100">
        <AdminSidebar />
        <Col xs={9}>
          <div  className="mt-4">
            <Button variant="warning rounded py-0" size="sm" as={Link} to='/admin-all-products'>Go Back</Button>
          </div>
          <h1 className="mt-2">Product Details</h1>
          <ProductView adminView={true}/>
          <ProductReviews />
        </Col>
    </Row> 
  )
}
