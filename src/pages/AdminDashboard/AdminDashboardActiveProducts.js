import { Row, Col, Container, Table, Button } from "react-bootstrap"
import AdminSidebar from "../../components/AdminSidebar"
import Loading from "../../components/Loading"
import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import UserContext from "../../userContext"
import Swal from "sweetalert2"
import AdminActionButtons from "../../components/AdminActionButtons"

export default function AdminDashboardActiveProducts() {
    
    //for admin check
    const navigate = useNavigate()
    const {user} = useContext(UserContext);
    
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(() => {
        //checks isAdmin
        if(user.isAdmin !== true) {
            Swal.fire({
                title: 'You do not have permission to access this page!',
                icon: 'error',
                confirmButtonColor: "#0d6efd",
                text: 'Please contact you admin.'
            });
            navigate('/');
        }

        fetch(`${process.env.REACT_APP_API_URL}/products/active`)
        .then(result => result.json())
        .then(data => {
            setIsLoading(false);
            if(data.length === 0) {
                setProducts([]);
            }
            setProducts(
                data.map(product => {
                    return(
                        <tr key={product._id}>
                            {/* <td>{product._id}</td> */}
                            <td>{product.productName}</td>
                            <td><img src={`${product.productImg}`} className="img-table-col" alt="" /></td>
                            <td>{product.category}</td>
                            <td>
                                <p><strong>Product ID: </strong>{product._id}</p>
                                <p>
                                {product.description}
                                </p>
                            </td>
                            <td>{product.author.authorName}</td>
                            <td>₱{product.price.toLocaleString()}</td>
                            <td>{product.stocks}</td>
                            <td>
                                <AdminActionButtons productId={product._id} isActive={product.isActive}/>
                            </td>
                     </tr>
                    )
                })
            )  
        })
    }, [])


  return (
    
    <>
    <Row className="vw-100">
        <AdminSidebar />
        <Col xs={9}>
            <div className="mt-5 px-0">
                    <h1>Active Products</h1>
                {
                (isLoading) ?
                    <Loading msg="Retrieving all active products..."/>
                :
                <>
                    <i className="d-block text-end">List of all ACTIVE products added to the site.</i>

                    <Table striped className="mt-2 small-font">
                        <thead className="table-header">
                            <tr>
                                {/* <th >Product ID</th> */}
                                <th>Name</th>
                                <th>Image</th>
                                <th>Category</th>
                                <th>Description</th>
                                <th>Author</th>
                                <th>Price</th>
                                <th>Stocks</th>
                                <th>
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {products}
                        </tbody>
                    </Table>
                    {(products.length == 0) ?
                        <p>No active products found</p>
                        :
                        <></>
                    } 
                </>
                }
            </div>   
        </Col>
    </Row>
    </>

  )
}
