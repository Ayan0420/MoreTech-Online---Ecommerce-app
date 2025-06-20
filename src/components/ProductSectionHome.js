import { useEffect, useState } from "react";
import { Button, Row } from "react-bootstrap";

import { Link } from "react-router-dom";
import Loading from "./Loading";
import ProductCard from "./ProductCard";
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
                data.slice(0, 12).map(product => {

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
                })
            )  
        })
    }, []);

  return (
    (isLoading) ?
    <div className="vh-100">
        <Loading msg={"Loading All Products..."}/>
    </div>
    :
        <>
            <Row>
                {products}
            </Row>
            <div className="text-center my-3">
                <Button as={Link} to='/products' variant="primary rounded-0">See more products</Button>

            </div>
        </>
        
  )
}
