import { useContext, useEffect, useState } from "react";
import { Button, Col, Form, InputGroup, Row, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import UserContext from "../userContext";
import AvgRatingStars from "./AvgRatingStars";
import Loading from "./Loading";

export default function ProductView(props) {
  
  const navigate = useNavigate()
  const {user} = useContext(UserContext)
  const address = user.address;
  const [productName, setProductName] = useState("")
  const [category, setCategory] = useState("")
  const [price, setPrice] = useState(0);
  const [stocks, setStocks] = useState(0);
  const [productImg, setProductImg] = useState("");
  const [description, setDescription] = useState("");
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [isActive, setIsActive] = useState(true);

  const [quantity, setQuantity] = useState(1);

  const {productId} = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [isBtnLoading, setIsBtnLoading] = useState(false)
  const [isAdminViewActive, setIsAdminViewActive] = useState(false);

  const adminView = props.adminView;

  function setAdminView(x){
    if(x === true){
      setIsAdminViewActive(true)
    } else {
      setIsAdminViewActive(false)
    }
  }

  useEffect(() => {

    setAdminView(adminView);

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

  }, [adminView, productId]);
  
  
  function addQuantity(){
    if(quantity >= stocks){
      Swal.fire({
        title: 'Not enough stocks available.',
        icon: 'warning',
        confirmButtonColor: "#2c3e50"
      });
      return
    }
    setQuantity(quantity + 1);
  }
  function subtractQuantity(){
    if(quantity <= 1){
      

      return
    }
    setQuantity(quantity - 1);
  }
  function checkout(){
    if(user.id === null){
      Swal.fire({
        title: 'Please login first!',
        icon: 'warning',
        confirmButtonColor: "#2c3e50",
        confirmButtonText: "Login"

      }).then(res => {
        if(res.isConfirmed){
          navigate('/login')
        }
      });
      return
    }

    if(stocks === 0){
      Swal.fire({
        title: 'No stocks available.',
        icon: 'warning',
        confirmButtonColor: "#2c3e50"
      });
      return
    }

    if(quantity === 0){
      Swal.fire({
        title: 'Please indicate the quantity.',
        icon: 'warning',
        confirmButtonColor: "#2c3e50"
      });
    } else if(user.isAdmin === true || user.isSeller === true ){
      Swal.fire({
        title: `${user.isAdmin === true ? 'Admins' : 'Sellers'} are not allowed to purchase!`,
        icon: 'error',
        confirmButtonColor: "#2c3e50"
      });
    } else {
      Swal.fire({
        title: 'Confirm Checkout',
        html: `
          <h5>Product Name:<strong>${productName.length > 30 ? `${productName.slice(0, 25)}...` : productName}</strong></h5>
          <h5> Unit Price: <strong>₱ ${price.toLocaleString()}</strong> | Quantity: <strong>${quantity}</strong></h5>
          <h4 class="mt-3">TOTAL AMOUNT: <strong class="text-success">₱ ${(quantity*price).toLocaleString()}</strong></h4>
          <div class="mt-5 text-start">
            <p class="mt-3 mb-0 small-font">Shipping to: <strong>${address}</strong></p>
            <p class="small-font">Payment Method: <strong>COD</strong></p>
          </div>
        `, 
        showCancelButton: true,
        confirmButtonColor: "#2c3e50",
        cancelButtonColor: '#d33',
        confirmButtonText: 'Checkout',
        showLoaderOnConfirm: true,
  
        preConfirm: () => {
          return fetch(`${process.env.REACT_APP_API_URL}/orders/check-out`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                // JSON.stringify converts object data into stringified JSON
                body: JSON.stringify({
                  productId: [productId],
                  quantity: [quantity]
                })
            })
            .then(res => res.json())
            .then(data => {
                return data
            })
            .catch(error => {
              console.log(productId, quantity)
              Swal.showValidationMessage(
                `Checkout failed: ${error}`
              )
            })
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'Product Checked Out Successfully',
            icon: 'success',
            confirmButtonColor: "#2c3e50"
          })
          navigate(`/profile`) //change this to my orders
        }
      })
    }

  }
  function addToCart(){
    
    if(user.id === null){
      Swal.fire({
        title: 'Please login first!',
        icon: 'warning',
        confirmButtonColor: "#2c3e50",
        confirmButtonText: "Login"

      }).then(res => {
        if(res.isConfirmed){
          navigate('/login')
        }
      });
      return
    }

    if(user.isAdmin === true || user.isSeller === true ){
      Swal.fire({
        title: `${user.isAdmin === true ? 'Admins' : 'Sellers'} are not allowed to purchase!`,
        icon: 'error',
        confirmButtonColor: "#2c3e50"
      });
        return
    }

    setIsBtnLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/cart/add-to-cart`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        // JSON.stringify converts object data into stringified JSON
        body: JSON.stringify({
          productId: productId,
          quantity: quantity
        })
    })
    .then(res => res.json())
    .then(data => {
      setIsBtnLoading(false);
      Swal.fire({
        title: `${data.message}`,
        icon: 'success',
        confirmButtonColor: "#2c3e50"
      });
      navigate(`/redirect/${productId}`)
    })
    .catch(error => {
      setIsBtnLoading(false);
      Swal.fire({
        title: 'Something Went Wrong!',
        text: `${error}`,
        icon: 'error',
        confirmButtonColor: "#2c3e50"
      });
      
    })
  }

  return (
    (isLoading) ? 
    
    <div className="vh-100">
      <Loading msg={"Loading product details..."}/>
    </div>

    :
    <>
    <div className="bg-white shadow-sm">
      <Row>
        <Col md={5}><img src={`${productImg}`} className="img-fluid p-3 pt-4 mt-4" alt="" /></Col>
        <Col md={7}>
          <div className="px-4 my-3 my-md-5">

            <h4 className="fw-bold text-primary">{productName}</h4>

            <div className="d-flex align-items-center">

              {
                (avgRating === 0) ? <span>No ratings yet</span>
                :
                <>
                  <span className="text-warning me-1">{avgRating.toString().slice(0,3)}</span>
                  <span className="small-font"><AvgRatingStars avgRating={avgRating}/></span>
                  <span className="ms-1">({reviews.length})</span>
                </>
                
              }

              {/* if I have time, add number of sold items */}
              {/* <span className="px-2">|</span>
              <span className="text-danger fst-italic">Sold: 10</span> */}

              <span className="ms-auto fst-italic">Category: {category}</span>

            </div>

            <h3 className="mt-3 text-success fw-bold">₱ {price.toLocaleString()}</h3>
            <p className="mt-3 fw-bold">Description:</p>
            <p>{description}</p>
            
            <p className="mt-4 "><strong>{stocks}</strong> pieces available</p>

            {isAdminViewActive ?
              <>
              <p className="mb-1">Product Id: <strong>{productId}</strong></p>
              <p>Availability: <strong>{isActive ? 'Yes' : 'No'}</strong></p>
              </>
            :
              <div className="mt-2 ">
                <p className="mb-1"> 
                Quantity:
                </p>
                <InputGroup className="quantity mb-3">            
                  <Button variant="outline-dark px-3 py-0 fw-bold fs-4" size="sm" onClick={subtractQuantity}>-</Button>
                  
                  <Form.Control className="text-center"
                    onChange={(e) => setQuantity(e.target.value)}
                    value={quantity}
                  />

                  <Button variant="outline-dark px-3 py-0 fw-bold fs-4" size="sm" onClick={addQuantity}>+</Button>              
                </InputGroup>
                { isBtnLoading ? 
                  <Button variant="warning rounded-0 me-2" disabled>Adding to Cart... <Spinner size="sm" variant="light"/></Button>
                :
                  <Button onClick={addToCart} variant="warning rounded-0 me-2">Add to Cart</Button>
                }

                <Button onClick={checkout} variant="primary rounded-0 me-2">Buy Now</Button>
              </div>

            }
            
          </div>

        </Col>
      </Row>
    </div>
    </>
  )
}
