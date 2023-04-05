
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { useState, useEffect } from 'react';

import './App.css';

import AppNavBar from './components/AppNavbar'
// import CourseView from './components/CourseView'
// import Courses from './pages/Courses';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login'
import Logout from './pages/Logout';
import AdminDashboard from './pages/AdminDashboard';
// import NotFound from './pages/NotFound';
import { UserProvider } from './userContext';


const App = () => {

  const [user, setUser] = useState({
    id: null,
    isAdmin: null
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
          isAdmin: data.isAdmin
        })

      // User is logged out
      } else {
        setUser({
          id: null,
          isAdmin: null
        })
      }
    })
  }, []);

  //
  return (
    <>
    <UserProvider value={{user, setUser, unsetUser}} >
      <Router>
        {/* <AppNavBar /> */}
            <Routes>
              <Route path="/" element={<Home />} />
              {/* <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:courseId" element={<CourseView />} /> */}
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/register" element={<Register />} />
              {/* "*" - is a wild card character that will match with any path that has not already been matched by previous routes. */}
              {/* <Route path="*" element={<NotFound />} /> */}
              <Route path='/admin-dashboard' element={<AdminDashboard/>} />
            </Routes>
      </Router>
    </UserProvider>
    </>
  );
}

export default App;
