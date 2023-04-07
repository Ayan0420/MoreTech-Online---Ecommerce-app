import { Col, Row, Button, InputGroup, Form } from "react-bootstrap"
import AvgRatingStars from "./AvgRatingStars"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ProductView() {
  
  const [productName, setProductName] = useState("")
  const [category, setCategory] = useState("")
  const [price, setPrice] = useState(0);
  const [stocks, setStocks] = useState(0);
  const [productImg, setProductImg] = useState("");
  const [description, setDescription] = useState("");
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [isActive, setIsActive] = useState(true);

  const [quantity, setQuantity] = useState(0);

  const {productId} = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [isAddBtnActive, setIsAddBtnActive] = useState(true)
  const [isSubtBtnActive, setIsSubtBtnActive] = useState(true)

  useEffect(() => {

    fetch(`${process.env.REACT_APP_API_URL}/products/${productId}/details`)
    .then(res => res.json())
    .then(data => {
      setIsLoading(false);

      setProductName(data.productName);
      setCategory(data.category);
      setDescription(data.description);
      setPrice(data.price);
      setStocks(data.stocks);
      setProductImg(data.productImg);
      setReviews(data.reviews);
      setAvgRating(data.avgRating);
      setIsActive(data.isActive);
            
    })

    
  }, []);
  
  
  function addQuantity(){
    if(quantity >= stocks){
      setIsAddBtnActive(false)
      return
    }
    setQuantity(quantity + 1);
  }

  function subtractQuantity(){
    if(quantity <= 0){
      setIsSubtBtnActive(false)
      return
    }
    setQuantity(quantity - 1);
  }

  return (
    <>
    <div className="bg-white shadow-sm">

      <Row>
        <Col md={5}><img src={`${productImg}`} className="img-fluid p-3" alt="" /></Col>
        <Col md={7}>
          <div className="pe-4 my-5">

            <h4 className="fw-bold text-primary">{productName}</h4>

            <div className="d-flex align-items-center">

              <span className="text-warning me-1">{avgRating}</span>
              <span className="small-font"><AvgRatingStars avgRating={avgRating}/></span>
              <span className="ms-1">({reviews.length})</span>

              <span className="px-2">|</span>
              <span className="text-danger fst-italic">Sold: 10</span>

              <span className="ms-auto fst-italic">Category: {category}</span>

            </div>


            <h3 className="mt-3 text-success fw-bold">₱ {price}</h3>
            <p className="mt-3 fw-bold">Description:</p>
            <p>{description}</p>
            
            <p className="mt-4"><span className="fw-bold"></span>{stocks} pieces available</p>

            <div className="mt-2">
              <p className="mb-1"> 
              Quantity:
              </p>
              <InputGroup className="quantity mb-3">

                {(isSubtBtnActive) ?
                  <Button variant="outline-dark px-3 py-0 fw-bold fs-4" size="sm" onClick={subtractQuantity}>-</Button>
                :
                  <Button variant="outline-dark px-3 py-0 fw-bold fs-4 disabled" size="sm" onClick={subtractQuantity}>-</Button>
                }

                <Form.Control className="text-center"
                  onChange={(e) => setQuantity(e.target.value)}
                  value={quantity}
                />

                {(isAddBtnActive) ?

                  <Button variant="outline-dark px-3 py-0 fw-bold fs-4" size="sm" onClick={addQuantity}>+</Button>
                :
                  <Button variant="outline-dark px-3 py-0 fw-bold fs-4 disabled" size="sm" onClick={addQuantity}>+</Button>
                }
              </InputGroup>
              
              


              <Button variant="warning rounded-0 me-2">Add to Cart</Button>
              <Button variant="primary rounded-0 me-2">Buy Now</Button>
            </div>
          </div>

        </Col>
      </Row>
    </div>
    <div className="bg-white mt-4 p-4">
      <h4>Reviews</h4>
    </div>
    </>
  )
}
