import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import AvgRatingStars from "./AvgRatingStars";

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
    <Col xs={12} md={6} lg={3} className="mb-4 d-md-flex">
        <Link className="text-decoration-none d-md-flex" to={`/product/${_id}`}>
            <Card className="bg-light text-primary product-card border-0">
                <div className="text-center">
                <Card.Img src={`${productImg}`} className="img-fluid card-img rounded-0 rounded-top" alt="Card image" />

                </div>

                <Card.Body className="d-flex flex-column">

                    <Card.Title className="fs-6">{productName.slice(0,45)} {
                        (productName.length >= 45) ? <span>...</span> : <></>
                    }</Card.Title>

                    <Card.Text className="text-success mb-0">₱ {price.toLocaleString()}</Card.Text>
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
