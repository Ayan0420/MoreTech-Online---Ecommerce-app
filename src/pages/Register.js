import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import UserContext from '../userContext';
import Swal from 'sweetalert2';

export default function Register() {

	// to access the "user" state from "UserContext"
	const {user} = useContext(UserContext);

	// State hooks to store values of the input fields
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [mobileNo, setMobileNo] = useState("");
    const [address, setAddress] = useState("");
	const [password1, setPassword1] = useState("");
	const [password2, setPassword2] = useState("");

	const navigate = useNavigate();

	// State to determine whether submit button is enabled or not
	const [isActive, setIsActive] = useState(false);

	
	// Checks the email if it does not exist and then registers the user
	function checkEmailExists(e){

		e.preventDefault();

		fetch(`${process.env.REACT_APP_API_URL}/users/checkEmail`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			// JSON.stringify converts object data into stringified JSON
			body: JSON.stringify({
				email
			})
		})
		.then(res => res.json())
		.then(data => {
			registerUser(data); //pass the result "data" to register user for further validation
		});

	}

	// Registers the user
	function registerUser(data){
		//checks if data is true or false
		if(data === false){
			fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				// JSON.stringify converts object data into stringified JSON
				body: JSON.stringify({
					firstName,
					lastName,
					email,
                    address,
					mobileNo,
					password: password2
				})
			})
			.then(res => res.json())
			.then(data => {

				if(data){
					Swal.fire({
						title: 'Registration Successful',
						icon: 'success',
						confirmButtonColor: "#0d6efd",
						text: 'Welcome to MORETECH Online Tech Marketplace!'
					});
					navigate('/login');
				} else {
					Swal.fire({
						title: 'Something went wrong!',
						icon: 'error',
						confirmButtonColor: "#0d6efd",
						text: 'Please try again'
					});
				}

					
			})
            .catch(error => {
                Swal.fire({
                    title: 'Something went wrong!',
                    icon: 'error',
                    confirmButtonColor: "#2c3e50",
                    text: 'Please try again!'
                })
            });
		} else {
			Swal.fire({
				title: 'Duplicate Email Found!',
				icon: 'error',
				confirmButtonColor: "#0d6efd",
				text: 'Please provide a different email'
			});
		}
	}

	useEffect(() => {

		// Validation to enable submit button when all fields are populated and both passwords match

		if((firstName !== "" && lastName !== "" && email !== "" && password1 !== "" && password2 !== "") && (password1 === password2) && (password1.length && password2.length >= 8) && (mobileNo.length >= 11)){
			setIsActive(true);
		} else {
			setIsActive(false);
		}
	}, [firstName, lastName, mobileNo, email, password1, password2]);
	
	return (

		// if the user already logged in, they will be redirected to the courses page
		(user.id !== null) ?
			<Navigate to="/" />
			
		:
        <div className='bg-primary'>
            <Container className='view-height d-md-flex align-items-center justify-content-center'>

                <div className='text-center'>
                    <Link to='/'>
                    <img src="./imgs/logo.png" alt="" className='my-4 my-md-0 me-md-5 img-fluid'/>
                    </Link>
                </div>

                <Form onSubmit={(e) => checkEmailExists(e)} className='d-flex text-primary p-4 flex-column justify-content-center bg-light rounded-2 form-shadow register-form-width'>
                    <h3 className='text-center mb-3'>Register</h3>

                    <Form.Text className="text-muted mb-2 text-center">
                        We'll never share your information with anyone else.
                    </Form.Text>
                    <Row className='mb-2'>
                        <Col sm={12} md={6}>
                            <Form.Group controlId="firstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter first name here"
                                    value={firstName}
                                    onChange={e => setFirstName(e.target.value)}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col sm={12} md={6}>
                            <Form.Group controlId="lastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter last name here"
                                    value={lastName}
                                    onChange={e => setLastName(e.target.value)}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className='mb-2'>
                        <Col sm={12} md={6}>
                            <Form.Group controlId="email">
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email here"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col sm={12} md={6}>
                            <Form.Group controlId="mobileNo">
                                <Form.Label>Mobile Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter mobile number here"
                                    value={mobileNo}
                                    onChange={e => setMobileNo(e.target.value)}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    

                    
                    <Form.Group controlId="address">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your current address"
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Row className='mt-2'>
                        <Col sm={12} md={6}>
                            <Form.Group controlId="password1">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={password1}
                                    onChange={e => setPassword1(e.target.value)}
                                    required
                                />
                                <Form.Text className="text-muted">
                                    Must be 8 characters or more.
                                </Form.Text>
                            </Form.Group>
                        </Col>
                        <Col sm={12} md={6}>
                            <Form.Group controlId="password2">
                                <Form.Label>Verify Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Verify Password"
                                    value={password2}
                                    onChange={e => setPassword2(e.target.value)}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>


                    { isActive ? 

                        <Button variant="primary my-3 align-self-center mb-auto" type="submit" id="submitBtn">Submit</Button>
                        :
                        <Button variant="secondary my-3 align-self-center mb-auto" type="submit" id="submitBtn" disabled>Submit</Button>

                    }
                    
                    <span  className='mt-3 text-center login-bottom-text'>Already have an account? <Link to="/login" className="text-decoration-none">Login</Link></span>
                </Form>
            </Container>
        </div>
	)
}