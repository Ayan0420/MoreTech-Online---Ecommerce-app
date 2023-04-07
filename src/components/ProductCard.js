import { Card, Col, Row } from "react-bootstrap";
import AvgRatingStars from "./AvgRatingStars";
import { Link } from "react-router-dom";

export default function ProductCard(props) {
    
    const {
        _id, 
        productImg, 
        productName, 
        price, 
        avgRating, 
        author
    } = props;

  return (
    <Col md={3} className="mb-4 d-flex">
        <Link className="text-decoration-none d-flex" to={`/product/${_id}`}>
            <Card className="bg-light text-primary product-card border-0">

                <Card.Img src={`${productImg}`} className="img-fluid card-img rounded-0 rounded-top" alt="Card image" />

                <Card.Body className="d-flex flex-column">

                    <Card.Title>{productName.slice(0,30)} {
                        (productName.length >= 30) ? <span>...</span> : <></>
                    }</Card.Title>

                    <Card.Text className="text-success mb-0">₱ {price}</Card.Text>
                    <Card.Text className="text-primary smaller-font mb-2">
                        <AvgRatingStars avgRating={avgRating} />                                        
                    </Card.Text>

                    <Card.Text className="text-primary small-font mt-auto  my-0">{author.authorName}</Card.Text>

                </Card.Body>

            </Card>
        </Link>
    </Col>
  )
}
