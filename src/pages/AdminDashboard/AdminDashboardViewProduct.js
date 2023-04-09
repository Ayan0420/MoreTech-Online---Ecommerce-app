import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Col, Row } from "react-bootstrap"

import AdminSidebar from "../../components/AdminSidebar"
import ProductView from "../../components/ProductView"
import ProductReviews from "../../components/ProductReviews"

export default function AdminDashboardViewProduct() {

  return (
    <Row className="vw-100">
        <AdminSidebar />
        <Col xs={9}>
          <h1 className="mt-5">Product Details</h1>
          <ProductView adminView={true}/>
          <ProductReviews />
        </Col>
    </Row> 
  )
}
