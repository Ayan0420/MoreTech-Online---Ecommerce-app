import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Loading from '../components/Loading';
import UserContext from '../userContext';



export default function Login() {

	const {user, setUser} = useContext(UserContext);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [isActive, setIsActive] = useState(false);
	const [isLoading, setIsLoading] = useState(false)

	// Login logic function
	function authenticate(e){

		setIsLoading(true)


		e.preventDefault();

		fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
      
			body: JSON.stringify({
				email: email,
				password: password
			})
		})
		.then(res => res.json())
		.then(data => {
			// console.log(data)
			if(data.accessToken !== null){
				localStorage.setItem('token', data.accessToken)
				retrieveUserDetails(data.accessToken); //from the retrieveUserDetails function defined below

				Swal.fire({
					title: 'Login Successful',
					icon: 'success',
					confirmButtonColor: "#2c3e50",
					text: 'Welcome to MORETECH Online Tech Marketplace!'
				})
			} else {

				setIsLoading(false)
				Swal.fire({
					title: 'Authetication Failed!',
					icon: 'error',
					confirmButtonColor: "#2c3e50",
					text: 'Please, check you login details and try again!'
				})
			}
		})
		.catch(error => {
			setIsLoading(false)
			Swal.fire({
				title: 'Something went wrong!',
				icon: 'error',
				confirmButtonColor: "#2c3e50",
				text: 'Please try again!'
			})
		});
	}

	const retrieveUserDetails = (token) => {

		fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);
			setUser({
				id: data._id,
				isAdmin: data.isAdmin,
				isSeller: data.isSeller,
				address: data.address,
				firstName: data.firstName,
				lastName: data.lastName
				
			})
		});
	}

  useEffect(() => {
		if((email !== "" && password !== "") && (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email))){
			setIsActive(true);
		} else {
			setIsActive(false);
		}
	}, [email, password]);


  return (

    (user.id !== null) ?
			<Navigate to="/" />
			
		:

    <div className='bg-primary'>
		<div className='d-flex fixed-top m-4 '>
			<div className='p-3 rounded-2' style={{backgroundColor: "#82ed6fd3"}}>
				<p className='mb-0 text-center fw-bold'>Test User</p>
				<p className='mb-0'>email: ada@gmail.com</p>
				<p className='mb-0'>pwd: password1234</p>
				<p className='mb-0 text-center mt-2 fw-bold'>Admin User</p>
				<p className='mb-0'>email: admin@gmail.com</p>
				<p className='mb-0'>pwd: admin1234</p>
			</div>
		</div>
      <Container className='vh-100 d-md-flex align-items-center justify-content-center'>

		<div className='text-center'>
			<Link to='/'>
			<img src="./imgs/logo.png" alt="" className='my-4 my-md-0 me-md-5 img-fluid'/>
			</Link>
		</div>
		
		<Form onSubmit={(e) => authenticate(e)} className='d-flex text-primary p-4 flex-column justify-content-center bg-light rounded-2 form-shadow login-form-width'>

		{isLoading ? <Loading msg='Logging In...' />
		: 
		<>
			<h3 className='mb-4 mt-auto align-self-center'>Log In</h3>
			<Form.Group className='mb-3' controlId="email">
			<Form.Label>Email Address</Form.Label>
			<Form.Control
				type="email"
				placeholder="Enter email here"
				value={email}
				onChange={e => setEmail(e.target.value)}
				required
			/>
			
			</Form.Group>

			<Form.Group controlId="password">
			<Form.Label>Password</Form.Label>
			<Form.Control
				type="password"
				placeholder="Password"
				value={password}
				onChange={e => setPassword(e.target.value)}
				required
			/>
			
			</Form.Group>

			{ isActive ? 

			<Button variant="primary my-3 align-self-center mb-auto" type="submit" id="submitBtn">Login</Button>
			:
			<Button variant="secondary my-3 align-self-center mb-auto" type="submit" id="submitBtn" disabled>Login</Button>

			}

			
			<span  className='mt-3 text-center login-bottom-text'>Need an account? <Link to="/register" className="text-decoration-none">Register</Link></span>
		</>
		}
			
		</Form>
      </Container>
    </div>
  )
}
