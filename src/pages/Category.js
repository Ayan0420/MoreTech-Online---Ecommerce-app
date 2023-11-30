import React, { useEffect, useState } from 'react'
import AppNavBar from '../components/AppNavbar'
import ProductSectionAllProducts from '../components/ProductSectionAllProducts'
import { Container, Row } from 'react-bootstrap'
import Footer from '../components/Footer'
import { Link, useParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import Loading from '../components/Loading'


export default function Category() {
  const {category} = useParams()
  const [searchResult, setSearchResult] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  console.log('searchResult', searchResult)

  useEffect(() => {
      setIsLoading(true)
      fetch(`${process.env.REACT_APP_API_URL}/products/category/${category}`)
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
  }, [])
  
return (
  <>
  
  <Container className='search-container'>
      <div className='mt-2 mt-md-4 mb-3 '>
        <Link to='/categories' className='text-primary'><i className='fa-solid fa-caret-left'></i> Go Back to Categories</Link>
        <h3 className='mt-2 fw-bold bg-white p-3 text-center'>
          {
            (category === "pc") ? "Personal Computers/Mac"
            :(category === "laptops") ? "Laptops" 
            :(category === "smartphones") ? "Smart Phones"
            :(category === "tablets") ? "Tablets"
            :(category === "consoles") ? "Gaming Consoles"
            :(category === "headsets") ? "Headsets and Headphones"
            :(category === "parts") ? "Computer Parts"
            :(category === "accessories") ? "Accessories"
            :(category === "other") ? "Others"
            : "No category"
        
          }
        </h3>
      </div>

      {(isLoading) ?
          <div className="vh-100">
              <Loading msg={"Searching..."}/>
          </div>
      :
          <>
              {(searchResult.length === 0) ?
                  <h4 className='mt-5'>Coming Soon...</h4>
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
