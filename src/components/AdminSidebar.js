import { useContext } from "react"
import { Row, Col } from "react-bootstrap"
import { Link, NavLink } from "react-router-dom"
import UserContext from "../userContext"

export default function AdminSidebar() {
    const {user} = useContext(UserContext)
  return (
    <Col xs={3} className="mx-0">
        <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-primary sidebar vh-100">
            <Link to="/" className="d-flex justify-content-center align-items-center mb-2 mb-md-0 me-md-auto pb-4 text-white text-decoration-none border-bottom border-2">
                <img src="/imgs/logo.png" alt="logo" className="img-fluid" width={90}  />
                <span className="fs-5 fw-bold ms-3 dashboard-header py-1">Admin Dashboard</span>
            </Link>

            <ul className="nav nav-pills flex-column mb-auto mt-2">

                <li>
                    <NavLink activeClassName="active" to="/admin-active-products" className="nav-link text-white side-nav">
                    <i className="fa-solid fa-box me-3 fs-5"></i>
                    Active Products
                    </NavLink>
                </li>
                <li>
                    <NavLink activeClassName="active" to="/admin-all-products" className="nav-link text-white side-nav">
                    <i className="fa-solid fa-boxes-stacked me-3 fs-5"></i>
                    All Products
                    </NavLink>
                </li>
                <li>
                    <NavLink activeClassName="active" to="/admin-add-product" className="nav-link text-white side-nav">
                    <i className="fa-solid fa-file-circle-plus me-3 fs-5"></i>
                    Add Product
                    </NavLink>
                </li>
                <li>
                    <NavLink activeClassName="active" to="/" className="nav-link text-white side-nav">
                    <i className="fa-solid fa-circle-user me-3 fs-5"></i>
                    Users
                    </NavLink>
                </li>
                <li>
                    <NavLink activeClassName="active" to="/" className="nav-link text-white side-nav">
                    <i className="fa-solid fa-table me-3 fs-5"></i>
                    Orders
                    </NavLink>
                </li>
            </ul>
            <div className="dropdown pt-3 border-top border-2">
                <Link to="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="https://www.shareicon.net/data/512x512/2015/09/18/103160_man_512x512.png" alt="" width="32" height="32" className="rounded-circle me-2" />
                    <strong>{user.firstName}</strong>
                </Link>
                <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                    <li><Link className="dropdown-item" to="/">Go back to the main site</Link></li>
                    <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                    <li><Link className="dropdown-item" to="/logout">Sign out</Link></li>
                </ul>
            </div>


        </div>
    </Col>
  )
}
