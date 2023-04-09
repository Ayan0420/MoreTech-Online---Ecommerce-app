
import { useEffect, useState } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import StarRatings from "react-star-ratings";
import Swal from "sweetalert2";


function MyVerticallyCenteredModal(props) {
    
    const navigate = useNavigate();

    const [rating, setRating] = useState(0);
    const [comment, setComments] = useState("");
    
    const [isLoading, setIsLoading] = useState(false)
    const [isBtnActive, setIsBtnActive] = useState(false)

    const productId = props.productId;

    function addReview(e){

      console.log(rating, comment)
      console.log(productId);

      e.preventDefault();
      setIsLoading(true);
      //LAST PROGRESS
      fetch(`${process.env.REACT_APP_API_URL}/products/${productId}/add-review`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          // JSON.stringify converts object data into stringified JSON
          body: JSON.stringify({
              rating,
              comment
          })
      })
      .then(res => res.json())
      .then(data => {
          setIsLoading(false);

          if(data.auth === 'failed'){
              Swal.fire({
                  title: 'Something went wrong!',
                  icon: 'error',
                  confirmButtonColor: "#2c3e50",
                  text: 'Please try again'
              });
          } else if(data.response === false){
            Swal.fire({
              title: `You already gave a review on this product.`,
              icon: 'error',
              confirmButtonColor: "#2c3e50"
          });
          } else {
              Swal.fire({
                  title: `${data.message}`,
                  icon: 'success',
                  confirmButtonColor: "#2c3e50"
              });
              navigate(`/product/${productId}`);
          }

              
      })

    }

    useEffect(() => {
      //Last progress
      if(rating !== 0 && comment !== ""){
        setIsBtnActive(true);
      } else {
        setIsBtnActive(false);
      }
    }, [rating, comment])

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Product Rating and Review
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Product Rating:</h5>
            <div className="text-center">
                <StarRatings
                    starRatedColor={'#f0ad4e'}
                    rating={rating}
                    changeRating={(r) => {
                        setRating(r)
                    }}
                />
            </div>
          <h5>Review:</h5>
          <Form.Control 
            as="textarea" 
            rows={4} 
            value={comment}
            onChange={e => setComments(e.target.value)}
            required
            />

        </Modal.Body>
        <Modal.Footer>
          
          {isLoading ? <Spinner variant="primary me-3" />
          :
          <>
          {
            isBtnActive ? <Button variant="primary" size="sm" onClick={e => addReview(e)}>Submit</Button>
            :
            <Button variant="primary" size="sm" disabled>Submit</Button>
          }
          </>
          }
          


          <Button variant="danger" size="sm" onClick={props.onHide}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }

export default function AddProductreview({productId}) {

    const [modalShow, setModalShow] = useState(false);   

  return (
    <>
        <Button variant='warning' size='sm'  onClick={() => setModalShow(true)}>Add a review</Button>

        <MyVerticallyCenteredModal
        productId={productId}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  )
}
