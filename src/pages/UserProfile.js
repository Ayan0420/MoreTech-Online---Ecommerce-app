
import { Col, Container, Row } from 'react-bootstrap'
import UserInfo from '../components/UserInfo'
import UserOrders from '../components/UserOrders'

export default function UserProfile() {
  
  return (
    <>
      <Container className='mb-5'>
        <h2 className='my-4'>My Profile</h2>
        <Row>
          <Col md={4} >
            <UserInfo />
          </Col>
          <Col md={8}>
            <UserOrders />
          </Col>
        </Row>
      </Container>
    </>  
  )
}
