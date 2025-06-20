import { useContext, useEffect, useState } from "react"
import { Col, Row, Table } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import AdminActionButtons from "../../components/AdminActionButtons"
import AdminSidebar from "../../components/AdminSidebar"
import Loading from "../../components/Loading"
import UserContext from "../../userContext"

export default function AdminDashboardAllProducts() {

    //for admin check
    const navigate = useNavigate()
    const {user} = useContext(UserContext);

    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        //check isAdmin
        if(user.isAdmin !== true) {
            Swal.fire({
                title: 'You do not have permission to access this page!',
                icon: 'error',
                confirmButtonColor: "#0d6efd",
                text: 'Please contact you admin.'
            });
            navigate('/');
        }
        
        fetch(`${process.env.REACT_APP_API_URL}/products/all`)
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
                            <td>
                                <p><strong>Product ID: </strong>{product._id}</p>
                                <p>
                                {product.description}
                                </p>
                            </td>
                            <td>{product.author.authorName}</td>
                            <td>₱{product.price.toLocaleString()}</td>
                            <td>{product.stocks}</td>
                            {(product.isActive == true) ?
                            
                            <td>Active</td>
                            :
                            <td>Inactive</td>
                        
                             }
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
                <h1>All Products</h1>
                {
                (isLoading) ?
                    <Loading msg="Retrieving all products..."/>
                :
                <>
                    <i className="d-block text-end">List of all products added to the site.</i>
                    {/* <div className="d-flex justify-content-end">
                        <Button as={Link} to="/admin-add-product" variant="success small-font" size="sm">Add Product</Button>
                    </div> */}
                     <Table striped className="mt-2 small-font">
                        <thead className="table-header">
                            <tr>
                                {/* <th className="">Product ID</th> */}
                                <th>Name</th>
                                <th>Image</th>
                                <th>Description</th>
                                <th>Author</th>
                                <th>Price</th>
                                <th>Stocks</th>
                                <th>Availablity</th>
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
