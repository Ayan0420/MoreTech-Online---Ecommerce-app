import { useContext, useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import UserContext from "../userContext";
import Loading from "./Loading";

export default function Cart({pulledDataFromCart}) {

  const {user} = useContext(UserContext)
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [forCheckOutArr, setForCheckOutArr] = useState([])
  
  useEffect(() => {
    setIsLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/cart/my-cart`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then(data => {
      if(data.response === false){
        setIsLoading(false);
      } else {
        setCart(data);
        setTotalAmount(data.map(item => item.subTotal).reduce((x, y) => x + y));
        setForCheckOutArr(data.map(item => item._id))
        setIsLoading(false);      
      }
    });
  }, []) 
  
  function deleteCartItem(cartIds){

    const {id, ids} = cartIds;
    let cartItem;

    //checks if the id is 
    if(id === undefined){
      cartItem = ids;
    } else if(ids === undefined){
      cartItem = [id]
    }

    setIsLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/cart/remove-cart-items`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      // JSON.stringify converts object data into stringified JSON
      body: JSON.stringify({
        cartItem
      })
    })
    .then(res => res.json())
    .then(data => {
      if(id === undefined){
        setCart([]);
      } else if(ids === undefined){
        //this is to remove the deleted item in the cart array state
        setCart(cart.filter(item => {
          return item._id !== id
        }))

      }
      //to update the cart icon component
      pulledDataFromCart()
      
      Swal.fire({
        title: `${data.message}`,
        icon: 'success',
        confirmButtonColor: "#2c3e50"
      });
      setIsLoading(false);
      
    })

  }

  function checkout(cartItem){

    const {id, cartIds, productId, productName, price, quantity, subTotal, totalAmount} = cartItem;
    let cartItemId;
    let html;
    if(id === undefined){
      html = `
      <h5>Number of Items: <strong>${cart.length}</strong></h5>
      <h4 class="mt-3">TOTAL AMOUNT: <strong class="text-success">₱ ${totalAmount.toLocaleString()}</strong></h4>
      <div class="mt-5 text-start">
        <p class="mt-3 mb-0 small-font">Shipping to: <strong>${user.address}</strong></p>
        <p class="small-font">Payment Method: <strong>COD</strong></p>
      </div>
      `
      cartItemId = cartIds;
    } else if(cartIds === undefined){
      html = `
      <h5>Product Name:<strong>${productName.length > 30 ? `${productName.slice(0, 25)}...` : productName}</strong></h5>
      <h5> Unit Price: <strong>₱ ${price.toLocaleString()}</strong> | Quantity: <strong>${quantity}</strong></h5>
      <h4 class="mt-3">TOTAL AMOUNT: <strong class="text-success">₱ ${(quantity*price).toLocaleString()}</strong></h4>
      <div class="mt-5 text-start">
        <p class="mt-3 mb-0 small-font">Shipping to: <strong>${user.address}</strong></p>
        <p class="small-font">Payment Method: <strong>COD</strong></p>
      </div>
      `
      cartItemId = [id];
    }


    Swal.fire({
      title: 'Confirm Checkout',
      html, 
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
                cartItemId,
              })
          })
          .then(res => res.json())
          .then(data => {
              if(data.response === false){
                Swal.showValidationMessage(
                  `Checkout failed: ${data.message}`
                )
              }
              return data
          })
          .catch(error => {
            
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
        
        pulledDataFromCart() //update cart icon component
        navigate(`/profile`) //change this to my orders
      }
    })


  }

  return (
    (isLoading) ?
    <Loading msg={"Loading cart..."} />
    :
    <>

      {(cart.length === 0) ?
      <div className="p-3 mt-5">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8vxcXbyvy5JHHV_7wMO_HQv-j6aZxX0I5MA&usqp=CAU" className="img-fluid" alt="" />
        <h5 className="text-center">Cart is empty.</h5>
      </div>
      :
      <>
      <div className="mx-2">
        {
          cart.map((cartItem, index) => {
            return (
              <Row key={cartItem._id} className="mb-2">
                <Col className="border border-1 rounded-2 py-2 cart-item-card">
                  <div className="d-flex mb-2">
                    <span>Item #{index + 1}</span>

                    <Button onClick={() => deleteCartItem({id: cartItem._id})} size="sm" variant="white px-1 py-0 ms-auto"><i  className="fa-solid fa-trash text-danger" title="Remove cart item"></i></Button>

                  </div>

                  <h5><Link to={`/product/${cartItem.productId}`} target="_blank" className="text-decoration-none text-primary">{cartItem.productName}</Link></h5>
                  
                  <p className="mb-0">Price: <strong>₱ {cartItem.price.toLocaleString()}</strong></p>
                  <p className="mb-0">Quantity: <strong>{cartItem.quantity}</strong></p>
                  <p className="mb-0">Sub Total: <strong>₱ {cartItem.subTotal.toLocaleString()}</strong></p>
                  <div className="text-center mt-2">

                    <Button onClick={() => checkout({
                      id: cartItem._id,
                      productId: cartItem.productId,
                      productName: cartItem.productName,
                      price: cartItem.price,
                      quantity: cartItem.quantity,
                      subTotal: cartItem.subTotal
                    })} size="sm" variant="warning px-2 py-1 rounded-0" title="Buy this product">
                      <span  className="">Check Out</span>
                    </Button>

                  </div>
                </Col>
              </Row>
            )
          })
        }
      </div>

      <div className="mt-4 border-top pt-4">
          <h5>Total Amount: <strong>₱{totalAmount.toLocaleString()}</strong></h5>
        <div className="text-end mt-5">
          <Button onClick={() => deleteCartItem({ids: forCheckOutArr})} variant="danger me-2 rounded-0" title="Buy this product"><span  className="">Clear Cart</span></Button>
          <Button onClick={() => checkout({
            cartIds: forCheckOutArr,
            totalAmount
          })} variant="primary rounded-0" title="Buy this product"><span  className="">Check Out All</span></Button>
        </div>
      </div>
      </>}
    </>
    
  )
}
