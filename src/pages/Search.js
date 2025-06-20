import React, { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom'
import Footer from '../components/Footer'
import Loading from '../components/Loading'
import ProductCard from '../components/ProductCard'

export default function Search() {

    const [searchParams] = useSearchParams()
    const [searchResult, setSearchResult] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        fetch(`${process.env.REACT_APP_API_URL}/products/search?searchQuery=${searchParams.get('searchQuery')}`)
          .then(res => res.json())
          .then(data => {
            if(data.length === 0){
                setIsLoading(false)
                setSearchResult([])
            }
            setSearchResult(
                data.map(product => {
                    setIsLoading(false)
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
    }, [searchParams])
    
  return (
    <>
    
    <Container className='search-container'>
        <h3 className='mt-3 mt-md-4 mb-3 fw-bold bg-white p-3 text-center'>Search result for "{searchParams.get('searchQuery')}"</h3>

        {(isLoading) ?
            <div className="vh-100">
                <Loading msg={"Searching..."}/>
            </div>
        :
            <>
                {(searchResult.length === 0) ?
                    <h4 className='mt-5'>No results found.</h4>
                    :
                <Row>
                    {searchResult}
                </Row>
            }
            </>
        }
    </Container>
    <Footer />
    </>
  )
}
