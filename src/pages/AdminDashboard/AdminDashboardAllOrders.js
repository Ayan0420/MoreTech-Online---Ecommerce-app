import React from 'react'
import { Col, Row } from 'react-bootstrap'
import AdminSidebar from '../../components/AdminSidebar'
import AllOrders from '../../components/AllOrders'

export default function AdminDashboardAllOrders() {
  return (
    <Row className="vw-100">
        <AdminSidebar />
        <Col xs={9}>
            <div className="mt-5 px-0">
                <h1>All Orders</h1>
                <i className="d-block text-end">List of all order transactions.</i>
                <AllOrders />
            </div>
        </Col>
    </Row> 
  )
}
