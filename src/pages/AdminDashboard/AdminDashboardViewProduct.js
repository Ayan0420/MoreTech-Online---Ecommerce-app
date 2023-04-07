import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import AdminSidebar from "../../components/AdminSidebar"
import { Col, Row } from "react-bootstrap"
import ProductView from "../../components/ProductView"


export default function AdminDashboardViewProduct() {

  const {productId} = useParams()

  const [productName, setProductName] = useState("")
  const [category, setCategory] = useState("")
  const [price, setPrice] = useState(0);
  const [stocks, setStocks] = useState(0);
  const [productImg, setProductImg] = useState("");
  const [description, setDescription] = useState("");
  
  useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/products/${productId}/details`)
        .then(res => res.json())
        .then(data => {
            setProductName(data.productName);
            setCategory(data.category);
            setDescription(data.description);
            setPrice(data.price);
            setStocks(data.stocks);
            setProductImg(data.productImg);
        });
    }, [productId]);


  return (
    <Row className="vw-100">
        <AdminSidebar />
        <Col xs={9}>
          <h1 className="mt-5">Product Details</h1>
          <ProductView />
        </Col>
    </Row> 
  )
}
