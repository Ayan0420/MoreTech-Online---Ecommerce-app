import { useEffect, useState } from "react"
import { Card, Col, Row, Button } from "react-bootstrap";

import AvgRatingStars from "./AvgRatingStars";
import ProductCard from "./ProductCard"
import { Link } from "react-router-dom";
import Loading from "./Loading";
export default function ProductSectionHome() {

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/products/active`)
        .then(result => result.json())
        .then(data => {
            setIsLoading(false);
            if(data.length === 0) {
                setProducts([]);
            }
            
            setProducts(
                //limit only to 12 cards
                data.slice(0, 8).map(product => {
                    if(product.avgRating > 4.5 && product.reviews.length >= 3){
                        return(
                            <ProductCard 
                                key={product._id}
                                _id={product._id}
                                productName={product.productName}
                                productImg={product.productImg}
                                price={product.price}
                                avgRating={product.avgRating}
                                author={product.author}
                            />
                        )
                    }
                })
            )  
        })
    }, []);

  return (
    (isLoading) ?
        <Loading msg={"Loading Featured Products..."}/>
    :
        <>
            <Row>
                {products}
            </Row>
        </>
        
  )
}
