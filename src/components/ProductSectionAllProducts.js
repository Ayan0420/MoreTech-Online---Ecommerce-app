import { useEffect, useState } from "react"
import { Row } from "react-bootstrap";
import ProductCard from "./ProductCard"
import Loading from "./Loading";
export default function ProductSectionAllProducts() {

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
            console.log("avgRating rounded: " + Math.round(data.avgRating))


            
            setProducts(
                //limit only to 12 cards
                data.map(product => {

                    return(
                        <ProductCard 
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
        <Row>
            {products}
        </Row>
  )
}
