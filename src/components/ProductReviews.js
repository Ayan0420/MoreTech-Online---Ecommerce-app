import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import AvgRatingStars from "./AvgRatingStars";
import moment from "moment";
import Loading from "./Loading";

export default function ProductReviews() {

    const [reviews, setReviews] = useState([]);
    const [avgRating, setAvgRating] = useState(0);

    const [isLoading, setIsLoading] = useState(true);

    const {productId} = useParams();

    useEffect(() => {

        fetch(`${process.env.REACT_APP_API_URL}/products/${productId}/details`)
        .then(res => res.json())
        .then(data => {
            setIsLoading(false);

            setReviews(data.reviews);
            setAvgRating(data.avgRating);
        })
      }, []);

  return (
    <div className="bg-white mt-4 p-5">
        <h4 className="text-center">Product Ratings and Reviews</h4>
        {isLoading ? 
        <Loading msg={"Loading product reviews..."}/>
        :
        <>
            {avgRating === 0 ? 
            <span>No ratings and reviews yet. Buy now and be the first one to give reviews!</span>
            :
            <>
            <h5 className="text-center"><span className="fs-2">{avgRating.toString().slice(0,3)}</span><span className="mx-1">out of 5</span></h5>
            <h5 className="mb-4 text-center"><AvgRatingStars avgRating={avgRating}/></h5>
            </>
            }
            {
                reviews.map(review => {
                    return (
                        <Row key={review._id} className="bg-light p-3 rounded-3 mb-2">
                            <Col md={2}>
                                <span>{review.userId.firstName} {review.userId.lastName.slice(0,1)}.</span>
                            </Col>
                            <Col md={10}>
                                <p className="mb-1"><AvgRatingStars avgRating={review.rating}/></p>
                                <p>{review.comment}</p>
                                <p className="small-font mb-0">Purchase Date: {moment(review.createdOn).format("MMMM DD, YYYY")}</p>
                            </Col>
                        </Row>
                    )
                })
            }
        </>
        
        }
    </div>
  )
}
