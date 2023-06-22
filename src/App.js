
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { useState, useEffect } from 'react';

import './App.css';
import { UserProvider } from './userContext';

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login'
import Logout from './pages/Logout';
import NotFound from './pages/NotFound';
import AdminDashboardAllProducts from './pages/AdminDashboard/AdminDashboardAllProducts';
import AdminDashboardAddProduct from './pages/AdminDashboard/AdminDashboardAddProduct';
import AdminDashboardArchiveProduct from './pages/AdminDashboard/AdminDashboardArchiveProduct';
import AdminDashboardActiveProducts from './pages/AdminDashboard/AdminDashboardActiveProducts';
import AdminDashboardActivateProduct from './pages/AdminDashboard/AdminDashboardActivateProduct';
import AdminDashboardViewProduct from './pages/AdminDashboard/AdminDashboardViewProduct';
import AdminDashboardUpdateProduct from './pages/AdminDashboard/AdminDashboardUpdateProduct';
import ProductPage from './pages/ProductPage';
import AllProducts from './pages/AllProducts';
import UserProfile from './pages/UserProfile';
import ScrollToTop from './ScrollToTop';
import AdminDashboardsUsers from './pages/AdminDashboard/AdminDashboardsUsers';
import RedirectToUsers from './components/RedirectToUsers';
import RedirectToProductPage from './components/RedirectToProductPage'
import AdminDashboardAllOrders from './pages/AdminDashboard/AdminDashboardAllOrders';
import Search from './pages/Search';
import AllCategories from './pages/AllCategories';
import Category from './pages/Category';

const App = () => {

  const [user, setUser] = useState({
    id: null,
    isAdmin: null,
    isSeller: null,
    address: null,
    firstName: null,
    lastName: null,
  });

  // Function for clearing localStorage on logout
  const unsetUser = () => {
    localStorage.clear();
  }


  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then(data => {

      // User is logged in
      if(typeof data._id !== 'undefined'){
        setUser({
          id: data._id,
          isAdmin: data.isAdmin,
          isSeller: data.isSeller,
          address: data.address,
          firstName: data.firstName,
          lastName: data.lastName
        });

      // User is logged out
      } else {
        setUser({
          id: null,
          isAdmin: null,
          isSeller: null,
          address: null,
          firstName: null,
          lastName: null
        })
      }
    })
  }, []);

  //
  return (
    <>
    <UserProvider value={{user, setUser, unsetUser}} >
      <Router>
        <ScrollToTop>
        {/* <AppNavBar /> */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/register" element={<Register />} />
              <Route path='/products' element={<AllProducts />} />
              <Route path='/categories' element={<AllCategories />} />
              <Route path='/category/:category' element={<Category />} />
              <Route path='/product/:productId' element={<ProductPage />} />
              <Route path='/redirect/:productId' element={<RedirectToProductPage />} />
              <Route path='/search' element={<Search/>} />

              <Route path='/profile' element={<UserProfile/>} />

              <Route path='/admin-all-products' element={<AdminDashboardAllProducts/>} />
              <Route path='/admin-active-products' element={<AdminDashboardActiveProducts/>} />
              <Route path='/admin-add-product' element={<AdminDashboardAddProduct/>} />
              <Route path='/admin-view-product/:productId' element={<AdminDashboardViewProduct/>} />
              <Route path='/admin-update-product/:productId' element={<AdminDashboardUpdateProduct/>} />
              <Route path='/admin-activate-product/:productId' element={<AdminDashboardActivateProduct/>} />
              <Route path='/admin-archive-product/:productId' element={<AdminDashboardArchiveProduct/>} />
              <Route path='/admin-registered-users' element={<AdminDashboardsUsers />} />
              <Route path='/admin-all-orders' element={<AdminDashboardAllOrders />} />
              <Route path='/admin-redirect' element={<RedirectToUsers />} />

              {/* "*" - is a wild card character that will match with any path that has not already been matched by previous routes. */}
              <Route path="*" element={<NotFound />} />
            </Routes>
        </ScrollToTop>
      </Router>
    </UserProvider>
    </>
  );
}

export default App;
