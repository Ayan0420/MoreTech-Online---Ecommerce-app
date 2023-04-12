import React, { useEffect, useState } from 'react'
import AppNavBar from '../components/AppNavbar'
import ProductSectionAllProducts from '../components/ProductSectionAllProducts'
import { Container, Row } from 'react-bootstrap'
import Footer from '../components/Footer'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import Loading from '../components/Loading'

export default function Search() {

    const [searchParams] = useSearchParams()
    const [searchResult, setSearchResult] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    console.log('searchResult', searchResult)

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/products/search?searchQuery=${searchParams.get('searchQuery')}`)
          .then(res => res.json())
          .then(data => {
            // if(data.length === 0){
            //     setIsLoading(false)
            //     setSearchResult([])
            // }
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
    <div className='sticky-top'>
        <AppNavBar />
    </div>
    <Container className='search-container'>
        <h3 className='mt-5 mb-3 fw-bold bg-white p-3 text-center'>Search result for "{searchParams.get('searchQuery')}"</h3>

        {(isLoading) ?
            <div className="vh-100">
                <Loading msg={"Loading All Products..."}/>
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
