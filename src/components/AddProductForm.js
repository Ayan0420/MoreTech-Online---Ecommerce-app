import { useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";



export default function AddProductForm() {

    const navigate = useNavigate();

    const [productName, setProductName] = useState("")
    const [category, setCategory] = useState("")
    const [price, setPrice] = useState(0);
    const [stocks, setStocks] = useState(0);
    const [productImg, setProductImg] = useState("");
    const [description, setDescription] = useState("");



    function addProduct(e) {
        e.preventDefault();
        // console.log(e)

        fetch(`${process.env.REACT_APP_API_URL}/products/add-product-admin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            // JSON.stringify converts object data into stringified JSON
            body: JSON.stringify({
                productName,
                category,
                price,
                stocks,
                productImg,
                description
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.auth === 'failed' || data.response === false){
                Swal.fire({
                    title: 'Something went wrong!',
                    icon: 'error',
                    confirmButtonColor: "#2c3e50",
                    text: 'Please try again'
                });
            } else {
                Swal.fire({
                    title: 'Product Added Successfully',
                    icon: 'success',
                    confirmButtonColor: "#2c3e50"
                });
                navigate('/admin-all-products');
            }

                
        })
    }

  return (
        // <div>test</div>
   <Container>
        <Form onSubmit={(e) => addProduct(e)} >
            <Row>
                <Col xs={6}>
                    <Form.Group controlId="productName">
                        <Form.Label className="">Product Name</Form.Label>
                        <Form.Control
                            className=""
                            type="text"
                            placeholder="Enter product name here"
                            value={productName}
                            onChange={e => setProductName(e.target.value)}
                            required
                        />
                    </Form.Group>
                </Col>
                <Col xs={3}>
                    <Form.Group controlId="category">
                        <Form.Label className="">Category</Form.Label>
                        <Form.Select
                            className=""
                            value={category}
                            onChange={e => setCategory(e.target.value)}
                            required
                        >
                          <option>Select category</option>
                          <option value='PC'>PCs</option>
                          <option value='Laptops'>Laptops</option>
                          <option value='Smartphones'>Smartphones</option>
                          <option value='Tablets'>Tablets</option>
                          <option value='Consoles'>Consoles</option>
                          <option value='Headsets/Headphones'>Headsets/Headphones</option>
                          <option value='Parts'>Parts</option>
                          <option value='Accessories'>Accessories</option>
                          <option value='Others'>Other Gadgets</option>
                        </Form.Select>

                    </Form.Group>
                </Col>
                <Col xs={3}>
                    <Form.Group controlId="firstName">
                        <Form.Label className="">Price</Form.Label>
                        <InputGroup>
                            <InputGroup.Text className="py-0">₱</InputGroup.Text>
                            <Form.Control
                                className=""
                                type="number"
                                placeholder="Enter first name here"
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                                required
                            />
                        </InputGroup>
                    </Form.Group>
                </Col>
              
            </Row>
            <Row className="mt-3">
              <Col xs={3}>
                  <Form.Group controlId="stocks">
                      <Form.Label className="">Number of Stocks</Form.Label>
                      <Form.Control
                          className=""
                          type="number"
                          placeholder="Enter stocks here"
                          value={stocks}
                          onChange={e => setStocks(e.target.value)}
                          required
                      />
                  </Form.Group>
              </Col>
              <Col xs={3}>
                  <Form.Group controlId="productImg">
                      <Form.Label className="">Product Image</Form.Label>
                      <Form.Control
                          className=""
                          type="string"
                          placeholder="Enter image link here"
                          value={productImg}
                          onChange={e => setProductImg(e.target.value)}
                          required
                      />
                  </Form.Group>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col>
                <Form.Group controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={6} 
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Button variant="primary mt-5" type="submit" id="submitBtn">Add Product</Button>
        </Form>
   </Container>
  )
}
